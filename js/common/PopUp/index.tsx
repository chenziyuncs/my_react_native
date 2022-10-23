import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react'

import {
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  View,
  Text
} from 'react-native'

import IconSet from '../../Icon/Icon.js'

const contenTxtDefault = '确认执行当前操作'
const colorInfo = {
  wrapperModeBgColor: 'rgba(0, 0, 0, 0.8)',
  contentModeBgColor: '#fff',
  confirmButtonBg: '#2196F3',
  cancelButtonBg: '#919191',
  textColor: '#fff',
  warningIconColor: '#ffd00c'
}
/**
 * PopSetting
 * @param contentTxt 文本 
 * @param contentNode 节点
 * @param noShowCancel 是否显示取消按钮
 * @param ShowOtherBtn 是否显示确定按钮  
 * @param cancelButtonTxt  取消文本
 * @param confirmButtonTxt 确定文本
 * @param noShowCloseIcon  是否显示icon图标
 * @param confirmPress 确定事件
 * @param cancelPress 取消事件
 * @param verifyClose 校验
 * @returns 
 */
function PopUp (props: any, ref: any) {
  const [opacity, setOpacity] = useState(new Animated.Value(0))
  const [scaleValue, setScaleValue] = useState(new Animated.Value(0))
  const [displayMode, setDisplayMode] = useState('none')
  const [PopSetting, setPopSetting] = useState({} as any)
  const [renderToHardwareTextureAndroid, setRenderToHardwareTextureAndroid] = useState(false)
  const [maskShow, setMaskShow] = useState(Animated.timing(// 遮罩层的显示
    opacity,
    {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true
    }
  ))
  const [contentShow, setContentShow] = useState(Animated.spring(// 内容区域的显示
    scaleValue,
    {
      toValue: 1,
      speed: 40,
      useNativeDriver: true
    }
  ))
  const [maskHide, setMaskHide] = useState(Animated.timing(// 遮罩层区域的隐藏
    opacity,
    {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true
    }
  ))
  useEffect(() => {

  })
  useImperativeHandle(ref, () => ({
    // 暴露show给父组件
    show,
  }));
  const show = (PopSetting: any) => {
    if (PopSetting) {
      setPopSetting({...PopSetting})
    }
    setRenderToHardwareTextureAndroid(true)
    setDisplayMode('flex')
    setScaleValue(new Animated.Value(1))
    contentShow.start()
    maskShow.start()
  }
  const hide = (cb: any) => {
    maskHide.start(() => {
      setRenderToHardwareTextureAndroid(false)
      setDisplayMode('none')
      setPopSetting({})
      if (cb) cb()
    })
  }
  // 取消按钮
  const _cancelPress = () => {
    if (PopSetting.verifyCancelClose) {
      return PopSetting.verifyCancelClose().then(() => {
        hide(PopSetting && PopSetting.cancelPress)
      }).catch((err: any) => err)
    }
    hide(
      PopSetting && PopSetting.cancelPress
    )
  }
  // 确认按钮
  const _confirmPress = () => {
    if (PopSetting.verifyClose) {
      return PopSetting.verifyClose().then(() => {
        hide(PopSetting && PopSetting.confirmPress)
      }).catch((err: any) => err)
    }
    hide(
      PopSetting && PopSetting.confirmPress
    )
  }
  const _renderContent = () => {
    const { contentNode, contentTxt } = PopSetting
    if (displayMode === 'none') return null
    if (props.children) return props.children
    if (contentNode) return contentNode
    return (
      <View style={styles.defaultInner}>
        <IconSet name="zhuyi" style={styles.warningIcon} />
        <Text style={styles.contentTxt}>
          { contentTxt || contenTxtDefault }
        </Text>
      </View>
    )
  }
  return (
    <Animated.View renderToHardwareTextureAndroid={renderToHardwareTextureAndroid} ref={ref}
      style={{
        ...styles.wrapperMode,
        ...props.style,
        display: displayMode,
        position: displayMode === 'none' ? 'relative' : 'absolute', // 修复position在安卓下和display冲突导致display不生效的错误
        opacity
      }}
    >
      <Animated.View style={{...styles.contentMode, transform: [{ scale: scaleValue }, { perspective: 1000 }]}}>
        <TouchableOpacity onPress={() => _cancelPress()}  style={{ display: PopSetting.noShowCloseIcon ? 'none' : 'flex' }}>
          <View style={styles.contentHeader}>
            <IconSet name="guanbi" style={styles.closeIcon} />
          </View>
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          { _renderContent() }
        </View>
        <View style={styles.bottomBtn}>
          {
            PopSetting.noShowCancel ? null : (
              <TouchableOpacity onPress={() => _cancelPress()} style={styles.cancelButton}>
                <Text style={styles.buttonTxt}>
                  { PopSetting.cancelButtonTxt || '取消' }
                </Text>
              </TouchableOpacity>
            )
          }
          {
            PopSetting.ShowOtherBtn ? PopSetting.ShowOtherBtn : (
              <TouchableOpacity onPress={() => _confirmPress()} style={styles.confirmButton}>
                <Text style={styles.buttonTxt}>
                  { PopSetting.confirmButtonTxt || '确认' }
                </Text>
              </TouchableOpacity>
             )
            }
        </View>
      </Animated.View>

    </Animated.View>
  )
}
export default forwardRef(PopUp)
const styles = StyleSheet.create({
  wrapperMode: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colorInfo.wrapperModeBgColor,
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentMode: {
    width: '80%',
    flexDirection: 'column',
    backgroundColor: colorInfo.contentModeBgColor,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    overflow: 'hidden'
  },
  contentHeader: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 10
  },
  closeIcon: {
    fontSize: 16
  },
  contentContainer: {
    padding: 10,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentTxt: {
    width: '70%',
    textAlign: 'center',
    color: '#000'
  },
  warningIcon: {
    fontSize: 30,
    color: colorInfo.warningIconColor
  },
  bottomBtn: {
    flexDirection: 'row',
    backgroundColor: '#666',
    height: 35
  },
  confirmButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorInfo.confirmButtonBg
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colorInfo.cancelButtonBg
  },
  buttonTxt: {
    color: colorInfo.textColor
  },
  defaultInner: {
    flexDirection: 'row',
    alignItems: 'center'
  },
})