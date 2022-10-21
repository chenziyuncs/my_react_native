import React, { Component, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  // Clipboard
} from 'react-native'
import { connect } from 'react-redux'
import AboutCommon, { FLAG_ABOUT } from '../common/AboutCommon'
import { MORE_MENU } from '../common/More_menu';
import GlobalStyles from '../config/GlobalStyles';
import dataConfig from '../res/data/dataConfig.json'
import ViewUtil from '../util/ViewUtil';
import Clipboard from '@react-native-clipboard/clipboard'
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationUtil from '../navigator/NavigationUtil';
import Toast from '../common/Toast'


function AboutMePage(props: any) {
  const [params, setParams] = useState(props.route.params);
  const [dataObject, setDataObject] = useState({data: dataConfig, showTutorial: true , showBlog: false, showQQ: false, showContact: false} as any);
  const [aboutCommon, setAboutCommon] = useState(new AboutCommon({
    ...params,
    navigation: props.navigation,
    flagAbout: FLAG_ABOUT.flagg_about_me
  }, (data: any) => setDataObject({...data})))
  const _onClick = (menu: any) => {
    if (!menu) return null
    if (menu.url) {
      NavigationUtil.goPage({
        title: menu.title,
        url: menu.url
      }, 'WebViewPage')
    }
    if (menu.account && menu.account.indexOf('@') > -1) {
      let url = `mailto://${menu.account}`
      Linking.canOpenURL(url).then((res: boolean) => {
        if (!res) {
          console.log('无法处理这个邮箱地址:' + url)
        } else {
          Linking.openURL(url);
        }
      })
    }
    if (menu.account) {
      Clipboard.setString(menu.account);
      Clipboard.getString().then(res => {
        Toast.show(`${menu.title}:${res}已复制到剪切板`, 3000)
      })
     
    }
  }
  const _item = (menu: any, isShow: boolean, key: string) => {
    return ViewUtil.getSettingItem(() => {
      setDataObject({
        ...dataObject,
        [key]: !dataObject[key]
      });
    }, menu.name, props.theme.themeColor, Ionicons, menu.icon , isShow ? 'chevron-up' : 'chevron-down-outline')
  }
  const renderItems = (doc: any, isShowAccount?: boolean) => {
    let views: any = [];
    if (!doc) {
      return null;
    } else {
      for (let i in doc) {
        let title = isShowAccount ? `${doc[i].title}:${doc[i].account}` : doc[i].title
        views.push(
          <View key={i}>
            <TouchableOpacity onPress={() => {
              _onClick(doc[i]);
            }} style={styles.setting_item_container}>
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <View style={{opacity: 1, width: 16, height: 16, marginRight: 10}}/>
                <Text>{title}</Text>
              </View>
            </TouchableOpacity>
            <View style={GlobalStyles.line}></View>
          </View>
        )
      }
    }
    return views;
    
  }
  const content = <View>
    {_item(dataObject.data.aboutMe.Tutorial, dataObject.showTutorial , 'showTutorial')}
    <View style={GlobalStyles.line}></View>
    {dataObject.showTutorial ? renderItems(dataObject.data.aboutMe.Tutorial.items, false) : null}
    {_item(dataObject.data.aboutMe.Blog, dataObject.showBlog, 'showBlog')}
    <View style={GlobalStyles.line}></View>
    {dataObject.showBlog ? renderItems(dataObject.data.aboutMe.Blog.items, false) : null}
    {_item(dataObject.data.aboutMe.QQ, dataObject.showQQ, 'showQQ')}
    <View style={GlobalStyles.line}></View>
    {dataObject.showQQ ? renderItems(dataObject.data.aboutMe.QQ.items, true) : null}
    {_item(dataObject.data.aboutMe.contact, dataObject.showContact , 'showContact')}
    <View style={GlobalStyles.line}></View>
    {dataObject.showContact ? renderItems(dataObject.data.aboutMe.contact.items, true) : null}
  </View>
  return aboutCommon.render(content, dataObject.data.author)
}

const mapStateToAboutMePage = (state: any) => ({
  theme: state.theme.theme
})

export default connect(mapStateToAboutMePage)(AboutMePage)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  setting_item_container: {
    backgroundColor: 'white',
    padding: 10, height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
})