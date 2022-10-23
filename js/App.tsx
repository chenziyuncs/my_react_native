import React from 'react';
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
          <PopUp ref={(PopRef: any) => PopUpsService.setTopLevelPop(PopRef)}></PopUp>
        
      </PersistGate>
    
  </Provider>;
};
export default App;
