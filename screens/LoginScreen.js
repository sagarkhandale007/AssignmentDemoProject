/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

import {StatusBar} from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import {useDispatch} from 'react-redux';
import * as loginAction from '../loginState/store/actions/UserSession.js';
import messaging from '@react-native-firebase/messaging';
import NetInfo from '@react-native-community/netinfo';

 import EncryptedStorage from 'react-native-encrypted-storage';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {getApiTaskData} from '../serviceData/TaskServiceData.js';

export default function LoginScreen({navigation}) {


  const [isConnected, setIsConnected] = useState(null);

  async function getLogin() {
    try {
      const response = await fetch(
        'https://task-authentication-fd480-default-rtdb.firebaseio.com/data.json',

        {
          method: 'GET',
        },
      );
      var flag = false;

      if (!response.ok) {
        const errorRes = await response.json();
        console.log('error' + response);
        throw new Error(errorRes.error.message);
      }
      const LoginAuthenticationData = await response.json();
      for (const key in LoginAuthenticationData) {
        if (
          email == LoginAuthenticationData[key].email &&
          password == LoginAuthenticationData[key].password
        ) {
          dispatch(loginAction.loginUser(true));
          const name = LoginAuthenticationData[key].name;
          const email = LoginAuthenticationData[key].email;
          const password = LoginAuthenticationData[key].password;
          dispatch(loginAction.loginUserName(name));

          await EncryptedStorage.setItem('login_session', JSON.stringify({ email, password, name}));
          // Get the device token
          messaging()
          .getToken()
          .then(token => {
            console.log('Login FCM Token:', token);
            UpdateToken(key,token);
          })
          .catch(error => {
            console.error('Error getting FCM token:', error);
          });

          navigation.navigate('TasksList');

          flag = true;
        } else {
          if ((flag = false)) {
            Alert.alert('Authentication', 'invalid email or password');
          }
        }
      }

      return LoginAuthenticationData;
    } catch (error) {
      throw new Error(error);
    }
  }

  async function UpdateToken(_key,token) {

    try {
      const response = await fetch(
        'https://task-authentication-fd480-default-rtdb.firebaseio.com/data/' + _key + '.json',

        {
          method: 'PATCH',

          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: token,
          }),
        },
      );

      if (!response.ok) {
        const errorRes = await response.json();
        console.log('error' + response);
        throw new Error(errorRes.error.message);
      } else {
        const ResetnewPassword = await response.json();
        console.log('Token add successful:', ResetnewPassword);
        return ResetnewPassword;

      }

    } catch (error) {
      throw new Error(error);
    }
  }


  async function getResetPaasword() {
    navigation.navigate('resetPasswordScreen');
  }

  async function getSingUp() {
    navigation.navigate('singUpScreen');
  }
//check validation for the username and password
  const handleValidation = async () => {
    // Reset error messages
    setEmailError('');
    setPasswordError('');

    // Validate empty fields
    if (!email) {
      setEmailError('Email is required');
    }

    if (!password) {
      setPasswordError('Password is required');
    }

    // If there are no errors, you can proceed with the form submission
    if (email && password) {
      // Your form submission logic here   
    console.log('Form submitted successfully');
    const  StateEmail = email;
    const  StatePassword = password;

      if (isConnected == true) {

        getLogin();

      }else{

 
        const session = await EncryptedStorage.getItem("login_session");
        const loginSession = JSON.parse(session);
        const { email, password, name } = loginSession;

        if (
          email == StateEmail &&
          password == StatePassword
        ) {

          dispatch(loginAction.loginUser(true));
          dispatch(loginAction.loginUserName(name));
          navigation.navigate('TasksList');

        }else{
          Alert.alert('Authentication', 'invalid email or password');
        }

      }
    }
  };

  useEffect(() => {
    
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);

    });

    // Cleanup the subscription when the component is unmounted
    return () => unsubscribe();
  },[]);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setNotificationToken] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/task.png')} />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email Id"
          placeholderTextColor="#ffffff"
          onChangeText={email => setEmail(email)}
        />
      </View>
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}


      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#ffffff"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}


      <View style={styles.forgot_button}>
        <TouchableOpacity onPress={() => getResetPaasword()}>
          <Text style={styles.text1} onPress={() => getResetPaasword()}>
            Reset Password ?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => getSingUp()}>
          <Text style={styles.text2} onPress={() => getSingUp()}>
            Register New User!
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleValidation}>
        <Text style={styles.loginText} onPress={handleValidation}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },

  forgot_button: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
  },
  text1: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'blue',
    height: 30,
    marginBottom: 30,
    marginRight: 20, 
  },
  text2: {
    fontSize: 12,
    color: 'green',
  },
  errorText: {
    color: 'red',
    marginBottom: 2,
    marginTop: 2,

  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: '#91a2cf',
    borderRadius: 5,
    width: '70%',
    height: 50,
    marginBottom: 32,
    alignItems: 'start',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    fontWeight: '400',
    color: '#ffffff',
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#244cb3',
  },

  loginText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
