import React, { useState } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import { Input, ConfirmButton, Tips, NavBar } from '../common/RegistrationComponent';
import LoginDao from '../expand/dao/LoginDao';
import NavigationUtil from '../navigator/NavigationUtil'
export default (props: any) => {
  const { navigation } = props;
  const [registerName, setRegisterName] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [classID, setClassID] = useState('');
  const [order, setOrder] = useState('');
  const [tipsMsg, setTipsMsg] = useState('');
  const onRegisterClick = () => {
    if (registerName === '' || registerPassword === '' || classID === '' || order === '') {
      setTipsMsg('选项不能为空');
      return;
    }
    setTipsMsg('');
    LoginDao.getInstance()
      .register(registerName, registerPassword, classID, order)
      .then(res => {
        setTipsMsg('注册成功!');
      }).catch(e => {
        console.log(e);
        const {msg} = e;
        setTipsMsg(msg);

      })
  }
  return (
    <SafeAreaView style={styles.root}>
      <NavBar title={'注册'} rightTitle={'登录'} onRightClick={() => {
        NavigationUtil.login({navigation});
      }} />
      <View style={styles.content}>
        <Input
          label={'用户名'}
          placeholder={'请输入用户名'}
          shortLine={true}
          onChangeText={(text: string) => setRegisterName(text)}
          />
        <Input
          label={'密码'}
          placeholder={'请输入密码'}
          secure={true}
          shortLine={true}
          onChangeText={(text: string) => setRegisterPassword(text)}
          />
          <Input
          label={'慕课网ID'}
          placeholder={'请输入你的慕课网ID'}
          shortLine={true}
          onChangeText={(text: string) => setClassID(text)}
          />
          <Input
          label={'课程订单号'}
          placeholder={'请输入你的课程订单号后四位'}
          shortLine={true}
          onChangeText={(text: string) => setOrder(text)}
          />
          <ConfirmButton title={'注册'} onClick={onRegisterClick} />
          <Tips title={tipsMsg} />
      </View>
      
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
      flex: 1
  },
  content: {
    padding: 20,
    backgroundColor: '#F1F5F6',
    flexGrow: 1
  }
});