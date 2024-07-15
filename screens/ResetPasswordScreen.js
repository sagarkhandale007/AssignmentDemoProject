/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import * as loginAction from '../loginState/store/actions/UserSession.js';

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

export default function ResetPasswordScreen({navigation}) {


  async function getResetPassword() {
    try {
      const response = await fetch(
        'https://task-authentication-fd480-default-rtdb.firebaseio.com/data.json',

        {
          method: 'GET',
        },
        );


        if (!response.ok) {
          const errorRes = await response.json();
          console.log('error' + response);
          throw new Error(errorRes.error.message);
        }
        const LoginAuthenticationData = await response.json();
        for (const key in LoginAuthenticationData) {
          if (

            email == LoginAuthenticationData[key].email

          ) {
            getChangePassword(key);
          } else {
          }
        }

      


      return LoginAuthenticationData;
    } catch (error) {
      throw new Error(error);
    }
  }
  async function getChangePassword(_key) {
    try {
      const response = await fetch(
        'https://task-authentication-fd480-default-rtdb.firebaseio.com/data/' + _key + '.json',

        {
          method: 'PATCH',

          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: newPassword,
          }),
        },
      );

      if (!response.ok) {
        const errorRes = await response.json();
        console.log('error' + response);
        throw new Error(errorRes.error.message);
      } else {
        const ResetnewPassword = await response.json();
        console.log('Reset-newPassword successful:', ResetnewPassword);
        Alert.alert('Reset Password', 'Password Reset successful');
        navigation.navigate('LoginScreen');

        return ResetnewPassword;

      }

    } catch (error) {
      throw new Error(error);
    }
  }

  //check validation for the username and password
  const handleValidation = () => {
    // Reset error messages
    setEmailError('');
    setPasswordError('');

    // Validate empty fields
    if (!email) {
      setEmailError('Email is required');
    }

    if (!newPassword) {
      setPasswordError('Password is required');
    }

    // If there are no errors, you can proceed with the form submission
    if (email && newPassword) {
      // Your form submission logic here
      getResetPassword();
      console.log('Form submitted successfully');
    }else{
      console.log('field is required');

    }
  };


  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');



  return (
    <View style={styles.container}>

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
          placeholder="New Password"
          placeholderTextColor="#ffffff"
          secureTextEntry={true}
          onChangeText={newPassword => setNewPassword(newPassword)}
        />

      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      


      <TouchableOpacity  style={styles.loginBtn}  onPress={handleValidation}>
        <Text style={styles.loginText} onPress={handleValidation}>Submit</Text>
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
  errorText: {
    color: 'red',
    marginBottom: 2,
    marginTop: 2,

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
