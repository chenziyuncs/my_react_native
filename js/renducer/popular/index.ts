import Types from '../../action/types'

/**
 * popular: {
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
const defaultState = {} as any;
// tabs = {} as any
export default function onAction(state = defaultState, action: any) {
  switch (action.type) {
    case Types.POPULAR_REFRESH_SUCCESS:// 下啦刷新成功
      return {
        ...state,
        [action.storeName]: {
          //元素隐式具有 "any" 类型，因为类型为 "any" 的表达式不能用于索引类型 "{}"。需要写成 as any 断言
          ...state[action.storeName],
          items: action.items, // 原始数据
          projectModels: action.projectModels, // 此次要展示的数据
          isLoading: false,
          hideLoadingMore: false,
          pageIndex: action.pageIndex
        }
      };
    case Types.POPULAR_REFRESH:// 下啦刷新
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: true,
          hideLoadingMore: true,
        }
      }
    case Types.POPULAR_REFRESH_FAIL:// 下啦刷新失败
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false,
          // hideLoadingMore: true
        }
      }
    case Types.POPULAR_LOAD_MORE_SUCCESS:// 上啦加载更多成功
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModels: action.projectModels,
          hideLoadingMore: false,
          pageIndex: action.pageIndex
        }
      }
    case Types.POPULAR_LOAD_MORE_FAIL:// 上啦载更多失败
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: true,
          pageIndex: action.pageIndex
        }
      }
    case Types.CLICK_POUPULAR_FAVORITE:
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
      return state;
  };
};
