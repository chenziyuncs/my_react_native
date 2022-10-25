import Types from '../../action/types'
import ThemeFactory, { ThemeFlags } from '../../config/ThemeFactory'

const defaultState = {
  theme: {
    themeColor: ThemeFactory.createTheme(ThemeFlags.Default),
    customThemeViewVisible: false
  }
};
export default function onAction(state = defaultState, action: { type: any; theme: any; customThemeViewVisible: boolean }) {
  switch (action.type) {
    case Types.THEME_CHANGE:
      return {
        ...state,
        theme: action.theme
      };
    case Types.SHOW_THEME_VIEW:
      return {
        ...state,
        customThemeViewVisible: action.customThemeViewVisible
      }
    default:
      return state;
  }
}