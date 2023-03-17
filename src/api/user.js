import request from '@/utils/request'
import { APIUrl } from '@/const/const'

export function login(data) {
  return request({
    url: APIUrl + '/api/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: APIUrl + '/api/userinfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: APIUrl + '/api/logout',
    method: 'post'
  })
}
