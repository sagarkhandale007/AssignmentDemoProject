/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
//import App from './App'
import {name as appName} from './app.json';
// import messaging from '@react-native-firebase/messaging';

// import { firebase } from '@react-native-firebase/app';

// firebase.initializeApp();

// // Set up the background message handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);
//   });

  

AppRegistry.registerComponent(appName, () => App);
