import React, { Component } from 'react';
import {
  View,
  Platform,
  StatusBar,
  StyleSheet,
  // DeviceInfo,
  Text
} from 'react-native';
import {PropTypes}  from 'prop-types';
import DeviceInfo from 'react-native-device-info'
import { ViewPropTypes } from 'deprecated-react-native-prop-types'
const NAV_BAR_HEIGHT_IOS = 44;// ios导航栏的高度
const NAV_BAR_HEIGHT_ANDROID = 50;// 安卓导航栏的高度
const NAV_BAR_HEIGHT = Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID
const STATUS_BAR_HEIGHT = (Platform.OS !== 'ios' || DeviceInfo.hasNotch()) ? 0 : 20;// 状态栏的高度

export const NAVIGATION_BAR_HEIGHT = NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT;// 暴露出去组件的总高度固定参数
const StatusBarShape = {// 设置状态栏接受的值
  barStyle: PropTypes.oneOf(['light-content', 'default']),
  hidden: PropTypes.bool,
  backgroundColor: PropTypes.string
}
export default class NavigationBar extends Component {
  // 提供属性的类型检查
  static propTypes = {
    style: ViewPropTypes.style,
    title: PropTypes.string,
    titleView: PropTypes.element,
    hide: PropTypes.bool,
    statusBar: PropTypes.shape(StatusBarShape),
    rightButton: PropTypes.element,
    leftButton: PropTypes.element,
    titleLayoutStyle: ViewPropTypes.style,
  }
  // 设置默认属性
  static defaultProps = {
    statusBar: {
      barStyle: 'light-content',
      hidden: false
    }
  }
  getButtonElement(data) {
    return (
      <View style={styles.navBarButton}>
        {data ? data : null}
      </View>
    );

  }
  render()  {
    const statusBar = !this.props.statusBar.hidden ?
      <View style={styles.statusBar}>
        <StatusBar {...this.props.statusBar} />
      </View> : null
    const titleView = this.props.titleView ? this.props.titleView :
      <Text ellipsizeMode='head' numberOfLines={1} style={styles.title}>
      {this.props.title}
      </Text>
    let content = this.props.hide ? null : <View style={styles.navBar}>
      {this.getButtonElement(this.props.leftButton)} 
      <View style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
        {titleView}
      </View>
      {this.getButtonElement(this.props.rightButton)}
      </View>
    return (
      <View style={[this.props.statusBar, this.props.style]}>
        {statusBar}
        {content}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: 'white'
  },
  navBarButton: {
    alignItems: 'center',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: NAV_BAR_HEIGHT
  },
  navBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
  },
})