// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from "@react-native-async-storage/async-storage"
const FAVORITE_KEY_PREFIX = 'favorite_';
export default class FavoriteDao {
  constructor(flag) {
    this.favoriteKey = FAVORITE_KEY_PREFIX + flag;
  }

  /**
   * 收藏项目,保存收藏的项目
   * @param key 项目id
   * @param value 收藏的项目
   * @param callback
   */
  saveFavoriteItem(key, value, callback) {
    AsyncStorage.setItem(key, value,(error, result) => {
      if (!error) {
        this.updateFavoriteKeys(key, true);
      }
    })
    
  }

  /**
   * 更新Favorite key集合
   * @param key
   * @param isAdd true 添加,false 删除
   * **/
  updateFavoriteKeys(key, isAdd) {
    AsyncStorage.getItem(this.favoriteKey, (error, result) => {
      if (!error) {
        let favoritekeys = []
        if (result) {
          favoritekeys = JSON.parse(result)
        }
        const index = favoritekeys.indexOf(key);// 获取收藏id的下标
        if (isAdd) {// true 是存储
          if (index === -1) {// 等于-1表示下标不存在，进行存储
            favoritekeys.push(key);
          }
        } else {// 否则执行删除
          if (index !== -1) {// 不等于-1表示存在才能进行删除
            favoritekeys.splice(index, 1)
          }
        }
        AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoritekeys));
      }
    }) 
  }

  /**
   * 获取收藏的Repository对应的key
   * @return {Promise}
   */
  getFavoriteKeys() {
    return new Promise((resolve, reject) => {
      let keys = []
      AsyncStorage.getItem(this.favoriteKey, (error, result) => {
        if (!error) {
          keys = JSON.parse(result);
          resolve(keys)
        } else {
          reject(error);
        }
      }) 
    })
   
  }
  

  /**
   * 取消收藏,移除已经收藏的项目
   * @param key 项目 id
   */
  removeFavoriteItem(key) {
    this.updateFavoriteKeys(key, false)
  }

  /**
   * 获取所以收藏的项目
   * @return {Promise}
   */
  getAllItems() {
    return new Promise((resolve, reject) => {
      this.getFavoriteKeys().then(keys => {
        let items = [];
        if (keys) {
          AsyncStorage.multiGet(keys, (error, result) => {
            try {
              result.map((item, i, store) => {
                let key = store[i][0];
                let value = store[i][1];
                if (value) items.push(JSON.parse(value))
              })
              resolve(items)
            } catch (error) {
              reject(error)
            }
          })
        } else {
          resolve(items)
        }
      }).catch(error => {
        reject(error)
      })
    })
  }
}
