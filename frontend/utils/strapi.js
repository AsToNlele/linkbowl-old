import axios from 'axios'
import { API_URL } from '@/config/index'

export function strapiAxios(user) {
  const call = axios.create({
    baseURL: API_URL,
    headers: user && {
      Authorization: `Bearer ${user?.strapiToken}`,
    },
    validateStatus: function (status) {
      return status >= 200
    },
  })

  return call
}
