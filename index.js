/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TestScreen from './Src/Screen/TestScreen';
import Login from './Src/Screen/Login';

AppRegistry.registerComponent(appName, () => Login);
