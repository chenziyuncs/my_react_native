import {FLAG_STORAGE} from '../expand/dao/DataStore';

export default class FavoriteUtil {

  /**
   * favoriteIcon单击回调函数
   * @param favoriteDao
   * @param item
   * @param isFavorite
   * @param flag
   */
  static onFavorite(favoriteDao, item, isFavorite, flag) {
    const key = (item.id ? item.id : item.fullName) + "";
    if (isFavorite) {
      favoriteDao.saveFavoriteItem(key, JSON.stringify(item));
    } else {
      favoriteDao.removeFavoriteItem(key);
    }
  }
}
