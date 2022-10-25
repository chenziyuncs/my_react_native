
import Types from '../types';
import { getPopularData } from '../../api/popular'
import Utils from '../../util/Utils'

function newDataList (dispatch: any, getState: any, list: any, pageSize: number, storeName: string, flag: any) {
  let showItem = pageSize > list.length ? list: list.slice(0, pageSize)
  const { projectModels } = getState()[flag][storeName]
  if (projectModels) {
    const sum = [...showItem, ...projectModels]
    const newSum = Utils.removeDulplicates(sum, 'id')
    setTimeout(() => {
      dispatch({
        type: Types.POPULAR_REFRESH_SUCCESS,
        projectModels: newSum.slice(0, 10),
        storeName,
        pageIndex: 1
      })
    }, 100);
    
  } else {
    dispatch({
      type: Types.POPULAR_REFRESH_SUCCESS,
      projectModels: showItem,
      storeName,
      pageIndex: 1
    })
  }
  
}

/**
 * 
 * @param 点击收藏更新
 * @param data 
 * @returns 
 */
export function updatePopularDataItem (flag: string, storeName: string, data: any) {
  return (dispatch: any, getState: any) => {
    if (getState()[flag][storeName]) {
      const { projectModels } = getState()[flag][storeName]
      const sum = [...data, ...projectModels]
      const newSum = Utils.removeDulplicates(sum, 'id')
      dispatch({
        type: Types.CLICK_POUPULAR_FAVORITE,
        projectModels: newSum,
        storeName
      })
    } else {
      dispatch({
        type: Types.CLICK_POUPULAR_FAVORITE,
        projectModels: data,
        storeName
      })
    }
  }
}
/**
 * 获取最热异步action
 * @param storeName
 * @param flag
 * @param pageSize
 */
export function onLoadPopularData (storeName: any, flag: string, pageIndex: number, pageSize: number) {
  return (dispatch: any, getState: any) => {
    dispatch({type: Types.POPULAR_REFRESH, storeName});
    getPopularData({q: storeName, pageIndex, pageSize}).then((data: any) => {
      if (data.code === 0) {
        const { list } = data.data
        if (list.length !== 0) {
          list.forEach((item: any) => {
            item.flagType = storeName
          })
        } 
        newDataList(dispatch, getState, list, pageSize, storeName, flag)
      } else {
        dispatch({
          type: Types.POPULAR_REFRESH_FAIL,
          storeName,
          error: data.msg
        })
      }
    }).catch((e: any) => {
      dispatch({
        type: Types.POPULAR_REFRESH_FAIL,
        storeName,
        error: e
      })
    })
  }
}
/**
 * 加载更多
 * @param storeName 
 * @param pageSize 每页显示条数
 * @param pageIndex 第几页
 * @param dataArray 原始数据
 * @param callback 回调函数，可以通过该函数与调用页面通讯，比如异常信息的展示，没有更多数据等等
 */

export function onLoadMorePopularData (storeName: any, flag: string, pageIndex:number, pageSize:number, callback: any) {
  return (dispatch: any, getState: any) => {
    // let dataStore = new DataStore();
    const { projectModels } = getState()[flag][storeName]
    getPopularData({q: storeName, pageIndex, pageSize}).then((data: any) => {
      if (data.code === 0) {
        if ((pageIndex - 1) * pageSize > projectModels.length) {// 已加载完全部数据
          if (typeof callback === 'function') {
            callback('no more')
          }
          dispatch({
            type: Types.POPULAR_LOAD_MORE_FAIL,
            error: 'no more',
            storeName,
            pageIndex: --pageIndex,
            projectModels: projectModels,
            hideLoadingMore: true,
          })
        } else {
          const { list } = data.data
          if (list.length !== 0) {
            list.map((item: any) => {
              item.flagType = storeName
            })
          }
           dispatch({
             type: Types.POPULAR_LOAD_MORE_SUCCESS,
             storeName,
             pageIndex,
             projectModels: Utils.removeDulplicates(projectModels.concat(list), 'id') 
           })
        }
      } else {
        callback('error')
      }
    })
  }
  
}
