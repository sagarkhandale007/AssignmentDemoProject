// import { CartProvider } from './context/CartContext.js';
import Navigation from './components/NavigationComponent.js';
import { createStore, combineReducers } from 'redux';
import { Provider, useDispatch } from 'react-redux';
import loginReducer from './loginState/store/reducers/UserSession.js'
import React, {useEffect,useState} from 'react';

import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

// import EncryptedStorage from 'react-native-encrypted-storage';
// import {PermissionsAndroid} from 'react-native';

import { firebase } from '@react-native-firebase/app';
// Add this line to initialize Firebase

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  DatePickerAndroid,
  ScrollView,

} from 'react-native';

function App() {

   //firebase.initializeApp();
   NotificationHandler();

   if (!firebase.apps.length) {
    // Initialize Firebase only if it hasn't been initialized before
    firebase.initializeApp({
      // Your Firebase config object
    });
  }

  // if (Platform.OS === 'android') {
  //   // Android-specific configurations
  //   PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  // } else if (Platform.OS === 'ios') {
  //   // iOS-specific configurations
  // }

let store;

  const rootReducer = combineReducers(
    {
      login: loginReducer,
    }
  );
  store = createStore(rootReducer);

    useEffect(() => {
    requestUserPermission();
  }, []);



async function requestUserPermission() {
  console.log('requestUserPermission::' , requestUserPermission);


  const authStatus = await messaging().requestPermission();
  console.log('authStatus::' , authStatus);


  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    checkToken();
    console.log('3::' , "3");

  } else {
    checkToken()
    console.log('4::' , "4");

  }
}

const checkToken = async () => {
  console.log('checkToken::' , checkToken);

// Get the device token
messaging()
  .getToken()
  .then(token => {
    console.log('FCM Token:', token);
    // EncryptedStorage.setItem("fcmToken", fcmToken);

  })
  .catch(error => {
    console.error('Error getting FCM token:', error);
  });

// Set up the background message handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  // <Image style={styles.image} source={require(url)} />

});

};


  return (

    <Provider store={store}>

    {/* <CartProvider>  */}

    <Navigation>
    </Navigation>

    {/* </CartProvider>  */}

  </Provider>

  );
}

function NotificationHandler() {
  useEffect(() => {
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('Foreground Message:', remoteMessage);
      const { title, body } = remoteMessage.notification;
      const { url } = remoteMessage.data;


      Alert.alert(
        title,
        body,


        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
          // console.warn('taskDataId:',{taskDataId}),
    
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
    
        ],
        { cancelable: false }
      );
    });

    return () => {
      unsubscribeOnMessage();
    };
  }, []);
}

export default App;
