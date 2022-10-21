import Types from '../types'


export function onThemeChange(theme: any) {
  // return (dispatch: any) => {
  //   dispatch({
  //     type: Types.THEME_CHANGE,
  //     theme
  //   })
  // }
  return { type: Types.THEME_CHANGE, theme: theme }
}