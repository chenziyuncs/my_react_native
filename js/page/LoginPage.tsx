import React, { useState } from 'react';
import { Input, ConfirmButton, Tips, NavBar } from '../common/LoginComponent'

import {
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil'
import { connect } from 'react-redux'
import actions from '../action'

function loginPage (props: any):any {
  const { navigation } = props;
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('Lukas');
  const [helpUrl, setHelpUrl] = useState('https://www.baidu.com');
  const onLogin = () => {
    if (userName === '' || password === '') {
      setMsg('用户名或者密码不能为空')
      return;
    }
    const { saveBoardingNew } = props;
    saveBoardingNew(userName, password).then((res: any) => {
      if (res.code === 0) {
        NavigationUtil.resetToHomePage({navigation});
      }
    })
    // LoginDao.getInstance().login(userName, password).then((res) => {
    //   setMsg('登录成功');
    //   NavigationUtil.resetToHomePage({navigation});
    // }).catch((e) => {
    //   setHelpUrl('');
    //   setMsg('');
    //   const {code, msg, data: { helpUrl = '' } = {}} = e;
    //   setMsg(msg);
    //   setHelpUrl(helpUrl);
    // })
    // const { loginDispatch } = props;
    // const username = userName
    // loginDispatch(username, password).then((res: any) => {
    //   if (res.code === 200) {
    //     NavigationUtil.resetToHomePage({navigation});
    //   }
    // })
  }
  return (
    <SafeAreaView style={styles.root}>
      <NavBar tcStyle={props.theme.styles.selectedTitleStyle} title={'登录'} rightTitle={'注册'} onRightClick={() => {
        NavigationUtil.registration({navigation})
      }} />
      <View style={styles.line}></View>
      <View style={styles.content}>
        <Input
          label={'用户名'}
          placeholder={'请输入用户名'}
          shortLine={true}
          onChangeText={(text: string) => setUserName(text)}
        />
        <Input
          label={'密码'}
          placeholder={'请输入密码'}
          secure={true}
          onChangeText={(text: string) => setPassword(text)}
        />
        <ConfirmButton bgStyle={props.theme.styles.navBar} title={'登录'} onClick={onLogin}/>
        <Tips bgStyle={props.theme.styles.navBar} msg={msg} helpUrl={helpUrl} />
        {/* <ConfirmButton title={'查询token'} onClick={checkToken}/> */}
      </View>
    </SafeAreaView>
  )
};

const mapStateToLoginPage = (state: any) => ({
  token: state.user.token,
  theme: state.theme.theme.themeColor
})
const mapDispatchToLoginPage = (dispatch: any) => ({
  loginDispatch: (username: any, password: any) => dispatch(actions.loginDispatch(username, password)),
  saveBoardingNew: (userName: any, password: any) => dispatch(actions.saveBoardingNew(userName, password))
})
export default connect(mapStateToLoginPage, mapDispatchToLoginPage)(loginPage)
const styles = StyleSheet.create({
  line: {
    height: 0.5,
    backgroundColor: '#D0D4D4',
  },
  root: {
    flex: 1
  },
  content: {
    padding: 20,
    backgroundColor: '#F1F5F6',
    flexGrow: 1
  }
});
