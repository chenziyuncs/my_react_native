import Types from '../../action/types'
/**
 * trending: {
 *    java:{
 *      items: [],
 *      isLoading: false
 *    },
 *    ios: {
 *      items: [],
 *      isLoading: false
 *    }
 * }
 */
const defaultState = {} as any
export default function onAction (state = defaultState, action: any) {
  switch (action.type) {
    case Types.TRENDING_REFRESH_SUCCESS :
      return {
        ...state,
        [action.storeName]: {
          //元素隐式具有 "any" 类型，因为类型为 "any" 的表达式不能用于索引类型 "{}"。需要写成 as any 断言
          ...state[action.storeName],
          items: action.items, // 原始数据
          projectModels: action.projectModels,// 此次要展示的数据
          isLoading: false,
          hideLoadingMore: false,
          pageIndex: action.pageIndex
        }
      }
    case Types.TRENDING_REFRESH:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: true,
          hideLoadingMore: true,
        }
      }
    case Types.TRENDING_REFRESH_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false
        }
      }
    case Types.TRENDING_LOAD_MORE_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModels: action.projectModels,
          hideLoadingMore: false,
          pageIndex: action.pageIndex
        }
      }
    case Types.TRENDING_LOAD_MORE_FAIL:// 上啦载更多失败
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: true,
          pageIndex: action.pageIndex
        }
      }
    case Types.CLICK_TRENDING_FAVORITE:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModels: action.projectModels,
          isLoading: false,
          hideLoadingMore: false
        }
      }
    default:
      return state
  }
}