
import Types from '../types';

import Utils from '../../util/Utils'

const API_URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=starts';
const CANCEL_TOKENS = [] as any;
function getFetchUrl (key: any) {
  return API_URL + key + QUERY_STR;
}

function hasCancel (token: any, isReomve?: boolean) {
  if (CANCEL_TOKENS.includes(token)) {
    isReomve && Utils.remove(CANCEL_TOKENS, token)
    return true
  }
  return false
}

function doCallBack (callback: any, object: any) {
  if (typeof callback === 'function') {
    callback(object);
  }
}

function handleData (type: string, dispatch: any, list: any, pageSize: number, object: any) {
  let showItem = pageSize > list.length ? list: list.slice(0, pageSize)
  dispatch({
    type: type,
    projectModels: showItem,
    pageIndex: 1,
    ...object
  })
}

export function resetSearchData () {// 重制搜索页面
  return (dispatch:any) => {
    dispatch({
      type: Types.SEARCH_RESET,
      projectModels: [],
      pageIndex: 1,
    })
  }
}
/**
 * 获取搜索action
 * @param inputKey 搜索key
 * @param pagesize 每页数量
 * @param token 与该搜索关联的唯一toekn 用于取消搜索
 * @param popularKeys 最热模块下的所有标签
 * @param callBack 返回函数
 */
export function onLoadSearchData (inputKey: any, pageSize: number, token: any, popularKeys: any, callBack: any) {
  return (dispatch: any, getState: any) => {
    dispatch({ type: Types.SEARCH_REFRESH });
    fetch(getFetchUrl(inputKey)).then(response => {// 如果任务取消，则不做任何处理
      return hasCancel(token) ? null : response.json();
    }).then(responseData => {
      if (hasCancel(token, true)) {// 如果任务取消，则不做任何处理
        console.log('用户已取消')
        return;
      }
      if (!responseData || !responseData.items || responseData.items.length === 0) {
        dispatch({ type: Types.SEARCH_REFRESH_FAIL, message: `没有找到关于${inputKey}的项目` });
        doCallBack(callBack, `没有找到关于${inputKey}的项目`)
        return;
      }
      let items = responseData.items;
      items.forEach((item: any) => {item.flagType = inputKey})
      handleData(Types.SEARCH_REFRESH_SUCCESS, dispatch, items, pageSize, {
        showBottomButton: !Utils.checkKeyIsExist(popularKeys, inputKey),// 判断是否显示按钮
        inputKey,
      })
    }).catch(e => {
      console.log(e);
      dispatch({ type: Types.SEARCH_REFRESH_FAIL, error: e })
    })
  }
}

/**
 * 获取搜索action
 * @param dataArray 原始数据
 * @param pagesize 每页数量
 * @param pageIndex 第几页
 * @param callBack 返回函数
 */
export function onLoadMoreSearch (inputKey: string, pageIndex: number, pageSize: number, callBack: any) {
  return (dispatch: any, getState: any) => {
    fetch(getFetchUrl(inputKey)).then((responseData: any) => {
      if (!responseData || !responseData.items || responseData.items.length === 0) {
        dispatch({ type: Types.SEARCH_LOAD_MORE_FAIL, message: `没有找到关于${inputKey}的项目` });
        doCallBack(callBack, `没有更多关于${inputKey}的项目`)
        return;
      }
      const { projectModels } = getState()['search']
      if ((pageIndex - 1) * pageSize > projectModels.length) {// 没有更多
        if (typeof callBack === 'function') {
          doCallBack(callBack, `没有更多关于${inputKey}的项目`)
        }
        dispatch({
          type: Types.SEARCH_LOAD_MORE_FAIL,
          pageIndex: --pageIndex,
          projectModels: projectModels,
          hideLoadingMore: true
        })
      } else {
        let items = responseData.items;
        items.map((item: any) => {item.flagType = inputKey})
        dispatch({
          type: Types.SEARCH_LOAD_MORE_SUCCESS,
          pageIndex: pageIndex,
          projectModels: Utils.removeDulplicates(projectModels.concat(items), 'id') ,
          hideLoadingMore: true
        })
      }
    }).catch((e: any) => {
      dispatch({ type: Types.SEARCH_LOAD_MORE_FAIL, error: e })
    })
  }
}

/**
 * 取消搜索action
 * @param token 与该搜索关联的唯一toekn 用于取消搜索
 */
export function onSearchCancel (token: any) {
  return (dispatch: any) => {
    CANCEL_TOKENS.push(token);
    dispatch({ type: Types.SEARCH_CANCEL })
  }
}

