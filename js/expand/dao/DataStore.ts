import { get } from './HiNet';
import Constants from './Constants';
// import { URL } from 'react-native-url-polyfill';


//用户表示最热和趋势模块的请求
export const FLAG_STORAGE = {
  flag_popular: 'popular',
  flag_trending: 'trending'
}
/**
 * 获取数据
 * @param searchName 拼串需要的数据参数
 * @param flag
 * @param pageIndex
 * @param pageSize
 * 
*/

export default class DataStore {
  fetchData (searchName: string, flag: string, pageIndex = 1, pageSize = 25) {
    let newApi;
    let params: any = {
      pageIndex: pageIndex,
      pageSize: pageSize
    };
    if (flag === FLAG_STORAGE.flag_popular) {
      const { popular: { api } } = Constants;
      newApi = api;
      params.q = searchName
    } else {
      const { trending: { api } } = Constants;
      newApi = api
      params.sourceUrl = 'https://github.com/trending/' + searchName;
    }
    return get(newApi)(params)
  }
}

// export default class DataStore {
//   /**
//    * 获取数据
//    * @param url
//    * @param flag
//    * @param pageIndex
//    * @param pageSize
//    * 
//   */
//  fetchData (url: string, flog: string, pageIndex = 1, pageSize = 25) {
//   let api: string = ''
//   let params:any = {
//     pageIndex,
//     pageSize
//   }

//   if (flog === FLAG_STORAGE.flag_popular) {
//     // 后台定义最热接口有q,需要从url中取出q的参数
//     // GET "https://api.devio.org/uapi/popular?q=java&pageIndex=1&pageSize=25
//     api = Constants.popular.api;
//     // const q = new URL(url).searchParams.get('q');
//     const q = new URL(url).searchParams.get('q');
//     params.q = q
//   } else {
//     api = Constants.trending.api
//     params.sourceUrl = url
//   }
//   return get(api)(params)
//  }
// }