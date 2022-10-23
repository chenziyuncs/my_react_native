import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native'
import BackPressComponent from '../common/BackPressComponent.js'
import { connect } from 'react-redux'
import NavigationUtil from '../navigator/NavigationUtil.js';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil.js';
import SafeAreaVIewPlus from '../common/SafeAreaVIewPlus.js'
import CheckBox from 'react-native-check-box'
import GlobalStyles from '../config/GlobalStyles';
import { showPop } from '../util/PopUpservice'

function CustomKeyPage (props: any) {
  const [backPress, setBackPress] = useState(new BackPressComponent({ backPress: () => _onBackPress() }))
  const [keysAndLangData, setKeysAndLangData] = useState(props.keysAndLang)
  const [theme, setTheme] = useState(props.theme.themeColor);
  const [title, setTitle] = useState(props.route.params.title)
  const [flag, setFlag] = useState(props.route.params.flag)
  const [showList, setShowList] = useState([] as any)
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
    
    if (flag === 'key') {
      setShowList([...keysAndLangData['keys']])
    } else {
      setShowList([...keysAndLangData['lang']])
    }
    return () => {
      backPress.componentWillUnmount()
    }
  }, [])
  const _onChangeCheckbox = (item: any, index: number) => {
    const arrList = showList.slice()
    arrList[index].checked = !item.checked
    setShowList([...arrList])
    showPop({
      contentTxt: '选中成功',
      confirmButtonTxt: '确定',
      confirmPress: () => {
        NavigationUtil.goBack(props.navigation);
      }
    })
  }
  const _renderCheckbox = (data: any, index: number) => {
    return <CheckBox style={{ flex: 1, padding: 10 }}
      isChecked={data.checked}
      onClick={() => _onChangeCheckbox(data, index)}
      leftText={data.name}
    >
    </CheckBox>
  }
  const _renderItems = () => {
    if (!showList || showList.length === 0) {
      return <View>
        <Text>暂无数据</Text>
      </View>
    }
    let views = [] as any
    for (let i = 0; i < showList.length; i += 2) {
      views.push(
      <View key={i}>
        <View style={styles.showListItems}>
          {_renderCheckbox(showList[i], i)}
          {i + 1 < showList.length ? _renderCheckbox(showList[i + 1], i + 1): null}
        </View>
        <View style={GlobalStyles.line}></View>
      </View>
      )
    }
    
    return views;
  }
  let titleLayoutStyle = title.length > 20 ? {paddingRight: 30} : null;
  let navigationBar = <NavigationBar
    statusBar={statusBar}
    leftButton={
      ViewUtil.getLeftBackButton(() => { _onBlack(); })}
        titleLayoutStyle={titleLayoutStyle}
        title={props.route.params.isRemove ? '标签移除' : title}
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
      <ScrollView >
        {_renderItems()}
      </ScrollView>
      
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
  },
  showListItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  }
})