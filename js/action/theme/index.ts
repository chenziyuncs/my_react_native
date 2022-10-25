import ThemeFactory from '../../config/ThemeFactory'
import Types from '../types'


export function onThemeChange(theme: any) {
  // return (dispatch: any) => {
  //   dispatch({
  //     type: Types.THEME_CHANGE,
  //     theme
  //   })
  // }
  return { type: Types.THEME_CHANGE, theme: { themeColor: ThemeFactory.createTheme(theme)} }
}

export function onShowThemeView (show: boolean) {
  return { type: Types.SHOW_THEME_VIEW, customThemeViewVisible: show }
}