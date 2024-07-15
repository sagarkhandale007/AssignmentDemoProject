/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as loginAction from '../loginState/store/actions/UserSession.js';

import moment from 'moment';
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

import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import { getApiTaskData } from '../serviceData/TaskServiceData.js';


export default function AddTaskScreen({navigation}) {

  const {name} = useSelector(state => state.login);
  async function getAddTask() {

    try {

        const response = await fetch('https://task-mangement-13551-default-rtdb.firebaseio.com/data.json',

            {
                method: 'POST',

                headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                taskTitle,
                taskDescription,
                taskId,
                category,
                priority,
                status,
                date,
                addTask,
                taskShareFrom,
                taskShareTo,

              }),

            });

        if (!response.ok) {

            const errorRes = await response.json();
            console.log('error' + response);
            throw new Error(errorRes.error.message);

        } else {
          const TaskDataResponse = await response.json();
          console.log('Add-Task successful:', TaskDataResponse);
          Alert.alert('Add Task', 'Add Task in List successful');
          navigation.navigate('TasksList');
          getUserData();
          return TaskDataResponse;

        }
        } catch (error) {
        throw new Error(error);
    }

}

async function getUserData() {
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
    const UserData = await response.json();

// Check if UserData is an object before extracting tokens
if (typeof UserData === 'object' && UserData !== null) {
  const tokens = [];
  // Traverse the object and collect tokens
  const extractTokens = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        // Check if the value is an object or an array
        if (typeof value === 'object' && value !== null) {
          extractTokens(value); // Recursively traverse nested objects or arrays
        } else if (key === 'token' && typeof value === 'string') {
          tokens.push(value); // Add token to the array
        }
      }
    }
  };

  extractTokens(UserData);
  // Check if tokens array is not empty before setting the state
  if (tokens.length > 0) {
    setApiData(tokens);
    SendNotification(tokens);
  } else {
    console.error('No tokens found in UserData:', UserData);
  }
  } else {
    console.error('UserData is not an object:', UserData);
  }
    console.error('userToken:', tokens);
    return UserData;
  } catch (error) {
    throw new Error(error);
  }
}


async function SendNotification(tokens) {
    
  try {

      const response = await fetch('https://fcm.googleapis.com/fcm/send',

          {
              method: 'POST',

              headers: {
                "Content-Type": "application/json","Authorization": "key=AAAA5tInKNI:APA91bEhp4GF_ojAgdTV2cqB-cXL24af9dfX85L4Flw5W5TjljI8p3I4r12tx8Fk2JQ0adDZUA-H9IbF8B1tM1cDA90CmXE7RlSlR9AQRR94P3_XQUBV7bFZsJH9GvhZYTsMpqvmAyQ-",

            },
            body: JSON.stringify({

              "registration_ids": tokens,
              "notification": { "android": {"imageUrl": "https://cdn-icons-png.flaticon.com/128/1182/1182718.png"}, "body": " New Task is Coming, please check it..\n Task deadline : "+  moment(date).format('L'),"title": "Task Coming.."},
              "data": {"url": "https://cdn-icons-png.flaticon.com/128/1182/1182718.png","dl": "<deeplink action on tap of notification>"}
            }),
              
          });
          
      if (!response.ok) {
          const errorRes = await response.json();
          console.log("error"+response);
          throw new Error(errorRes.error.message);
      }else{
          const notificationResponse = await response.json();
          console.log('Send-notification successful:', notificationResponse);
          return notificationResponse;
      }
      } catch (error) {
      throw new Error(error);

  }

};

//check validation for the username and password
const handleValidation = () => {
  // Reset error messages
  setTaskTitleError('');
  setTaskDescriptionError('');
  setTaskIdError('');
  setCategoryError('');
  setPriorityError('');
  setStatusError('');

  // Validate empty fields

  if (!taskTitle) {
    setTaskTitleError('Task Title is required');
  }

  if (!taskDescription) {
    setTaskDescriptionError('Task Description is required');
  }

  if (!taskId) {
    setTaskIdError('Task Id is required');
  }

  if (!category || category === 'Select an category') {
    setCategoryError('Category is required');
  }

  if (!priority || priority === 'Select an priority') {
    setPriorityError('Priority is required');
  }

  if (!status || status === 'Select an Status') {
    setStatusError('Status is required');
  }

  // If there are no errors, you can proceed with the form submission
  if (taskTitle && taskDescription && taskId && category && priority && status) {
    // Your form submission logic here
    getAddTask();
    console.log('Form submitted successfully');
  } else {
    console.log('field is required');
  }
};

