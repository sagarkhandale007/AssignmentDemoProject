/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity,Alert } from 'react-native';

import { getMyTask } from '../serviceData/TaskServiceData.js';

import { Task } from '../components/Task.js';
import { getTasksData } from '../serviceData/TaskServiceData.js';



export function MyTaskScreen ({route,navigation}) {

    const {paramKey} = route.params;
    const [tasks, setTaskList] = useState([]);
    async function showData(){
    const data = await getMyTask(paramKey);
    setTaskList(data);

}

  function renderTask({item: task}) {

    return (

      <Task {...task}
      onPress={() => {
        navigation.navigate('TaskDetails', {
          productId: task.taskId,
          navigation: { navigation },


        });
      }}
      navigation={navigation} 
      taskDataId ={task.taskId}

      />
    );
  }

  useEffect(() => {
    showData();
  }, []);


  return (
    <View style={styles.container}>

  <FlatList

      style={styles.taskList}
      contentContainerStyle={styles.taskListContainer}
      keyExtractor={(item) => item.taskId.toString()}
      data={tasks}
      renderItem={renderTask}
    />
    
</View>

  );
}

const styles = StyleSheet.create({
  taskList: {
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
  taskListContainer: {
    backgroundColor: '#f2f9fa',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});

export default MyTaskScreen;

