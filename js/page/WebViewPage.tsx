import React, { useState, useEffect } from 'react';
import NavigationBar from '../common/NavigationBar';
import { connect } from 'react-redux'
import { WebView } from 'react-native-webview'
import BackPressComponent from '../common/BackPressComponent'
import {
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native'
import ViewUtil from '../util/ViewUtil';
import NavigationUtil from '../navigator/NavigationUtil';
import SafeAreaVIewPlus from '../common/SafeAreaVIewPlus.js'

function WebViewPage (props: any) {
  const [theme, setTheme] = useState(props.theme)
  const [title, setTitle] = useState(props.route.params.title)
  const [url, setUrl] = useState(props.route.params.url)
  const [canGoBack, setCanGoBack] = useState(false)
  let webview: any;
  const [backPress, setBackPress] = useState(new BackPressComponent({ backPress: () =>  _onBackPress()}))
  useEffect(() => {
    backPress.componentDidMount();
    return function cleanup () {
      backPress.componentWillUnmount();
    }
  })
  const _onBackPress = () => {
    _onBlack();
    return true;
  }
  const _onBlack = () => {
    if (canGoBack && Platform.OS === 'ios') {
      webview.goBack();
    } else {
      NavigationUtil.goBack(props.navigation);
    }
  }
  const _onNavigationStateChange = (navState: any) => {
    setCanGoBack(navState.canGoBack)
    setUrl(navState.url)
  }
  let titleLayoutStyle = title.length > 20 ? {paddingRight: 30} : null;
  let navtartionBar = <NavigationBar
    leftButton={ViewUtil.getLeftBackButton(() => {
      _onBlack();
    })}
    titleLayoutStyle={titleLayoutStyle}
    title={title}
    style={{ backgroundColor: theme.themeColor.themeColor }}
  />
  return(
    <SafeAreaVIewPlus style={styles.container} topColor={theme.themeColor.themeColor}>
      {navtartionBar}
      <WebView
        ref={webview => webview = webview}
        startInLoadingState={true}
        source={{uri: url}}
        // 监听webview变化
        onNavigationStateChange={e => _onNavigationStateChange}
      />
    </SafeAreaVIewPlus>
  )
}

const mapStateToWebViewPage = (state: any) => ({
  theme: state.theme.theme
})

export default connect(mapStateToWebViewPage)(WebViewPage)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})