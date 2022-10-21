import request from '../util/Request'

/**
 * 获取最热模块数据
 * @param
 * @param q
 * @param pageIndex
 * @param pageSize
 * 
*/
 export function getPopularData(params: any) {
  return request({
    url: 'popular/',
    method: 'GET',
    params: params
  })
}
