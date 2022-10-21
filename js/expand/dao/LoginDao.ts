import { saveBoarding } from "../../util/boardingUtil";
import Constants from "./Constants";
import { post } from "./HiNet";
 /**
  * 登录模块相关网络服务
  */
export default class LoginDao {
  //私有静态变量
  private static instance:LoginDao;
  //构造方法
  private constructor() {}
  //单例效果
  public static getInstance():LoginDao {
    if (!LoginDao.instance) {
      LoginDao.instance = new LoginDao();
    }
    return LoginDao.instance;
  }
  //登录方法
  login(userName:string, password:string):Promise<any> {
    return new Promise((resolve, reject) => {
      const { login: { api } } = Constants;
      const formData = new FormData();
      formData.append('userName', userName);
      formData.append('password', password);
      post(api)(formData)().then((res: any) => {
        const { code, data, msg } = res;
        if (code === 0) {
          saveBoarding(data);
          resolve(data || msg);
        } else {
          reject(res);
        }
      }).catch((e) => {
        console.log(e);
        reject({ code: -1, msg: '哎呀，出错了' });
      })
    })
  }
  register(userName: string, password:string, imoocId: string, orderId: string):Promise<any> {
    return new Promise((resolve, reject) => {
      const {registration: { api }} = Constants;
      const formData = new FormData();
      formData.append('userName', userName)
      formData.append('password', password)
      formData.append('imoocId', imoocId)
      formData.append('orderId', orderId)
      post(api)(formData)().then((res: any) => {
        const { code, msg, data } = res;
        if (code === 0) {
          resolve(data || msg)
        } else {
          reject(res);
        }
      }).catch(e => {
        console.log(e);
        reject({code: -1, msg: '哎呀，出错了'})
      })
    })
  }
}
