import Types from '../types'
import DataStore from '../../expand/dao/DataStore';
import  Utils from '../../util/Utils.js'
import { getTrendingData } from '../../api/trending'
/**
 * 获取趋势异步action
 * @param storeName
 * @param flag
 * @param pageIndex
 */

function newDataList (dispatch: any, getState: any, list: any, pageSize: number, storeName: string, flag: any) {
  let showItem = pageSize > list.length ? list: list.slice(0, pageSize)
  const { projectModels } = getState()[flag][storeName]
  if (projectModels) {
    const sum = [...showItem, ...projectModels]
    const newSum = Utils.removeDulplicates(sum, 'id')
    setTimeout(() => {
      dispatch({
        type: Types.TRENDING_REFRESH_SUCCESS,
        projectModels: newSum.slice(0, 10),
        storeName,
        pageIndex: 1
      })
    }, 100);
    
  } else {
    dispatch({
      type: Types.TRENDING_REFRESH_SUCCESS,
      projectModels: showItem,
      storeName,
      pageIndex: 1
    })
  }
  
}
const httpUrl = 'https://github.com/trending/'
export function onLoadTrendingData (storeName: any, flag: string, pageIndex: number, pageSize: number, favoriteDao: any) {
  return (dispatch: any, getState: any) => {
    dispatch({type: Types.TRENDING_REFRESH, storeName});
    getTrendingData({sourceUrl: `${httpUrl}${storeName}`,  pageIndex, pageSize}).then((res: any) => {
      if (res.code === 0) {
        const { list } = res.data
        if (list) {
          list.map((item: any) => {
            item.flagType = storeName
          })
          newDataList(dispatch, getState, list, pageSize, storeName, flag)
        } else {
          dispatch({
            type: Types.TRENDING_REFRESH_FAIL,
            storeName,
            projectModels: []
          })
        }
      } else {
        dispatch({
          type: Types.TRENDING_REFRESH_FAIL,
          storeName
        })
      }
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
export function onLoadMoreTrendingData (storeName: any, flag: string, pageIndex:number, pageSize:number, callback: any) {
  return (dispatch: any, getState: any) => {
    getTrendingData({sourceUrl: `${httpUrl}${storeName}`,  pageIndex, pageSize}).then((res: any) => {
      const { projectModels } = getState()[flag][storeName]
      
      if (res.code === 0) {
        if ((pageIndex - 1) * pageSize > projectModels.length) {// 已加载完全部数据
          if (typeof callback === 'function') {
            callback('no more')
          }
          dispatch({
            type: Types.TRENDING_LOAD_MORE_FAIL,
            error: 'no more',
            storeName,
            pageIndex: --pageIndex,
            projectModels: projectModels,
            hideLoadingMore: true,
          })
        } else {
          const { list } = res.data
          if (list.length !== 0) {
            list.map((item: any) => {
              item.flagType = storeName
            })
          }
          dispatch({
            type: Types.TRENDING_LOAD_MORE_SUCCESS,
            storeName,
            pageIndex,
            projectModels: Utils.removeDulplicates(projectModels.concat(list), 'id')
          })
        }
      } else {
        callback('no more')
      }
    })
  }
}

/**
 * 
 * @param 点击收藏更新
 * @param data 
 * @returns 
 */
 export function updateTrendingDataItem (flag: string, storeName: string, data: any) {
  return (dispatch: any, getState: any) => {
    const { projectModels } = getState()[flag][storeName]
    const sum = [...data, ...projectModels]
    const newSum = Utils.removeDulplicates(sum, 'id')
    dispatch({
      type: Types.CLICK_TRENDING_FAVORITE,
      projectModels: newSum,
      storeName
    })
  }
}
