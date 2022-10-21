import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import action from '../action';
import NavigationUtil from '../navigator/NavigationUtil.js'
import NavigationBar from '../common/NavigationBar';
import { MORE_MENU } from '../common/More_menu'
import Ionicons from 'react-native-vector-icons/Ionicons'
import GlobalStyles from '../config/GlobalStyles'
import ViewUtil from '../util/ViewUtil';
interface Props {
  navigation: any
}
function MyPage(props: any){
  const [theme, setTheme] = useState(props.theme.theme.themeColor);
  useEffect(() => {
  })
  const [statusBar, setStatusBar] = useState({
    backgroundColor: theme,
    barStyle: 'light-content',
  })
  const _changeTheme = () => {
    const { onThemeChange } = props;
    const newTheme = {
      themeColor: 'red'
    }
    onThemeChange(newTheme)
    setTheme(newTheme.themeColor)
  }
  const _onLoginoutClick = () => {
    const { logoutDispatch } = props
    logoutDispatch().then((res: any) => {
      if (res.code === 200) {
        NavigationUtil.login()
      }
    })
  }
  const _onClick = (menu: any) => {
    let routeName = null;
    let params = {theme: theme} as any;
    switch (menu) {
      case MORE_MENU.Tutorial:
        routeName = 'WebViewPage'
        params = {
          title: '教程',
          url: 'https://coding.m.imooc.com/classindex.html?cid=304'
        }
        break;
      case MORE_MENU.About:
        routeName = 'AboutPage'
        break;
      case MORE_MENU.About_Author:
        routeName = 'AboutMePage'
        break;
      case MORE_MENU.Custom_Language:
        routeName = 'CustomKeyPage';
        params = {
          flag: 'key',
          isRemove: false,
          title: '自定义语言'
        }
        break;
    }
    if (routeName) {
      NavigationUtil.goPage(params, routeName)
    }
  }
  let navigationBar = <NavigationBar
    title={'我的'}
    statusBar={statusBar}
  />
  const getItem = (menu: any) => {
    return ViewUtil.getMenuItem(() => _onClick(menu), menu, theme, 'chevron-forward')
  }
    
  return(
    <View style={GlobalStyles.root_container}>
      {navigationBar}
      <ScrollView>
        <TouchableOpacity
          style={styles.top_title}
          onPress={() => {
          _onClick(MORE_MENU.About)
          }}
        >
          <View style={styles.about_left}>
            <Ionicons name={MORE_MENU.About.icon} size={40} style={[styles.icon_style, {color: theme}]} />
            <Text>GitHub Popular</Text>
          </View>
          <Ionicons name={'chevron-forward'} size={16} style={[styles.icon_style, {color: theme}]} />
        </TouchableOpacity>
        <View style={GlobalStyles.line}></View>
        {/*教程 */}
        {getItem(MORE_MENU.Tutorial)}
        {/*趋势管理 */}
        <Text style={styles.groupTitle}>趋势管理</Text>
        {/*自定义语言 */}
        {getItem(MORE_MENU.Custom_Language)}
        <View style={GlobalStyles.line}></View>
        {/*语言排序 */}
        {getItem(MORE_MENU.Sort_Language)}
        {/*最热管理 */}
        <Text style={styles.groupTitle}>最热管理</Text>
        {/*自定义标签 */}
        {getItem(MORE_MENU.Custom_Key)}
        <View style={GlobalStyles.line}></View>
        {/*标签排序 */}
        {getItem(MORE_MENU.Sort_Key)}
        <View style={GlobalStyles.line}></View>
        {/*标签移除 */}
        {getItem(MORE_MENU.Remove_Key)}
        {/*设置 */}
        <Text style={styles.groupTitle}>设置</Text>
        {/*自定义主题 */}
        {getItem(MORE_MENU.Custom_Theme)}
        <View style={GlobalStyles.line}></View>
        {/*关于作者 */}
        {getItem(MORE_MENU.About_Author)}
        <View style={GlobalStyles.line}></View>
         {/*反馈 */}
        {getItem(MORE_MENU.Feedback)}

        <TouchableOpacity style={styles.confirmButton} onPress={() => {
          _onLoginoutClick();
        }}>
          <Text style={styles.confirmTitle}>退出</Text>
        </TouchableOpacity>
        {/* <Button title={`改变主题: 当前主题${theme}`} onPress={() => {
          _changeTheme();
        }} /> */}
      </ScrollView>
    </View>
  )
}
const mapStateToFavorite = (state: any) => ({
  theme: state.theme
})

const mapDispatchToFavorite = (dispatch: any) => ({
  onThemeChange: (theme: any) => dispatch(action.onThemeChange(theme)),
  logoutDispatch: () => dispatch(action.logoutDispatch())
})
export default connect(mapStateToFavorite, mapDispatchToFavorite)(MyPage)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  confirmButton: {
    backgroundColor: '#2196F3',
    alignItems: 'center',
    padding: 12,
    margin: 20,
    marginTop: 30,
    borderRadius: 5
  },
  confirmTitle: {
    fontSize: 20,
    color: 'white'
  },
  about_left: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  top_title: {
    backgroundColor: 'white',
    padding: 10,
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  icon_style: {
    marginRight: 10,
    alignSelf: 'center',
  },
  groupTitle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 12,
    color: 'gray'
  }
})