import Types from '../../action/types'

/**
 * search: {
 *  showText: '搜索',
 *  items: [],
 *  isLoading: false,
 *  hideLoadingMore: true, // 默认隐藏加载更多,
 *  projectModels: [],
 *  showBottomButton: false 
 */
const defaultState = {
  showText: '搜索',
  items: [],
  isLoading: false,
  hideLoadingMore: true, // 默认隐藏加载更多
  projectModels: [],
  showBottomButton: false, // 是否显示按钮
  inputKey: ''
} as any;
// tabs = {} as any
export default function onAction(state = defaultState, action: any) {
  switch (action.type) {
    case Types.SEARCH_REFRESH_SUCCESS:// 下啦刷新成功
      return {
        ...state,
        items: action.items, // 原始数据
        projectModels: action.projectModels, // 此次要展示的数据
        isLoading: false,
        hideLoadingMore: false,
        pageIndex: action.pageIndex,
        showBottomButton: action.showBottomButton,
        showText: '搜索',
        inputKey: action.inputKey
      };
    case Types.SEARCH_REFRESH:// 下啦刷新
      return {
        ...state,
        isLoading: true,
        hideLoadingMore: true,
        showBottomButton: false,
        showText: '取消'
      }
    case Types.SEARCH_REFRESH_FAIL:// 下啦刷新失败
      return {
        ...state,
        isLoading: false,
        showText: '搜索'
      }
    case Types.SEARCH_LOAD_MORE_SUCCESS:// 上啦加载更多成功
      return {
        ...state,
        projectModels: action.projectModels,
        hideLoadingMore: false,
        pageIndex: action.pageIndex
      }
    case Types.SEARCH_LOAD_MORE_FAIL:// 上啦载更多失败
      return {
        ...state,
        hideLoadingMore: true,
        pageIndex: action.pageIndex
      }
    case Types.SEARCH_CANCEL:
      return {
        ...state,
        isLoading: false,
        showText: '搜索'
      }
    case Types.SEARCH_RESET:
      return {
        ...state,
        hideLoadingMore: true,
        isLoading: false,
        projectModels: [],
        showBottomButton: false,
        showText: '搜索'
      }
    default:
      return state;
  };
};
