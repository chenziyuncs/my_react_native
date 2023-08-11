import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  Platform,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux'; 'react-redux';
import GlobalStyles from '../config/GlobalStyles';
import DeviceInfo from 'react-native-device-info';
import { ThemeFlags } from '../config/ThemeFactory';
import action from '../action'
function CustomThemePage (props: any) {
  const _onSelectTheme = (themeKey: any) => {
    const { onShowThemeView, onThemeChange } = props;
    const newThemeFlag =  ThemeFlags as any
    onThemeChange(newThemeFlag[themeKey])
    onShowThemeView(false)
  }
  const _getTheme = (themeKey: any) => {
    const newThemeFlag =  ThemeFlags as any
    return <TouchableHighlight style={{ flex: 1 }} underlayColor='white' onPress={() => _onSelectTheme(themeKey)}>
      <View style={[{ backgroundColor: newThemeFlag[themeKey] }, styles.themeItem]}>
        <Text style={styles.themeText}>{themeKey}</Text>
      </View>
    </TouchableHighlight>
  }
  const _renderThemeItems = () => {
    const views = [] as any;
    for (let i = 0, keys = Object.keys(ThemeFlags), l = keys.length; i < l; i += 3) {
      const key1 = keys[i], key2 = keys[i + 1], key3 = keys[i + 2];
      views.push(<View key={i} style={{flexDirection: 'row'}}>
        {_getTheme(key1)}
        {_getTheme(key2)}
        {_getTheme(key3)}
      </View>);
    }
    return views;
  }
  const _renderCotentView = () => {
    return <Modal
      animationType={'slide'}
      transparent={true}
      visible={props.visible}
      onRequestClose={() => { // 在 ‘Android’ 平台，必需调用此函数  被销毁时会调用此函数
        props.onClose();
      }}
    >
      <View style={styles.modalContainer}>
        <ScrollView>
            {_renderThemeItems()}
        </ScrollView>
      </View>
    </Modal>
  }
  const _renderView = () => {
    return props.visible ? <View style={GlobalStyles.root_container}>
      { _renderCotentView() }
    </View> : null
  }
  return _renderView()
}

const mapDispatchToCustomThemePage = (dispatch: any) => ({
  onShowThemeView: (show: boolean) => dispatch(action.onShowThemeView(show)),
  onThemeChange: (theme: any) => dispatch(action.onThemeChange(theme))
})

export default connect(null, mapDispatchToCustomThemePage)(CustomThemePage)

const styles = StyleSheet.create({
  themeItem: {
    flex: 1,
    height: 120,
    margin: 3,
    padding: 3,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    margin: 10,
    marginBottom: 10 + (DeviceInfo.hasNotch() ? 24 : 0),
    marginTop: Platform.OS === 'ios' ? 20 + (DeviceInfo.hasNotch() ? 24 : 0) : 10,
    backgroundColor: 'white',
    borderRadius: 3,
    shadowColor: 'gray',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    padding: 3,
  },
  themeText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
})