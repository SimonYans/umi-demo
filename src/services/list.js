import request from '@/untils/request'
import { serviceApi } from '@/untils/api-prefix';

export async function getMaintenanceList(params) {
  return request(serviceApi('/maintain/list'),{
    params: params
  })
}
export async function getAgencyList() {
  return request(serviceApi('/maintain/agency/list'))
}
