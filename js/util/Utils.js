export default class Utils {
  /**
   * 检查该Item是否被收藏
   * **/
  // static checkFavorite(item, keys = []) {
  //   if (!keys) {
  //     return false;
  //   }
  //   for (let i = 0, len = keys.length; i < len; i++) {
  //     let id = item.id ? item.id : item.fullName;
  //     if (id.toString() === keys[i]) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  /**
   * 检查key是否存在于keys中
   * @param keys
   * @param key
   */
  static checkFavorite(item, key = []) {
    if (!key) return false
    for (let i = 0; i < key.length;i++) {
      let id = item.id ? item.id : item.fullName;
      if (id.toString() === key[i]) {
        return true;
      }
    }
    return false
  }
  // 数组和数组对象去重
  static  removeDulplicates(arr, id){
    return arr.filter((oldItem,index) => {
      return arr.slice(index + 1).every((newItem) => {
        if (id) {
          return newItem[id] !== oldItem[id]
        } else {
          return newItem !== oldItem
        }
      })
    })
  }
  /**
   * 判断两个数组的是否相等
   * @return boolean true 数组长度相等且对应元素相等
   * 
  */
   static isEqual(arr1, arr2) {
    if (!(arr1 && arr2)) {
        return false;
    }
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0, l = arr1.length; i < l; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
  }
}
