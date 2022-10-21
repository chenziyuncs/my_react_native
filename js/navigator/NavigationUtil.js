import { StackActions } from '@react-navigation/native'
/**
 * 全局导航跳转工具类
 */
export default class NavigationUtil {
  /**
   * 跳转到指定页面
   * @param {*} parmas 要传递的参数
   * @param {*} page 要跳转的页面名
   */
  static goPage(parmas, page) {
    const navigation = NavigationUtil.navigation || (parmas || {}).navigation;
    if (!navigation) {
      console.log('NavigationUtil.navigation can not be null');
      return;
    }
    navigation.navigate(page, {
      ...parmas,
      navigation: undefined
    })
  }
  /**
   * 返回上一页
   * @param {*} navigation
   */
  static goBack(navigation) {
    navigation.goBack();
  }
  /**
   * 重置到首页
   * 
   */
  static resetToHomePage(parmas) {
    const { navigation } = parmas;
    navigation.dispatch(StackActions.replace('HomePage'), {});
  }
  /**
   * 重置到登录
   * 
   */
   static login(parmas = {}) {
    let { navigation } = parmas;
    if (!navigation) {
      navigation = NavigationUtil.navigation;
    }
    navigation.dispatch(StackActions.replace('LoginPage'), {});
  }
   /**
   * 重置到注册
   * 
   */
    static registration(parmas = {}) {
      let { navigation } = parmas;
      if (!navigation) {
        navigation = NavigationUtil.navigation;
      }
      navigation.dispatch(StackActions.replace('RegistrationPage'), {});
    }
}

NavigationUtil.navigation = undefined;

