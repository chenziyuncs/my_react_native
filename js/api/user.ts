import request from '../util/Request'
// import axios from 'react-native-axios';
/**
 * 登录
 * @params Login
 * username: 用户名
 * password: 密码
 * deviceId: 设备ID
 * deviceType: 登录设备类型
 * */
 export function loginUser(username: string, password: string) {
  return request({
    url: '/user/login',
    method: 'POST',
    data: {
      username,
      password
      // deviceId,
      // deviceType
    }
  })
}

/**
 * 退出登录
 * @params logout 无参数
 * */
 export function logout() {
  return request({
    url: '/user/logout',
    method: 'POST',
    // canceltoken: new axios.canceltoken(function executor(c: any) { // 设置取消请求 cancel token
    //   that.source = c;
    // })
  })
}

export function loginBoarding(formData: any) {
  return request({
    url: 'user/login',
    method: 'POST',
    data: formData,
    headers: {
      'Content-type': 'multipart/form-data'
    }
  })
}

export function getTestData(requestPrams: any) {
  return request({
    url: 'test/test',
    method: 'POST',
    params: {
      requestPrams
    }
  })
}