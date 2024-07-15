/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity,Alert } from 'react-native';

import { getTasksData } from '../serviceData/TaskServiceData.js';
import { getTasksListData } from '../serviceData/TaskServiceData.js';

import { Task } from '../components/Task.js';

import { getApiTaskData } from '../serviceData/TaskServiceData.js';

import { useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

 import EncryptedStorage from 'react-native-encrypted-storage';

export function TasksList ({navigation}) {


  const {name} = useSelector(state => state.login);
  const [isConnected, setIsConnected] = useState(null);
  const [tasks, setTasks] = useState([]);

  async function SyncData(){

  if (isConnected == true) {
    syncUserData();
  } else {
    
  }
}


async function showData(){

  if (isConnected == true) {
    const data = await getTasksListData();
    setTasks(data);
    storeUserSession(data);
  } else {
    retrieveUserSession()
  } 
}

  function renderTask({item: task}) {

    return (
      <Task {...task}
      onPress={() => {
        navigation.navigate('TaskDetails', {
          productId: task.taskId,
          userDetails: name,
          navigation: { navigation },

        });
      }}
      navigation={navigation} 
      taskDataId ={task.taskId}
      />
    );
  }

  useEffect(() => {

  SyncData();

  },[isConnected]);


  useEffect(() => {
    showData();
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      
    });

    // Cleanup the subscription when the component is unmounted
    return () => unsubscribe();
});

  async function storeUserSession(data) {
    try {
        await EncryptedStorage.setItem(
            "user_session",
            JSON.stringify(data)
        );
        console.log('succsess');
        // Congrats! You've just stored your first value!
    } catch (error) {
        // There was an error on the native side
        console.log('not succsess');
  
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
            setTasks(data);
         }
    } catch (error) {
        // There was an error on the native side
    }
  }
  
  async function syncUserData() {

    if (isConnected == true) {
    try {   
        const session = await EncryptedStorage.getItem("user_session");

        if (JSON.parse(session) !== undefined) {
            // Congrats! You've just retrieved your first value!
             const  dataJson  = JSON.parse(session)
             const dataArray = Object.values(dataJson);
             const data = await getApiTaskData();
          
            for (let i = 0; i < dataArray.length; i++) {
              const taskId = dataArray[i].taskId;
              const taskTitle = dataArray[i].taskTitle;
              const taskDescription = dataArray[i].taskDescription;
              const category = dataArray[i].category;
              const priority = dataArray[i].priority;
              const status = dataArray[i].status;
              const date = dataArray[i].date;

            for (const key in data) {
              if (taskId == data[key].taskId) {
  
                try {
     
                  const response = await fetch('https://task-mangement-13551-default-rtdb.firebaseio.com/data/'+ key + '.json',
            
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
                    
                  }            
                } catch (error) {
                  throw new Error(error);
                }

              } else {
              
              }
            }

          }
           
        }
    } catch (error) {
        // There was an error on the native side
    }


  }else{

  }
  }

  async function getAddTask() {
    
    navigation.navigate('myTaskScreen', {
      paramKey: name,
    });

  }

  return (
    <View style={styles.container}>

    <TouchableOpacity style={styles.loginBtn} onPress={() => getAddTask()}>
    <Text style={styles.loginText}  onPress={() => getAddTask()} >My Task</Text>
  </TouchableOpacity>

  <FlatList

      style={styles.tasksList}
      contentContainerStyle={styles.tasksListContainer}
      keyExtractor={(item) => item.taskId}
      data={tasks}
      renderItem={renderTask}
    />
</View>

  );
}

const styles = StyleSheet.create({
  tasksList: {
    backgroundColor: '#f2f9fa',
    width: '100%',

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f9fa',

  },

  loginBtn: {
    width: '30%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
    backgroundColor: '#244cb3',
  },

  loginText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  tasksListContainer: {
    backgroundColor: '#f2f9fa',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});

export default TasksList;

