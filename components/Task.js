/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {Text, Image, View, StyleSheet, Button,TouchableOpacity,Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import EncryptedStorage from 'react-native-encrypted-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function Task({taskTitle, taskDescription, taskId,date,category,priority,status,taskDataId,onPress,navigation}) {

  const AddTaskIcon = require('../assets/add.png');


  const [isConnected, setIsConnected] = useState(null);

  //   get Task data from online and offline 
  async function getTask() {

    if (isConnected == true) {
        
    } else {
     
      // retrive Offline data from local storage
      retrieveUserSession()
  
    }

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


          taskDataId == AllTaskData[key].taskId

        ) {

          getDeleteTask(key);
        } else {

         // Alert.alert('Task Data', 'invalid Task Data');

        }
      }

      return AllTaskData;
    } catch (error) {
      throw new Error(error);
    }


  }


  //   delete the task in the list..
  async function getDeleteTask(_key) {


    try {
     
      const response = await fetch('https://task-mangement-13551-default-rtdb.firebaseio.com/data/'+ _key + '.json',

        {
          method: 'DELETE',

          headers: {
            'Content-Type': 'application/json',
          },
       

        });



      if (!response.ok) {

        const errorRes = await response.json();
        console.log("error" + response);

        throw new Error(errorRes.error.message);

      } else {
        const TaskDataResponse = await response.json();
        console.log('Delete-Task successful:', TaskDataResponse);
        Alert.alert('Delete Task', 'Delete Task in List successful');
        navigation.navigate('TasksList');
        return TaskDataResponse;

      }


    } catch (error) {

      throw new Error(error);

    }

  };

  async function retrieveUserSession() {
    try {   
        const session = await EncryptedStorage.getItem("user_session");
        
        if (JSON.parse(session) !== undefined) {
            // Congrats! You've just retrieved your first value!
            console.log('session', session);
            dataJson  = JSON.parse(session)
            const data =  dataJson;
            const dataArray = Object.values(data);
            console.log('dataArray', dataArray);
  
        }
    } catch (error) {
        // There was an error on the native side
    }
  }
 

  useEffect(() => {
    
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      console.log('state.isConnected::' + state.isConnected);

    });

    // Cleanup the subscription when the component is unmounted
    return () => unsubscribe();
  },[]);

const handleEditPress = () => {
  
  Alert.alert(
    'Edit-Task',
    'Want to Edit-Task',
    [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},

      {text: 'OK', onPress: () => navigation.navigate('editTaskScreen', {taskData:taskDataId})},

    ],
    { cancelable: false }
  );

};

const handleDeletePress = () => {
  

  Alert.alert(
    'Delete-Task',
    'Want to Delete-Task',
    [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
      {text: 'OK', onPress: () => getTask()},
    ],
    { cancelable: false }
  );

};

  return (



<View style={styles.card}>  
    <View style={{ flexDirection: 'row', marginLeft: 'auto' }}>
    
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>

      <TouchableOpacity onPress={handleEditPress} style={{ marginRight: 10 }}>
      <Button title="Edit" onPress={handleEditPress} size={24} color="blue" />
      {/* <FontAwesome name="edit" size={24} color="blue" /> */}
    </TouchableOpacity>

    <TouchableOpacity onPress={handleDeletePress}>
      <Button title="Delete" onPress={handleDeletePress} size={24} color="red" />
      {/* <MaterialCommunityIcons name="delete" size={50} color="red" /> */}
    </TouchableOpacity>
    </View>
  </View>

         <TouchableOpacity onPress={onPress}>
            <View style={styles.infoContainer}>
            <Text style={styles.title}>{taskTitle}</Text>
            <Text style={styles.Description}>{taskDescription}</Text>

          </View>
        </TouchableOpacity>

   </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
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
  thumb: {
    height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
  },
  infoContainer: {
    padding: 16,
    width:"100%"
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#787878',
  },
  Description: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#3821FF',
  },
});
