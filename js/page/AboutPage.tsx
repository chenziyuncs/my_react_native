import React, { Component } from 'react';
import AboutCommon, { FLAG_ABOUT } from '../common/AboutCommon'
import {
  StyleSheet,
  Text,
  View,
  Linking
} from 'react-native'
import dataConfig from '../res/data/dataConfig.json'
import { MORE_MENU } from '../common/More_menu';
import ViewUtil from '../util/ViewUtil';
import NavigationUtil from '../navigator/NavigationUtil';
import { connect } from 'react-redux';
import GlobalStyles from '../config/GlobalStyles';

interface Props {
  navigation: any,
  theme: any,
  route: any
}
class AboutPage extends Component<Props> {
  params: any;
  aboutCommon: AboutCommon;
  dataObject: { aboutMe: { Tutorial: { name: string; icon: string; items: { title: string; url: string; }[]; }; Blog: { name: string; icon: string; items: { title: string; url: string; }[]; }; contact: { name: string; icon: string; items: { QQ: { title: string; account: string; }; Email: { title: string; account: string; }; }; }; QQ: { name: string; icon: string; items: { title: string; account: string; }[]; }; }; info: { html_url: string; url: string; currentRepoUrl: string; }; author: { name: string; description: string; avatar: string; backgroundImg: string; url: string; }; app: { name: string; description: string; avatar: string; backgroundImg: string; }; };
  constructor (props: any) {
    super(props)
    this.params = this.props.route.params
    this.dataObject = dataConfig
    this.state = {
      data: dataConfig
    }
    this.aboutCommon = new AboutCommon({
      ...this.params,
      navigation: this.props.navigation,
      flagAbout: FLAG_ABOUT.flag_about
    }, (data: any) => this.setState({ ...data }))
   
  }
  _onClick (menu: any) {
    let routeName = null;
    let params = {theme: this.props.theme.themeColor} as any;
    switch (menu) {
      case MORE_MENU.Tutorial:
        routeName = 'WebViewPage'
        params = {
          title: '教程',
          url: 'https://coding.m.imooc.com/classindex.html?cid=304'
        }
        break;
      case MORE_MENU.About_Author:
        routeName = 'AboutMePage';
        break;
      case MORE_MENU.Feedback:
        const url = 'mailto://crazycodeboy@gmail.com';
        Linking.canOpenURL(url).then((support: boolean) => {// 判断用户手机是否装邮箱
          if (!support) {
            console.log('无法处理这个邮箱地址:' + url)
          } else {
            Linking.openURL(url);
          }
        }).catch((error: any) => {
          console.error('发生错误', error)
        })
        break;
    }
    if (routeName) {
      NavigationUtil.goPage(params, routeName)
    }
  }
  getItem (menu: any) {
    return ViewUtil.getMenuItem(() => this._onClick(menu), menu, this.props.theme.themeColor, 'chevron-forward')
  }
  render () {
    const content = <View>
      {this.getItem(MORE_MENU.Tutorial)}
      <View style={GlobalStyles.line}></View>
      {this.getItem(MORE_MENU.About_Author)}
      <View style={GlobalStyles.line}></View>
      {this.getItem(MORE_MENU.Feedback)}
    </View>
    return this.aboutCommon.render(content, this.dataObject.app)
  }
}

const mapStateToAboutPage = (state: any) => ({
  theme: state.theme.theme
})

export default connect(mapStateToAboutPage)(AboutPage)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})