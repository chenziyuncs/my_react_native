import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../renducer';
import { persistStore, persistReducer } from 'redux-persist'
// 导入需要配置的数据源，可以选择 storage, cookie, session等等
import AsyncStorage from "@react-native-async-storage/async-storage"


// 定义配置的信息
const presitConfig = {
    key: 'root',
    storage: AsyncStorage
}
/**
 * 自定义log中间件
 * 关于中间件的更多解释可参考：https://cn.redux.js.org/docs/advanced/Middleware.html
 * @param store
 */
//这里用到了JS的函数柯里化，logger = store => next => action => 是函数柯里化的ES6写法
const logger = (store: any) => (next: (arg0: any) => any) => (action: any) => {
    if (typeof action === 'function') {
        console.log('dispatching a function');
    } else {
        // console.log('dispatching ', action);
    }
    const result = next(action);
    // console.log('nextState ', store.getState());
    return result;
};
// 创建持久化的配置presist的信息
const presist_reducers = persistReducer(presitConfig, reducers);
//设置中间件
const middlewares = [logger, thunk];
// 创建存储对象并且抛出对象
const store = createStore(presist_reducers, applyMiddleware(...middlewares))
export const persistor = persistStore(store)
// 获取持久化存储信息
AsyncStorage.getItem('persist:root').then((data:any)=>{
// console.log('获取持久化存储信息=',data);
})
/**
 * 创建store
 */
// export default createStore(presist_reducers, applyMiddleware(...middlewares));
export default store