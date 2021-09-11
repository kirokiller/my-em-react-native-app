/* app 入口 */

import { AppRegistry, Platform } from 'em-react-native';
import App from './src/App';
import { name as appName } from './app.json';

if (Platform.OS === 'web') {
  let { _Page_, _Params_ } = window._SDK_Entry_;
  AppRegistry.registerComponent(appName, () => App);
  AppRegistry.runApplication(appName, {
    rootTag: document.getElementById('root')
  });
} else {
  console.disableYellowBox = true;
  AppRegistry.registerComponent("EMApp", () => App);
}