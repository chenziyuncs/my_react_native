export default class Utils {
   /**
   * 将数组中指定元素移除
   * @param array
   * @param item 要移除的item
   * @param id 要对比的属性，缺省则比较地址
   * @returns {*}
   */
  static remove(array: any, item: any, id?: any) {
    if (!array) {
      return;
    }
    for (let i = 0, l = array.length; i < l; i++) {
      const val = array[i];
      if (item === val || val && val[id] && val[id] === item[id]) {
        array.splice(i, 1);
      }
    }
    return array;
  }
  /**
   * 更新数组,若item已存在则将其从数组中删除,若不存在则将其添加到数组
   * **/
  static updateArray(array: any, item: any) {
    for (let i = 0, len = array.length; i < len; i++) {
      let temp = array[i];
      if (item === temp) {
        array.splice(i, 1);
        return;
      }
    }
    array.push(item);
  }
  /**
   * 检查key是否存在于keys中
   * @param keys
   * @param key
   */
  static checkFavorite(item: any, key = []) {
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
  static  removeDulplicates(arr: any, id: any){
    return arr.filter((oldItem: any, index: number) => {
      return arr.slice(index + 1).every((newItem: any) => {
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
   static isEqual(arr1: any, arr2: any) {
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
  // 判断数据内的数据是否存在
  static checkKeyIsExist (keys: any, key: any) {
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].name.toLowerCase() === key.toLowerCase()) return true;
    }
    return false
  }
}
