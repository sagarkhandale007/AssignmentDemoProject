/* eslint-disable prettier/prettier */
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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
  ScrollView,
} from "react-native";
import { getApiTaskData } from '../serviceData/TaskServiceData.js';

export default function SingUpScreen({navigation}) {

 

   async function getSingUp() {
    

    try {

        const response = await fetch('https://task-authentication-fd480-default-rtdb.firebaseio.com/data.json',

            {
                method: 'POST',

                headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  name,
                  mobileNo,
                  email,
                  password,
                  token,
              }),
                
            });

            

        if (!response.ok) {

            const errorRes = await response.json();
            console.log("error"+response);
            throw new Error(errorRes.error.message);

        }else{
          const signUpResponse = await response.json();
          console.log('Sign-up successful:', signUpResponse);
          Alert.alert('Sign-up', 'Sign-up successful');
          navigation.navigate('LoginScreen');
          return signUpResponse;

        }
      

          } catch (error) {

        throw new Error(error);

    }

};



//check validation for the username and password
const handleValidation = () => {
  // Reset error messages
  setNameError('');
  setMobileNoError('');
  setEmailError('');
  setPasswordError('');

  // Validate empty fields

  if (!name) {
    setNameError('Name is required');
  }

  if (!mobileNo) {
    setMobileNoError('Mobile No is required');
  }

  if (!email) {
    setEmailError('Email is required');
  }

  if (!password) {
    setPasswordError('Password is required');
  }

// If there are no errors, you can proceed with the form submission
if (name && mobileNo && email && password) {
  // Your form submission logic here
  getSingUp();
  console.log('Form submitted successfully');
} else {
  // Handle the case when there are errors (optional)
  console.log('Form validation failed');
}


};


  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('No Token');


  

  
  const [nameError, setNameError] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
 

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>

    <View style={styles.container}>
 
      <StatusBar style="auto" />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Name"
          placeholderTextColor="#ffffff"
           onChangeText={(name) => setName(name)}
        />
      </View>

      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Mobile No"
          placeholderTextColor="#ffffff"
          keyboardType="numeric"
           onChangeText={(mobileNo) => setMobileNo(mobileNo)}
        />
      </View>

      {mobileNoError ? <Text style={styles.errorText}>{mobileNoError}</Text> : null}


      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email Id"
          placeholderTextColor="#ffffff"
           onChangeText={(email) => setEmail(email)}
        />
      </View>
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#ffffff"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableOpacity style={styles.loginBtn} onPress={handleValidation}>
        <Text style={styles.loginText} onPress={handleValidation}>Submit</Text>
      </TouchableOpacity>

  
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


