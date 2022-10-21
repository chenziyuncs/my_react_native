import Types from '../../action/types'

const defaultState = {
  theme: {
    themeColor: '#2196F3'
  }
};
export default function onAction(state = defaultState, action: { type: any; theme: any; }) {
  switch (action.type) {
    case Types.THEME_CHANGE:
      return {
        ...state,
        theme: action.theme
      };
    default:
      return state;
  }
}