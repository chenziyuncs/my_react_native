import Types from '../types';
//收藏页面点击更新收藏状态
export function updateOnLoadFavoriteData (storeName: string, flag: string, data: any, isFavorite: boolean, type: string) {
  return (dispatch: any, getState: any) => {
    const { projectModels } = getState()[storeName][flag]
    let arr = projectModels.filter((item: any) => { return item.id === data[0].id })
    projectModels.forEach((item: any) => {
      if (item.id === data[0].id) {
        item.isFavorite = isFavorite
      }
    })
    dispatch({
      type: type,
      projectModels: projectModels,
      storeName: flag
    })
  }
}

export function onLoadFavoriteData (storeName: string, isLoading: any) {
  return (dispatch: any, getState: any) => {
    if (isLoading) {
      dispatch({type: Types.FAVORITE_REFRESH, storeName: storeName});
    }
    const list = getState()[storeName]
    let arrList: any = []
    Object.keys(list).map((key: any) => {
      arrList = arrList.concat(list[key].projectModels)
    })
    setTimeout(() => {
      dispatch({
        type: Types.FAVORITE_REFRESH_SUCCESS,
        storeName,
        projectModels: arrList.filter((item: any) => { return item.isFavorite })
      })
    }, 100)
  }
}
