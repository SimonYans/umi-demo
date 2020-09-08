import request from '@/untils/request'
import {makeApi} from '@/untils/api-prefix';

export async function getUserInfo() {
  return request(makeApi('/sys/user/info'))
}

