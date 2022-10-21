/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import App from './js/App';
import {name as appName} from './app.json';
// import AppNavigators from './js/navigator/AppNaviatos'

AppRegistry.registerComponent(appName, () => App);
