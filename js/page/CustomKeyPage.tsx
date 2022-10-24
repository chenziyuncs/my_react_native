import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import BackPressComponent from '../common/BackPressComponent.js';
import { connect } from 'react-redux';
import NavigationUtil from '../navigator/NavigationUtil.js';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil.js';
import SafeAreaVIewPlus from '../common/SafeAreaVIewPlus.js';
import CheckBox from 'react-native-check-box';
import GlobalStyles from '../config/GlobalStyles';
import { showPop } from '../util/PopUpservice';
import Ionicons from 'react-native-vector-icons/Ionicons.js';
import action from '../action';
import Utils from '../util/Utils.js'
function CustomKeyPage (props: any) {
  const [backPress, setBackPress] = useState(new BackPressComponent({ backPress: () => _onBackPress() }));
  const [theme, setTheme] = useState(props.theme.themeColor);
  const [title, setTitle] = useState(props.route.params.title);
  const [flag, setFlag] = useState(props.route.params.flag);
  const [isRemove, setIsRmeove] = useState(props.route.params.isRemove);
  const _keys = (props: any, original?: any, state?: any) => {
    if (isRemove && !original) {
      //如果state中的keys为空则从props中取
      return state && state[flag] && state[flag].length !== 0 && state[flag] || props.keysAndLang[flag].map((val: any) => {
        return {//注意：不直接修改props，copy一份
          ...val,
          checked: false,
        };
      });
    } else {
      return props.keysAndLang[flag].map((val: any) => {
        // 复制一份数据，和原本数据区分开，这样如果操作此页面没有保存就返回上一页，再次进入之后保持原来数据状态
        return {
          ...val
        }
      })
    }
  }
  const [showList, setShowList] = useState(_keys(props));
  const [statusBar, setStatusBar] = useState({
    backgroundColor: theme,
    barStyle: 'light-content',
  });
  const [changeValues, setChangeValues] = useState([]);
 
  useEffect(() => {
    backPress.componentDidMount();
    return () => {
      backPress.componentWillUnmount();
    }
  });
  
  const _onBackPress = () => {
    _onBlack();
    return true;
  };

  const _onBlack = () => {
    const { onLoadKeysAndLang } = props
    if (changeValues.length > 0) {
      showPop({
        contentTxt: '是否保存更改?',
        confirmButtonTxt: '确定',
        confirmPress: () => {
          _saveClick()
        },
        cancelPress: () => {
          NavigationUtil.goBack(props.navigation);
        }
      })
    } else {
      NavigationUtil.goBack(props.navigation);
    }
    return true;
  };
  
  // 选中状态改变
  const _onChangeCheckbox = (item: any, index: number) => {
    const arrList = showList.slice();
    Utils.updateArray(changeValues, item)
    arrList[index].checked = !item.checked;
    setShowList([...arrList]);
  };
  // 设置checkbox的选中和未选中图片以及颜色
  const _checkedImage = (checked: boolean) => {
    return <Ionicons name={checked ? 'ios-checkbox' : 'md-square-outline'} size={20} style={{ color: theme }} />
  };
  const _renderCheckbox = (data: any, index: number) => {
    return <CheckBox
      style={{ flex: 1, padding: 10 }}
      isChecked={data.checked}
      onClick={() => _onChangeCheckbox(data, index)}
      leftText={data.name}
      checkedImage={_checkedImage(true)}
      unCheckedImage={_checkedImage(false)}
    >
    </CheckBox>
  };
  const _renderItems = () => {// 渲染内容
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
  };
  const _saveClick = () => {// 右上保存数据
    if (changeValues.length === 0) {
      NavigationUtil.goBack(props.navigation);
      return;
    }
    let isRemoveList;
    if (isRemove) {// 移除的时候特判断处理一下删除对应的数据
      changeValues.forEach((item: any) => {
        for (let i = 0; i < props.keysAndLang[flag].length; i++) {
          if (item.name === props.keysAndLang[flag][i].name && item.checked) {
            props.keysAndLang[flag].splice(i, 1)
          }
        }
        isRemoveList = props.keysAndLang[flag]
      })
    }
    const { onLoadKeysAndLang } = props;
    onLoadKeysAndLang(isRemoveList || showList, flag);
    NavigationUtil.goBack(props.navigation);
  };
  let titleLayoutStyle = title.length > 20 ? {paddingRight: 30} : null;
  let navigationBar = <NavigationBar
    statusBar={statusBar}
    leftButton={
      ViewUtil.getLeftBackButton(() => { _onBlack(); })}
        titleLayoutStyle={titleLayoutStyle}
        title={props.route.params.isRemove ? '标签移除' : title}
        style={{ backgroundColor: theme }}
    rightButton={
      <TouchableOpacity style={{ marginRight: 10}} onPress={() => _saveClick()}>
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
const mapDispatchToCustomKeyPage = (dispatch: any) => ({
  onLoadKeysAndLang: (data: any, key: string) => dispatch(action.onLoadKeysAndLang(data, key))
})
export default connect(mapStateToCustomKeyPage, mapDispatchToCustomKeyPage)(CustomKeyPage)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  showListItems: {
    flexDirection: 'row'
  }
})