const [isConnected, setIsConnected] = useState(null);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskId, setTaskId] = useState('');
  const [category, setSelectedCategoryValue] = useState('');
  const [priority, setSelectedPriorityValue] = useState('');
  const [status, setSelectedStatusValue] = useState('');
  const [users, setApiData] = useState();


  const [addTask, setAddTask] = useState(name);
  const [taskShareFrom, setTaskShareFrom] = useState('No Share');
  const [taskShareTo, setTaskShareTo] = useState('No Share');


  const [selectedDate, setSelectedDate] = useState(new Date());


  const [taskTitleError, setTaskTitleError] = useState('');
  const [taskDescriptionError, setTaskDescriptionError] = useState('');
  const [taskIdError, setTaskIdError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [priorityError, setPriorityError] = useState('');
  const [statusError, setStatusError] = useState('');

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);


  const handleCategoryValueChange = (itemValue) => {
    setSelectedCategoryValue(itemValue);
  };
  const handlePriorityValueChange = (itemValue) => {
    setSelectedPriorityValue(itemValue);
  };

  const handleStatusValueChange = (itemValue) => {
    setSelectedStatusValue(itemValue);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>

    <View style={styles.container}>

      <StatusBar style="auto" />

    
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Task Title"
          placeholderTextColor="#ffffff"
           onChangeText={(taskTitle) => setTaskTitle(taskTitle)}
        />
      </View>
      {taskTitleError ? <Text style={styles.errorText}>{taskTitleError}</Text> : null}


      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Task Description"
          placeholderTextColor="#ffffff"
           onChangeText={(taskDescription) => setTaskDescription(taskDescription)}
        />
      </View>
      {taskDescriptionError ? <Text style={styles.errorText}>{taskDescriptionError}</Text> : null}


      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Task Id"
          placeholderTextColor="#ffffff"
          onChangeText={(taskId) => setTaskId(taskId)}
        />
      </View>
      {taskIdError ? <Text style={styles.errorText}>{taskIdError}</Text> : null}

      <View style={styles.inputView}>

      <Text style={styles.TextInput} title="End Date" onPress={() => setOpen(true)} >

          { moment(date).format('L')}

      </Text>

      <DatePicker
        modal
        open={open}
        date={date}
        mode ="date"
        minimumDate ={new Date()}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
          console.warn('date', moment(date).format('L'));
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
      <View style={styles.inputView}>
      <Picker
        style={styles.TextInput}
        selectedValue={category}
        onValueChange={handleCategoryValueChange}
      >
        <Picker.Item label="Select an category" value="" />
        <Picker.Item label="Option 1" value="option1" />
        <Picker.Item label="Option 2" value="option2" />
        <Picker.Item label="Option 3" value="option3" />
      </Picker>
    </View>
    {categoryError ? <Text style={styles.errorText}>{categoryError}</Text> : null}


    <View style={styles.inputView}>
      <Picker
        style={styles.TextInput}
        selectedValue={priority}
        onValueChange={handlePriorityValueChange}
      >
        <Picker.Item label="Select an priority" value="" />
        <Picker.Item label="High" value="High" />
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="Low" value="Low" />
      </Picker>
    </View>
    {priorityError ? <Text style={styles.errorText}>{priorityError}</Text> : null}

    <View style={styles.inputView}>
      <Picker
        style={styles.TextInput}
        selectedValue={status}
        onValueChange={handleStatusValueChange}
      >
        <Picker.Item label="Select an status" value="" />
        <Picker.Item label="New" value="New" />
        <Picker.Item label="In Progress" value="In Progress" />
        <Picker.Item label="Done" value="Done" />
      </Picker>
    </View>
    {statusError ? <Text style={styles.errorText}>{statusError}</Text> : null}

      <TouchableOpacity style={styles.loginBtn} onPress={handleValidation}>
        <Text style={styles.loginText} onPress={handleValidation}>Submit</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>

  );}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30,
    marginBottom:30,

  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
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
    marginTop: 20,
    backgroundColor: '#244cb3',
  },

  loginText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});


