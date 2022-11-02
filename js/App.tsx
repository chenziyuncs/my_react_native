import React, { useEffect } from 'react';
import {
  View,
  Text
} from 'react-native';
import { Provider } from 'react-redux';
import AppNavigator from './navigator/AppNaviatos';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/lib/integration/react'
import PopUp from './common/PopUp'
import PopUpsService from './util/PopUpservice'
import CodePush from 'react-native-code-push'
import {
  Alert
} from 'react-native'
import UpdatePops from './common/UpdatePops/UpdatePops';
let codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL }
const App = () => {
  const App = AppNavigator();
  useEffect(() => {
    // CodePush.checkForUpdate().then(update => {
    //   console.log(update, 111)
    //   // if (update) {
        
    //   // }
    //   Alert.alert(
    //     '检测到应用有新的更新',
    //     '是否立即更新您的应用并重启',
    //     [
    //       {
    //         text: '取消', onPress: () => {
    //         }
    //       },
    //       {
    //         text: '确定',
    //         onPress: () => {
    //           console.log('点击了更新当前版本按钮')
    //         }
    //       }
    //     ]
    //   )
    // })
  })
  /**
   * 将store传递给App框架
   */
  return <Provider store={store}>
      <PersistGate
        loading={(
          <View style={{
            flex: 1,
            width: '100%',
            backgroundColor: '#232226',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              color: '#eee'
            }}>
              Loading Data
            </Text>
          </View>
        )}
        // onBeforeLift={this.onBeforeLift}
        persistor={persistor}
        >
          {App}
          <PopUp ref={(PopRef: any) => PopUpsService.setTopLevelPop(PopRef)}></PopUp>
          <UpdatePops />
      </PersistGate>
    
  </Provider>;
};
export default CodePush(codePushOptions)(App);
