import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import BackPressComponent from '../common/BackPressComponent.js'
import { connect } from 'react-redux'
import NavigationUtil from '../navigator/NavigationUtil.js';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil.js';
import SafeAreaVIewPlus from '../common/SafeAreaVIewPlus.js'

function CustomKeyPage (props: any) {
  const [backPress, setBackPress] = useState(new BackPressComponent({ backPress: () => _onBackPress() }))
  const [keysAndLangData, setKeysAndLangData] = useState(props.keysAndLang)
  const [theme, setTheme] = useState(props.theme.themeColor);
  const [title, setTitle] = useState(props.route.params.title)
  const [statusBar, setStatusBar] = useState({
    backgroundColor: theme,
    barStyle: 'light-content',
  })
  const _onBackPress = () => {
    _onBlack();
    return true;
  }
  const _onBlack = () => {
    NavigationUtil.goBack(props.navigation);
    return true
  }
  useEffect(() => {
    backPress.componentDidMount()
    return function cleanup () {
      backPress.componentWillUnmount()
    }
  })
  let titleLayoutStyle = title.length > 20 ? {paddingRight: 30} : null;
  let navigationBar = <NavigationBar
    leftButton={
      ViewUtil.getLeftBackButton(() => { _onBlack(); })}
        titleLayoutStyle={titleLayoutStyle}
        title={title}
        style={{ backgroundColor: theme }}
    rightButton={
      <TouchableOpacity style={{ marginRight: 10}}>
        <Text style={{ color: 'white', fontSize: 14 }}>保存</Text>
      </TouchableOpacity>
    }
    />
  return(
    <SafeAreaVIewPlus style={styles.container} topColor={theme}>
      {navigationBar}
      <Text>自定义语言</Text>
    </SafeAreaVIewPlus>
    
  )
}

const mapStateToCustomKeyPage = (state: any) => ({
  theme: state.theme.theme,
  keysAndLang: state.keysAndLang
})

export default connect(mapStateToCustomKeyPage, null)(CustomKeyPage)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})