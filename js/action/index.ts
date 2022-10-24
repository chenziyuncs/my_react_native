import { onThemeChange } from './theme';
import { onLoadPopularData, onLoadMorePopularData, updatePopularDataItem } from './popular'
import { onLoadTrendingData, onLoadMoreTrendingData, updateTrendingDataItem } from './trending'
import { onLoadFavoriteData, updateOnLoadFavoriteData } from './favorite'
import { loginDispatch, logoutDispatch, saveBoardingNew, logoutMethods } from './user'
import { onLoadKeysAndLang } from './keysAndLang'

export default {
  onThemeChange,
  onLoadPopularData,
  onLoadMorePopularData,
  onLoadTrendingData,
  onLoadMoreTrendingData,
  onLoadFavoriteData,
  loginDispatch,
  logoutDispatch,
  saveBoardingNew,
  logoutMethods,
  updatePopularDataItem,
  updateOnLoadFavoriteData,
  updateTrendingDataItem,
  onLoadKeysAndLang
};