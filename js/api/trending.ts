import request from '../util/Request'

/**
 * 获取最热模块数据
 * @param
 * @param sourceUrl: https://github.com/trending/All Language
 * @param pageIndex
 * @param pageSize
 * 
*/
 export function getTrendingData(params: any) {
  return request({
    url: 'trending/',
    method: 'GET',
    params: params
  })
}
