import Types from '../../action/types'

/**
 * favorite: {
 *    'popular': {
 *      projectModels:[],
 *      isLoading: false
 *    }
 */
const defaultState = {} as any;
export default function onAction(state = defaultState, action: any) {
  switch (action.type) {
    case Types.FAVORITE_REFRESH://获取数据
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: true,
        }
      };
    case Types.FAVORITE_REFRESH_SUCCESS://下拉获取数据成功
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModels: action.projectModels,//此次要展示的数据
          isLoading: false,
        }
      };
    case Types.FAVORITE_REFRESH_FAIL://下拉获取数据失败
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false,
        }
      };
    default:
      return state;
  }

}
