/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React, {useEffect, useState, useContext} from 'react';

import {
  Text,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  Button,
  StyleSheet,
  Pressable,
} from 'react-native';
import {getTasksData} from '../serviceData/TaskServiceData.js';
import moment from 'moment';

import NetInfo from '@react-native-community/netinfo';

 import EncryptedStorage from 'react-native-encrypted-storage';

export function TaskDetails({route,navigation}) {

  const {productId} = route.params;
  const {userDetails} = route.params;
  const [isConnected, setIsConnected] = useState(null);
  const [tasks, setTaskList] = useState({});
  async function showData() {

    if (isConnected == true) {
    
      const data = await getTasksData(productId);
      setTaskList(data);
  
  
     
    } else {
      retrieveUserSession();
    }

  }

  useEffect(() => {
    
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);

    });
    showData();


    // Cleanup the subscription when the component is unmounted
    return () => unsubscribe();
  },[]);


  async function retrieveUserSession() {
    try {   
        const session = await EncryptedStorage.getItem("user_session");
        
        if (JSON.parse(session) !== undefined) {
            // Congrats! You've just retrieved your first value!
            dataJson  = JSON.parse(session)
            const data =  dataJson;
            const dataArray = Object.values(data);
            var TaskDetailsData = dataArray.find((tasks) => (tasks.taskId == productId));
            setTaskList(TaskDetailsData);  
        }
    } catch (error) {
        // There was an error on the native side
    }
  }
  
  async function getTaskShareing() {
    navigation.navigate('taskSharingScreen', {
      productId: tasks.taskId,
      userdata: userDetails,


    });
  }
  return (
    <SafeAreaView>
      <ScrollView>
       
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{tasks.taskTitle}</Text>
          <Text style={styles.taskId}>{tasks.taskId}</Text>
          <Text style={styles.description}>{tasks.taskDescription}</Text>
          <Text style={styles.shareFrom}>Share From: <Text style={styles.PriorityCategory}>{tasks.taskShareFrom}</Text></Text>
          <Text style={styles.shareTo}>Share To: <Text style={styles.PriorityCategory}>{tasks.taskShareTo}</Text></Text>
          <Text style={styles.addTask}>Task Add From: <Text style={styles.PriorityCategory}>{tasks.addTask}</Text></Text>


          <View style={styles.forgot_button}>
          <Text style={styles.category}>Category: <Text style={styles.PriorityCategory}>{tasks.category}</Text></Text>
          <Text style={styles.Priority}>Priority: <Text style={styles.PriorityCategory}>{tasks.priority}</Text></Text>
          </View>


          <View style={styles.forgot_button}>
          <Text style={styles.date}>Date: <Text style={styles.DateStatus}>{ moment(tasks.date).format('L')}</Text></Text>
          <Text style={styles.status}>Status: <Text style={styles.DateStatus}>{tasks.status}</Text></Text>
          </View>


          <Pressable style={styles.button} onPress={() => getTaskShareing()}> 
           <Text style={styles.textButton} onPress={() => getTaskShareing()}>Share Task</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },

  forgot_button: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
  },
  image: {
    height: 300,
    width: '93%',
    marginTop: 16,
    marginBottom: 8,
    marginStart: 16,
  },
  infoContainer: {
    padding: 16,
    backgroundColor: '#f2f9fa',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#787878',
  },

  category: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#787878',
  },

  date: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#787878',
  },

  status: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#787878',
  },

  
  shareFrom: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#787878',
  },

  shareTo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#787878',
  },
  
  addTask: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#787878',
  },

  

  PriorityCategory: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#787878',
  },

  DateStatus: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#787878',
  },
  
  Priority: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#787878',
  },
  taskId: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 5,
    marginBottom: 16,
    color: '#3821FF',
  },
  description: {
    fontSize: 20,
    fontWeight: '400',
    color: '#787878',
    marginBottom: 16,
  },




  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#244cb3',
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
