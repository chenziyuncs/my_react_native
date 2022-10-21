import Types from '../../action/types'

/**
 * keysAndLang: {
 *    keys: [],
 *    lang: []
 */
const defaultState = {
  keys: [],
  lang: []
} as any;
export default function onAction(state = defaultState, action: any) {
  switch (action.type) {
    case Types.KEYSANDLANG_SUCCESS: //获取数据
      if (action.flag === 'keys') {
        return {
          ...state,
          keys: action.languages
        };
      } else {
        return {
          ...state,
          lang: action.languages
        };
      }
      
    default:
      return state;
  }

}
