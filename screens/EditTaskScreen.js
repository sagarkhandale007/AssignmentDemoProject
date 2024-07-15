/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable space-infix-ops */
/* eslint-disable prettier/prettier */
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
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

} from "react-native";

import { Picker } from '@react-native-picker/picker';
import { getTasksData } from '../serviceData/TaskServiceData.js';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';


import { getApiTaskData } from '../serviceData/TaskServiceData.js';

import NetInfo from '@react-native-community/netinfo';

 import EncryptedStorage from 'react-native-encrypted-storage';

export default function EditTaskScreen({ navigation, route }) {


  const [isConnected, setIsConnected] = useState(null);

  const { taskData } = route.params;

  const [task, setTaskData] = useState({});
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  


  async function showData() {
    
    if (isConnected == true) {

    const data = await getTasksData(taskData);

    setTaskData(data);
     
    } else {
      
     retrieveUserSession();

    }

  }


  async function retrieveUserSession() {
    try {   
        const session = await EncryptedStorage.getItem("user_session");
        
        if (JSON.parse(session) !== undefined) {
            // Congrats! You've just retrieved your first value!
            dataJson  = JSON.parse(session)
            const data =  dataJson;

            const dataArray = Object.values(data);


          var TaskDetailsData = dataArray.find((tasks) => (tasks.taskId == taskData));
            setTaskData(TaskDetailsData);

        }

    } catch (error) {
        // There was an error on the native side
    }
  }
  
  useEffect(() => {
      const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    // Cleanup the subscription when the component is unmounted
    return () => unsubscribe();    
  }, []);

  useEffect(() => {

    showData();
    
  }, [isConnected]);



useEffect(() => {
        setTaskTitle(task.taskTitle);
        setTaskDescription(task.taskDescription);
        setTaskId(task.taskId);
        setSelectedCategoryValue(task.category);
        setSelectedPriorityValue(task.priority);
        setSelectedStatusValue(task.status);
        if (task.date) {setDate(new Date(task.date));}

}, [task]);

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
            taskTitle,
            taskDescription,
            taskId,
            category,
            priority,
            status,
            date,

          }),

        });

      if (!response.ok) {
        const errorRes = await response.json();
        console.log("error" + response);
        throw new Error(errorRes.error.message);
      } else {
        const TaskDataResponse = await response.json();
        console.log('Update-Task successful:', TaskDataResponse);
        Alert.alert('Update Task', 'Update Task in List successful');
        navigation.navigate('TasksList');
        return TaskDataResponse;

      }
    } catch (error) {
      throw new Error(error);
    }

  };

 //check validation for the username and password
const handleValidation = async () => {
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
    setPriorityError('Status is required');
  }
  

  // If there are no errors, you can proceed with the form submission
  if (taskTitle && taskDescription && taskId && category && priority && status) {
    // Your form submission logic here

    if (isConnected == true) {

    getAllTask();

    }else{
      
      const jsonObject = {
        taskTitle: taskTitle,
        taskDescription: taskDescription,
        taskId: taskId,
        category: category,
        priority: priority,
        status: status,
        date: date,
      };

      try {   
        const session = await EncryptedStorage.getItem("user_session");
        if (JSON.parse(session) !== undefined) {
            // Congrats! You've just retrieved your first value!
            dataJson  = JSON.parse(session)
            const index = dataJson.findIndex(dataJson => dataJson.taskId === taskId);
        if (index === -1) {
            throw new Error("Object not found in array.");
        }
        dataJson[index] = { ...dataJson[index], ...jsonObject };        
        const updatedUserSessionString = JSON.stringify(dataJson);
        // Store the updated user session object back into EncryptedStorage
        await EncryptedStorage.setItem("user_session", updatedUserSessionString);
        Alert.alert('Update Task', 'Update Task in List successful');
        navigation.navigate('TasksList');
        }
    } catch (error) {
        // There was an error on the native side
    }
    }
    console.log('Form submitted successfully');
  }else{
    console.log('field is required');

  }
};

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskId, setTaskId] = useState('');
  const [category, setSelectedCategoryValue] = useState('');
  const [priority, setSelectedPriorityValue] = useState('');
  const [status, setSelectedStatusValue] = useState('');


  const [taskTitleError, setTaskTitleError] = useState('');
  const [taskDescriptionError, setTaskDescriptionError] = useState('');
  const [taskIdError, setTaskIdError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [priorityError, setPriorityError] = useState('');
  const [statusError, setStatusError] = useState('');


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
          value={taskTitle}
          onChangeText={(val) => setTaskTitle(val)}
        />
      </View>
      {taskTitleError ? <Text style={styles.errorText}>{taskTitleError}</Text> : null}


      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Task Description"
          placeholderTextColor="#ffffff"
          value={taskDescription}
          onChangeText={(val) => { setTaskDescription(val) }}
        />
      </View>
      {taskDescriptionError ? <Text style={styles.errorText}>{taskDescriptionError}</Text> : null}

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Task Id"
          placeholderTextColor="#ffffff"
          value={taskId}
          editable={false} 
          onChangeText={(val) => { setTaskId(val) }}
        />
      </View>
      {taskIdError ? <Text style={styles.errorText}>{taskIdError}</Text> : null}


      <View style={styles.inputView}>
      <Text style={styles.TextInput}       
        title="End Date" 
        onPress={() => setOpen(true)} >
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
          value={category}

        >
          <Picker.Item label="Select an option" value="" />
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
          value={priority}
        >
          <Picker.Item label="Select an option" value="" />
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

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f9fa",
    alignItems: "center",
    justifyContent: "center",
    marginTop:30,
    marginBottom:30,
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
    backgroundColor: "#91a2cf",
    borderRadius: 5,
    width: "70%",
    height: 50,
    marginBottom: 32,
    alignItems: "start",
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
    marginTop: 20,
    backgroundColor: "#244cb3",
  },

  loginText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});


