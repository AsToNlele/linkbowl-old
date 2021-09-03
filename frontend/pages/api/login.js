import nc from 'next-connect'
import { sessionMiddleware } from '@/middlewares/session'
import { strapiAxios } from '@/utils/axios'

export default nc()
  .use(sessionMiddleware)
  .post(async (req, res) => {
    const { login, password } = req.body

    try {
      const user = await strapiAxios()
        .post(`/auth/local`, {
          identifier: login,
          password: password,
        })
        .then((res) => {
          console.log(res.data)
          return res.data
        })
        .then((data) => ({
          ...data.user,
          strapiToken: data.jwt,
        }))


      if (!user.confirmed) {
        return res.status(401).json({
          statusCode: 401,
          message: 'User not confirmed',
        })
      }

      console.log(user)

      req.session.set('user', user)
      await req.session.save()
      res.json(user)
    } catch (error) {
	    console.log(error)
      const { response: fetchResponse } = error
      if (fetchResponse) {
        return res
          .status(fetchResponse?.status || 500)
          .json(error.response?.data)
      }
      res.status(500).json(error)
    }
  })
