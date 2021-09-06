import axios from 'axios'

export function apiAxios(user) {
  const call = axios.create({
    headers: user && {
      Authorization: `Bearer ${user?.strapiToken}`,
    },
    validateStatus: function (status) {
      return status >= 200
    },
  })

  return call
}
