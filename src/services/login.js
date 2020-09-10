import request from '@/untils/request'
import {authApi} from '@/untils/api-prefix';

export async function login(userInfo) {
  return request(authApi('/token/password'), {
    method: 'POST',
    data: userInfo
  });
}

export async function logout() {
  return request(authApi('/token/logout'));
}

