import Types from '../types';


//收藏页面点击更新收藏状态
export function onLoadKeysAndLang (arr: any, flag: string) {
  return (dispatch: any) => {
    dispatch({
      type: Types.KEYSANDLANG_SUCCESS,
      languages: arr,
      flag
    })
  }
}
