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
import Loading from './common/Loading'
import UpdatePops from './common/UpdatePops/UpdatePops';
import LoadingService from './util/LoadingService'
let codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL }
const App = () => {
  const App = AppNavigator();
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
          <Loading ref={(LoadingRef: any) => LoadingService.setTopLevelLoading(LoadingRef) } />
          <PopUp ref={(PopRef: any) => PopUpsService.setTopLevelPop(PopRef)}></PopUp>
          <UpdatePops />
      </PersistGate>
    
  </Provider>;
};
export default CodePush(codePushOptions)(App);
