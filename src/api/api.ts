import request, { ApiReponse } from './request'

//资金流向实时图
export async function getZJLKXData({ secid, secid2, lmt, fields1, fields2, ut }: { secid: string, secid2: string, lmt: string, fields1: string, fields2: string, ut: string }): Promise<ApiReponse> {
  return request('get', '/ZJLX/getZJLKXData', { secid, secid2, lmt, fields1, fields2, ut })
}