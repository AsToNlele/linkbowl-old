import nc from 'next-connect'
import { sessionMiddleware } from '@/middlewares/session'
import { strapiAxios } from '@/utils/strapi'

export default nc()
  .use(sessionMiddleware)
  .post(async (req, res) => {
    const { login, email, password } = req.body

    try {
      const user = await strapiAxios()
        .post(`/auth/local/register`, {
          username: login,
          password: password,
          email: email,
        })
        .then((res) => {
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

      const page = await strapiAxios()
        .post(`pages`, {
          slug: user.username,
          title: user.username,
        })
        .then((res) => res.data)
      console.log(page)

      req.session.set('user', user)
      await req.session.save()
      res.json(user)
    } catch (error) {
      const { response: fetchResponse } = error
      if (fetchResponse) {
        return res
          .status(fetchResponse?.status || 500)
          .json(error.response?.data)
      }
      res.status(500).json(error)
    }
  })
