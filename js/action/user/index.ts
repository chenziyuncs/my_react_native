import Types from '../types'
import { loginUser, logout, loginBoarding } from '../../api/user'
export const setToeken = (token: string) => ({ type: Types.SET_TOKEN, token})
export const setBoarding = (boarding: string) => ({ type: Types.KEY_BOADRDING_PASS, boarding})
// 登录操作，获取token，以及用户信息
export function loginDispatch(username: any, password: any) {
  return (dispatch: any) => new Promise((resolve, reject) => {
    loginUser(username, password).then((res: any) => {
      if (res.code === 200) {
        dispatch(setToeken(res.data.token))
        return resolve(res)
      }
      return reject(new Error(res.data))
    }).catch((err: any) => {
      reject(err)
    })
  })
}

export function logoutDispatch() {
  return (dispatch: any) => new Promise((resolve, reject) => {
    logout().then((res: any) => {
      if (res.code === 200) {
        resolve(res)
      }
      reject(res)
    }).catch((error:any) => {
      reject(error)
    })
    
  })
}

export function logoutMethods () {
  return (dispatch: any) => new Promise((resolve, reject) => {
    dispatch(setBoarding(''))
    resolve('退出成功')
  }).catch(() => {})
}

export function saveBoardingNew (userName: string, password: string) {
  return (dispatch: any) => new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('password', password);
    return loginBoarding(formData).then((res: any) => {
      const { code, data, msg } = res;
      if (code === 0) {
        dispatch(setBoarding(data))
        resolve(res);
      } else {
        resolve(res);
      }
    }).catch((e: any) => {
      reject(e);
    })
  }) 
}