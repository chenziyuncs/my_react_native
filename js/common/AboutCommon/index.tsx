import BackPressComponent from '../BackPressComponent.js'
import NavigationUtil from '../../navigator/NavigationUtil.js'
import dataConfig from '../../res/data/dataConfig.json'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import GlobalStyles from '../../config/GlobalStyles'
import { Dimensions, Image, Platform, Text, View, StyleSheet } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import ViewUtil from '../../util/ViewUtil.js'
import React from 'react'

const TOP = (Platform.OS === 'ios') ? 20 + (DeviceInfo.hasNotch() ? 24 : 0) : 0;
const window = Dimensions.get('window')
const AVATAR_SIZE = 90
const PARALLAX_HEADER_HEIGHT = 270
const STICKY_HEADER_HEIGHT = (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios + TOP : GlobalStyles.nav_bar_height_android;
// 组装者模式实现页面
export const FLAG_ABOUT = { flag_about: 'about', flagg_about_me: 'about_me' }
export default class AboutCommon{
  backPress: BackPressComponent
  propsNew: any
  props: any
  updateState: any
  constructor(props: any, updateState: any) {
    this.props = props
    this.backPress = new BackPressComponent({ backPress: () => this.onBackPress() })
    this.updateState = updateState;
  }
  onBackPress () {
    NavigationUtil.goBack(this.props.navigation);
    return true
  }

  componentDidMount () {
    this.backPress.componentDidMount();
    this.updateState({
      data: dataConfig,
    });
    
  }

  componentWillUnmount () {
    this.backPress.componentWillUnmount();
  }

  _onShare () {

  }

  getParallaxRenderConfig (params: any) {
    let config = {} as any;
    let avatar = typeof (params.avatar) === 'string' ? {uri: params.avatar} : params.avatar;
    // 背景
    config.renderBackground = () => (
      <View key="background">
        <Image
          source={{
          uri: params.backgroundImg,// 加载网络图片必须https,否则ios不显示
          width: window.width,
          height: PARALLAX_HEADER_HEIGHT,
          }}
        />
        <View style={{
          position: 'absolute',
          top: 0,
          width: window.width,
          backgroundColor: 'rgba(0,0,0,.4)',
          height: PARALLAX_HEADER_HEIGHT,
        }}/>
      </View>
    )
    // 前景
    config.renderForeground = () => (
      <View key="parallax-header" style={styles.parallaxHeader}>
        <Image style={[styles.avatar, { width: 80, height: 80 }]}
          // source={avatar}
          source={require('../../res/img/1666261670694.jpg')}
        />
        <Text style={styles.sectionSpeakerText}>
          {params.name}
        </Text>
        <Text style={styles.sectionTitleText}>
          {params.description}
        </Text>
      </View>
    )
    // 悬浮header
    config.renderStickyHeader = () => (
      <View key="sticky-header" style={styles.stickySection}>
        <Text style={styles.stickySectionText}>{params.name}</Text>
      </View>
    )
    // 固定header
    config.renderFixedHeader = () => (
      <View key="fixed-header" style={styles.fixedSection}>
        {ViewUtil.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation))}
        {ViewUtil.getShareButton(() => this._onShare())}
      </View>
    )

    return config;
  }

  render (contentView: any, params: any) {
    const renderConfig = this.getParallaxRenderConfig(params)
    const {theme} = this.props;
    return (
      <ParallaxScrollView
        backgroundColor={theme}
        contentBackgroundColor={GlobalStyles.backgroundColor}
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        backgroundScrollSpeed={10}
        // renderForeground={() => {
        //   <View style={{ height:300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //     <Text>Hello Wrold</Text>
        //   </View>
        // }}
        {...renderConfig}
      >
        {/* 内容区域 */}
        {contentView}

      </ParallaxScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT,
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    alignItems: 'center',
    paddingTop: TOP,
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10,
  },
  fixedSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: TOP,
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20,
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 80
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5,
    marginBottom: 5,
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
    marginLeft: 10,
  }
})