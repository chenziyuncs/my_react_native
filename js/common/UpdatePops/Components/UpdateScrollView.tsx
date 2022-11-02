import React, { Component } from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
import DeviceInfo from 'react-native-device-info'
// IOS下的回弹效果
const bouncesDefault = false
interface Props {
  codePushUpdateInfo: any,
  isShowStaticTxt: any
}

export default class UpdateScrollView extends Component<Props> {
  shouldComponentUpdate(nextProps: { codePushUpdateInfo: any }) {
    const { codePushUpdateInfo } = this.props
    const { codePushUpdateInfo: codePushUpdateInfoNext } = nextProps
    return codePushUpdateInfo !== codePushUpdateInfoNext
  }

  render() {
    console.log(DeviceInfo.getVersion(), 'getversion')
    const { codePushUpdateInfo, isShowStaticTxt } = this.props
    if (!codePushUpdateInfo && !codePushUpdateInfo.description) return null
    // if (!codePushUpdateInfo) return null
    // let descriptionInfo
    // try {
    //   descriptionInfo = JSON.parse(codePushUpdateInfo.description)
    // } catch (e) {
    //   console.log(e)
    //   descriptionInfo = {}
    // }
    if (codePushUpdateInfo) {
      return (
        <ScrollView bounces={bouncesDefault} style={styles.scrollViewWrapper}>
          <Text style={{
            display: isShowStaticTxt ? 'flex' : 'none',
            color: '#000'
          }}>
            检测到应用有新的更新
          </Text>
          <Text style={{
            display: isShowStaticTxt ? 'flex' : 'none',
            color: '#000'
          }}>
            是否立即更新您的应用并重启
          </Text>
          <Text style={{
            display: codePushUpdateInfo ? 'flex' : 'none', 
            color: '#000'
          }}>
            当前版本号
            :
            { codePushUpdateInfo.appVersion }
          </Text>
          <Text style={{
            display: codePushUpdateInfo.label ? 'flex' : 'none',
            color: '#000'
          }}>
            补丁版本号
            :
            { codePushUpdateInfo.label }
          </Text>
          <Text style={{
            display: codePushUpdateInfo.description ? 'flex' : 'none',
            color: '#000'
          }}>
            本次更新的内容
            :
          </Text>
          <View style={{
            display: codePushUpdateInfo.description ? 'flex' : 'none',
            ...styles.updateItems
          }}>
            <Text style={{color: '#000'}}>
            { codePushUpdateInfo.description }
          </Text>
          </View>
        </ScrollView>
      )
    }
    return (<Text>当前版本已经是最新版本</Text>)
  }
}

const styles = StyleSheet.create({
  scrollViewWrapper: {
    maxHeight: 200,
    width: '100%'
  },
  updateItems: {
    flexDirection: 'column',
    color: '#000'
  }
})

