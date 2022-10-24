import Types from '../types';
import keys from '../../res/data/keys.json';
import lang from '../../res/data/lang.json'

//收藏页面点击更新收藏状态
export function onLoadKeysAndLang (arr: any, flag: string) {
  const list = arr.length === 0 ? (flag === 'keys' ? keys : lang) : arr
  return (dispatch: any) => {
    dispatch({
      type: Types.KEYSANDLANG_SUCCESS,
      languages: list,
      flag
    })
  }
}
