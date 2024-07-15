/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable space-infix-ops */
/* eslint-disable prettier/prettier */
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
  DatePickerAndroid,
  ScrollView,

} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { getTasksData } from '../serviceData/TaskServiceData.js';
import { getApiTaskData } from '../serviceData/TaskServiceData.js';

export default function TaskSharingScreen({ navigation, route }) {
  const AddTaskIcon = require('../assets/notification.png');

  let userNameData;

    const {productId} = route.params;
    const {userdata} = route.params;
    userNameData = userdata;
    const [tasks, setTaskList] = useState({});

  async function showData() {
    const data = await getTasksData(productId);
    setTaskList(data);
    setTaskId(data.taskId);
  
  }

  async function getUserData() {
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
      const UserData = await response.json();
        // Check if jsonData is an array before setting the state
        const usersArray = Object.values(UserData);

        if (Array.isArray(usersArray)) {
          setApiData(usersArray);
        } else {
          console.error('Data received is not an array:', usersArray);
        }

      return UserData;
    } catch (error) {
      throw new Error(error);
    }

  }

  useEffect(() => {
    showData();
    getUserData();
  }, []);


  async function getAllTask() {
    try {
      const response = await fetch(
        'https://task-mangement-13551-default-rtdb.firebaseio.com/data.json',

        {
          method: 'GET',
        },
      );

      if (!response.ok) {
        const errorRes = await response.json();
        console.log('error' + response);

        throw new Error(errorRes.error.message);
      }
      const AllTaskData = await response.json();
      for (const key in AllTaskData) {
        if (
          taskId == AllTaskData[key].taskId
        ) {
          getUpdateTask(key);
        } else {

        }
      }
      return AllTaskData;
    } catch (error) {
      throw new Error(error);
    }
  }



  async function getUpdateTask(_key) {

    try {

      const response = await fetch('https://task-mangement-13551-default-rtdb.firebaseio.com/data/'+ _key + '.json',

        {
          method: 'PATCH',

          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
           
            taskShareTo: taskShareTo,
            taskShareFrom: taskShareFrom,

          }),

        });

      if (!response.ok) {

        const errorRes = await response.json();
        console.log('error' + response);

        throw new Error(errorRes.error.message);

      } else {
        const TaskDataResponse = await response.json();
        console.log('Share-Task successful:', TaskDataResponse);
        Alert.alert('Share Task', 'Sharing Task successful');
        navigation.navigate('TasksList');
        SendNotification();
        return TaskDataResponse;

      }

    } catch (error) {

      throw new Error(error);

    }

  }

  async function SendNotification() {
    
    try {

        const response = await fetch('https://fcm.googleapis.com/fcm/send',

            {
                method: 'POST',

              headers: {
                  "Content-Type": "application/json","Authorization": "key=AAAA5tInKNI:APA91bEhp4GF_ojAgdTV2cqB-cXL24af9dfX85L4Flw5W5TjljI8p3I4r12tx8Fk2JQ0adDZUA-H9IbF8B1tM1cDA90CmXE7RlSlR9AQRR94P3_XQUBV7bFZsJH9GvhZYTsMpqvmAyQ-",
              },
              body: JSON.stringify({

                "to": token, 
                "notification": { "android": {"imageUrl": "https://cdn-icons-png.flaticon.com/128/1182/1182718.png"}, "body": "Task is shared to you please check it..","title": "Task Shared..","mutable_content": true,"sound": "Tri-tone"},
                "data": {"url": "https://cdn-icons-png.flaticon.com/128/1182/1182718.png","dl": "<deeplink action on tap of notification>"}
              }),
                
            });
            

        if (!response.ok) {

            const errorRes = await response.json();
            console.log("error"+response);
            throw new Error(errorRes.error.message);

        }else{
          const signUpResponse = await response.json();
          console.log('Sign-up successful:', signUpResponse);
          return signUpResponse;

        }
      
        } catch (error) {
        throw new Error(error);

    }

};


  //check validation for the username and password
  const handleValidation = () => {
    // Reset error messages
    setTaskShareToError('');
   
    // Validate empty fields

    if (!taskShareTo || taskShareTo === 'Select an User') {
      setTaskShareToError('User is required');
    }

    // If there are no errors, you can proceed with the form submission
    if (taskShareTo) {
      // Your form submission logic here
      getAllTask();
      console.log('Form submitted successfully');
    }
  };


  


  const [taskId, setTaskId] = useState('');
  const [token, setToken] = useState('');

  const [taskShareTo, setSelectedTaskShareToValue] = useState('');
  const [taskShareFrom, setSelectedTaskShareFromValue] = useState(userNameData);
  const [users, setApiData] = useState([]);
  const [taskShareToError, setTaskShareToError] = useState('');





  const handleTaskShareToValueChange = (itemValue) => {

    setSelectedTaskShareToValue(itemValue);
    const userWithId3 = users.find(user => user.name === itemValue);

    if (userWithId3) {
      const tokenOfUserWithId3 = userWithId3.token;
      setToken(tokenOfUserWithId3);
    } else {
      console.log('User not found');
    }


  };


  return (

    <ScrollView contentContainerStyle={styles.scrollContainer}>

    <View style={styles.container}>

      <StatusBar style="auto" />

        <View style={styles.inputView}>
        <Picker
          style={styles.TextInput}
          selectedValue={taskShareTo}
          onValueChange={handleTaskShareToValueChange} >
          <Picker.Item label="Select an User" value="" />

          {Array.isArray(users) && users.map((user, index) => (
          <Picker.Item key={index} label={user.name} value={user.name} />
          ))}
        </Picker>
        {taskShareToError? <Text style={styles.errorText}>{taskShareToError}</Text> : null}

      </View>


      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Task Id"
          placeholderTextColor="#ffffff"
          value={taskId}
          editable={false}
          onChangeText={(val) => { setTaskId(val); }}
        />
      </View>




      <TouchableOpacity style={styles.loginBtn} onPress={handleValidation}>
        <Text style={styles.loginText} onPress={handleValidation}>Submit</Text>
      </TouchableOpacity>

    </View>
    </ScrollView>

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

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
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


