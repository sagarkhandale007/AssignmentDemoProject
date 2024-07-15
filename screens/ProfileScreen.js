/* eslint-disable prettier/prettier */
import { StatusBar } from "expo-status-bar";
import {useDispatch} from 'react-redux';
import * as loginAction from '../loginState/store/actions/UserSession.js';

import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { getApiTaskData } from '../serviceData/TaskServiceData.js';
import { useSelector } from 'react-redux';


export default function ProfileScreen({navigation}) {

    const {name} = useSelector(state => state.login);

    async function getgetUserDetails() {
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
    
                name == LoginAuthenticationData[key].name
    
              ) {

                const name = LoginAuthenticationData[key].name;
                const email = LoginAuthenticationData[key].email;
                const mobileNo = LoginAuthenticationData[key].mobileNo;
                setName(name);
                setEmail(email);
                setMobileNo(mobileNo);
              } else {
                //Alert.alert('Authentication', 'invalid Email Id');
              }
            }
          return LoginAuthenticationData;
        } catch (error) {
          throw new Error(error);
        }
      }
 
      useEffect(() => {

        getgetUserDetails();

      },[]);

      const [username, setName] = useState('');
      const [mobileNo, setMobileNo] = useState('');
      const [email, setEmail] = useState('');
    

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>

    <View style={styles.container}>
 
      <StatusBar style="auto" />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Name"
          placeholderTextColor="#ffffff"
          value={username}
          editable={false} 
           onChangeText={(username) => setName(username)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Mobile No"
          placeholderTextColor="#ffffff"
          keyboardType="numeric"
          editable={false} 
          value={mobileNo ? mobileNo.toString() : ''} 
           onChangeText={(val) => setMobileNo(val)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email Id"
          placeholderTextColor="#ffffff"
          value={email}
          editable={false} 
           onChangeText={(email) => setEmail(email)}
        />
      </View>

    </View>
    </ScrollView>

  );}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: 'red',
    marginBottom: 2,
    marginTop: 2,

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
    backgroundColor: "#91a2cf",
    borderRadius: 5,
    width: "70%",
    height: 50,
    marginBottom: 32,
    alignItems: "start",
  },
 
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
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
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#244cb3",
  },

  loginText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});


