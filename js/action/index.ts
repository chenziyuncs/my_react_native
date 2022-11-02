import { onShowThemeView, onThemeChange } from './theme';
import { onLoadPopularData, onLoadMorePopularData, updatePopularDataItem } from './popular'
import { onLoadTrendingData, onLoadMoreTrendingData, updateTrendingDataItem } from './trending'
import { onLoadFavoriteData, updateOnLoadFavoriteData } from './favorite'
import { loginDispatch, logoutDispatch, saveBoardingNew, logoutMethods } from './user'
import { onLoadKeysAndLang } from './keysAndLang'
import { onLoadSearchData, onLoadMoreSearch, onSearchCancel, resetSearchData } from './search'
import { setCodePushUpdateInfo } from './codePush'

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
  onLoadKeysAndLang,
  onShowThemeView,
  onLoadSearchData,
  onLoadMoreSearch,
  onSearchCancel,
  resetSearchData,
  setCodePushUpdateInfo
};