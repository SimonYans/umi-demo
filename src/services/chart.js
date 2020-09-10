import request from '@/untils/request'
import { serviceApi } from '@/untils/api-prefix';

export async function getMaintenanceList(params) {
  const { data, totalCount } = await request(serviceApi('/maintain/list'),{
    params: params
  });
  return { list: data, total: totalCount }
}
export async function getAgencyList() {
  return request(serviceApi('/maintain/agency/list'))
}
