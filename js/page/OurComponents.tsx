import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  // Button,
  TouchableNativeFeedback,
  Text,
  Dimensions
} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';
import SafeAreaVIewPlus from '../common/SafeAreaVIewPlus';
import { connect } from 'react-redux';
import BackPressComponent from '../common/BackPressComponent.js';
import NavigationBar from '../common/NavigationBar';
import { useTranslation } from 'react-i18next';
import ViewUtil from '../util/ViewUtil';
import Select from '../common/Select';
import ModalPopup from '../common/Modal';
import Button from '../common/Button';

let deviceWidth: any;
let deviceHeight: any;

function getDeviceWidth() {
  if (deviceWidth) {
    return deviceWidth;
  } else {
    deviceWidth = Dimensions.get('window').width;
    return deviceWidth;
  }
}
function getDeviceHeight() {
  if (deviceHeight) {
    return deviceHeight;
  } else {
    deviceHeight = Dimensions.get('window').height;
    return deviceHeight;
  }
}
function OurComponents(props: any) {
  const userBillTypeOptions = [
    { label: '全部', value: '0', key: 'all' } ,
    { label: '系统校正', value: '1', key: 'system' },
    { label: '商品面额到账', value: '2', key: 'commodity' },
    { label: '后台商品到账', value: '3', key: 'systemCommodity' },
    { label: '用户兑换', value: '4', key: 'userPay' },
    { label: '转账支付', value: '5', key: 'transferSpending' },
    { label: '转账收入', value: '6', key: 'transferIncome' },
    { label: '后台兑换', value: '7', key: 'exchange' },
  ];
  const [backPress] = useState(new BackPressComponent({ backPress: () => _onBackPress() }));
  const [type, setType] = useState({ label: '全部', value: '0', key: 'all' });
  const [typeArr] = useState(userBillTypeOptions);
  const [modalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();
  let navigationBar = <NavigationBar
    leftButton={ViewUtil.getLeftBackButton(() => {
      _onBlack();
    })}
    title={t('组件')}
    statusBar={{
      backgroundColor: props.theme.themeColor,
      barStyle: 'light-content',
    }}
    style={props.theme.styles.navBar}
  />
  const _onBackPress = () => {
    _onBlack();
    return true;
  };
  const _onBlack = () => {
    NavigationUtil.goBack(props.navigation);
    return true;
  }
  useEffect(() => {
    backPress.componentDidMount();
    return () => {
      backPress.componentWillUnmount();
    }
  });
  const showSelectPop = () => {
    setModalVisible(true);
  }
  const _renderSelectItems = () => {
    return typeArr.length === 0 ? null : <View style={styles.optionView}>
      {
        typeArr.map((item: any, index: number) => {
          const isActive = type.value === item.value;
          return (
            <TouchableNativeFeedback
              key={item.value}
              onPress={() => setType(item)}>
              <View style={[styles.optionItem, index % 3 !== 0 ? styles.marginLeftDistance : null, isActive ? {backgroundColor: props.theme.themeColor} : null]}>
                <Text style={[isActive ? styles.activeOptionTxt : styles.optionTxt]}>
                  {item.label}
                </Text>
              </View>
              
            </TouchableNativeFeedback>
          )
        })
      }
    </View>
  }
  const onResetFilterPopupClick = () => {
    setType({ label: '全部', value: '0', key: 'all' });
    setModalVisible(false);
  };
  /***
   * 点击确定按钮
   */
  const onSubmitClick = () => {
    setModalVisible(false);
  };
  return (
    <SafeAreaVIewPlus style={styles.container} topColor={props.theme.themeColor}>
      {navigationBar}
      <View style={styles.ComponentsContainer}>
        {/* <Text>组件</Text> */}
        <Select onPress={showSelectPop} label={`钱包类型:${type.label}`} />
        <ModalPopup visible={modalVisible} titleView={<View style={styles.titleView} />}
          setVisible={setModalVisible}
        >
          <View style={styles.filterPopupContainer}>
            <ScrollView>
              {_renderSelectItems()}
            </ScrollView>
            <View style={styles.filterPopupBottom}>
              <View style={[{ flex: 1, marginRight: 7 }]}>
                <Button
                  block={true}
                  onPress={onResetFilterPopupClick}
                  title="重置"
                />
              </View>
              <View style={[{ flex: 1, marginLeft: 7 }]}>
                <Button block={true} onPress={onSubmitClick} title="确定" />
              </View>
            </View>
          </View>
        </ModalPopup>
      </View>
    </SafeAreaVIewPlus>
    
  )
}

const mapStateToCarouselPage = (state: any) => ({
  theme: state.theme.theme.themeColor
})

export default connect(mapStateToCarouselPage)(OurComponents)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  ComponentsContainer: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  filterPopupContainer: {
    height: '100%'
  },
  filterPopupBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  activeOptionTxt: {
    color: '#fff',
    fontWeight: '600'
  },
  optionView: {
    flexDirection: 'row', 
    flexWrap: 'wrap'
  },
  optionItem: {
    borderRadius: 6,
    width: (getDeviceWidth() - 40) / 3,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 1,
  },
  marginLeftDistance: {
    marginLeft: 10
  },
  optionTxt: {
    color: '#35363E',
    fontSize: 13,
    fontWeight: '600',
  },
  titleView: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 6,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
})
