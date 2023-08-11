import React, { forwardRef, useState, useImperativeHandle } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
const colorInfo = {
  loadingSuccessIconColor: '#007515',
  loadingErrorIconColor: '#ff0b17',
  loadingWrapperBgColor: 'rgba(0, 0, 0, 0)',
  loadingInnerBgColor: 'rgba(0, 0, 0, .8)',
  loadingTxt: '#fff'
}
function Loading (props: any, ref: any) {
  const [loadingText, setLoadingText] = useState('加载中...'); // 文本
  const [loadingVisible, setLoadingVisible] = useState(false); // 控制是否显示loading
  const [hideLoadingStatus, setHideLoadingStatus] = useState(0); // 控制显示的状态 0 直接消失 2 显示成功后消失 1 显示失败后消失
  const showLoading = (loadingText: string) => {
    if (loadingVisible) {
      return
    } else {
      setLoadingVisible(true)
      setHideLoadingStatus(0)
      setLoadingText(loadingText || '加载中...')
    }
  }
  const hideLoading = (status = 0, hideLoadingText: string) => {
    if (!loadingVisible) {
      return
    } else {
      switch (status) {
        case 0:
          setLoadingVisible(false)
          return
        case 1:
          setHideLoadingStatus(status)
          setLoadingText(hideLoadingText || '失败')
          return setTimeout(() => {
            setLoadingVisible(false)
          }, 1500)
        case 2:
          setHideLoadingStatus(status)
          setLoadingText(hideLoadingText || '成功')
          return setTimeout(() => {
            setLoadingVisible(false)
          }, 1500)
      }
    }
  }
  const _renderLoadingIconByStatus = () => {// 根据不同的status渲染不同的loading图标
    switch (hideLoadingStatus) {
      case 0:
        return <ActivityIndicator size="small" color={'#6495ED'} animating={true} />
      case 1:
        return <MaterialIcons name="error" style={styles.loadingErrorIcon} />
      case 2:
        return <AntDesign name="checkcircle" style={styles.loadingSuccessIcon} />
      default:
        return null
    }
    
  }
  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    showLoading,
    hideLoading
  }));
  return loadingVisible ? <View style={styles.loadingWrapper}>
    <View style={[styles.loadingInner, {flexDirection: hideLoadingStatus === 0 ? 'row' : 'column'}]}>
      {_renderLoadingIconByStatus()}
      <Text style={styles.loadingTxt}> {loadingText} </Text>
    </View>
  </View> : null
}

const styles = StyleSheet.create({
  loadingWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 999,
    height: '100%',
    backgroundColor: colorInfo.loadingWrapperBgColor,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingInner: {
    width: 150,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colorInfo.loadingInnerBgColor,
    flexDirection: 'row',
  },
  loadingTxt: {
    textAlign: 'center',
    // letterSpacing: 1,
    // paddingLeft: 10,
    // paddingRight: 10,
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    color: colorInfo.loadingTxt
  },
  loadingErrorIcon: {
    width: 100,
    height: 80,
    textAlign: 'center',
    lineHeight: 100,
    fontSize: 57,
    color: colorInfo.loadingErrorIconColor
  },
  loadingSuccessIcon: {
    width: 100,
    height: 80,
    textAlign: 'center',
    lineHeight: 100,
    fontSize: 57,
    color: colorInfo.loadingSuccessIconColor
  },
  loadingIcon: {
    width: 80
  }
})

export default forwardRef(Loading)