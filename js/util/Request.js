import Axios from 'react-native-axios';
import NavigationUtil from '../navigator/NavigationUtil'
import store from '../store'
const request = Axios.create({
  // baseURL: 'http://localhost:3000',
  // baseURL: 'http://192.168.110.5:3000',
  baseURL: 'https://api.devio.org/uapi/',
  timeout: 40000,
  headers: {
    // 'Content-Type': 'application/json;charset=utf-8',
    'Content-Type': 'application/json',
    'course-flag': 'rn',
    'auth-token': 'fd82d1e882462e23b8e88aa82198f166'
  }
})

request.interceptors.request.use(config => {
  // config.headers.Authorization = store.getState().user.token
  // config.headers.language = store.getState().common.lang && store.getState().common.lang.split('-')[0]
  config.headers['boarding-pass'] = store.getState().user.boarding || ''
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// respone拦截器
request.interceptors.response.use(response => {
    const res = response.data
    if (res.result) {
      if(res.errcode !== 5 || res.msg !== '缺少参数 [SESSION_TOKEN]') {
        // Message({
        //   message: '错误码:' + res.errcode + '，' + res.msg,
        //   type: 'error',
        //   duration: 3 * 1000
        // })
        console.log('错误')
      }

      // result:3 errcode:3000 token失效;
      if (res.errcode === 3000 || res.msg === '缺少参数 [SESSION_TOKEN]') {
        //此处编写token失效 后续处理代码
        NavigationUtil.login();
      }
      return Promise.reject(res)
    } else {
      if (res.hasOwnProperty('result'))
        return res.data
      else
        return res
    }
  },
  error => {
    console.log(error)// for debug
    if (error.message) {
      console.log(error.message)
    }

    if (error.hasOwnProperty('message'))
      return Promise.reject({result:error.request.status, errcode:error.request.readyState, msg:error.message})
    else
      return Promise.reject(error)
  }
)

export default request