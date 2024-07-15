/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Alert, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen.js';
import {TasksList} from '../screens/TasksListScreen.js';
import {TaskDetails} from '../screens/TaskDetailsScreen.js';
import SingUpScreen, {singUpScreen} from '../screens/SingUpScreen.js';
import ResetPasswordScreen, {
  resetPasswordScreen,
} from '../screens/ResetPasswordScreen.js';

import AddTaskScreen, {addTaskScreen} from '../screens/AddTaskScreen.js';
import EditTaskScreen, {editTaskScreen} from '../screens/EditTaskScreen.js';
import TaskSharingScreen, {taskSharingScreen} from '../screens/TaskSharingScreen.js';
import MyTaskScreen, {myTaskScreen} from '../screens/MyTaskScreen.js';
import ProfileScreen, {profileScreen} from '../screens/ProfileScreen.js';







import HeaderButton from './HeaderButton.js';
import * as loginAction from '../loginState/store/actions/UserSession.js';
import {useSelector, useDispatch, Provider} from 'react-redux';
const Stack = createNativeStackNavigator();

function Navigation() {
  const dispatch = useDispatch();
  const loginStatus = useSelector(state => state.login.loginStatus);
  const logout = require('../assets/logout_icon.png');
  const AddTaskIcon = require('../assets/add.png');
  const profile = require('../assets/pro.png');



  console.log('loginStatus', loginStatus);

  const loginScreenList = (
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={({navigation}) => ({
        title: 'Login Screen',
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: 'center',
      })}
    />
  );

  const productListScreenDrawer = (
    <Stack.Screen
      name="TasksList"
      component={TasksList}
      options={({navigation}) => ({
        title: 'Task Dashbord',
        headerTitleAlign: 'center',

        headerTitleStyle: styles.headerTitle,
         headerRight: () => (
          <><HeaderButton
             onPress={() => {
               navigation.navigate('addTaskScreen');
               console.log('navigation Pressed');
             } }
             image={AddTaskIcon} />
             
             <HeaderButton
               onPress={() => {
                 navigation.navigate('profileScreen');
                 console.log('navigation Pressed');
               } }
               image={profile} /></>
        ),
        
        
        headerLeft: () => (
          <HeaderButton
            onPress={() => {
              Alert.alert('Logout', 'Are your sure you want to logout.', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => {
                    dispatch(loginAction.loginUser(false));
                  },
                },
              ]);
            }}
            image={logout}
          />
        ),
      })}
    />
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!loginStatus && loginScreenList}
        {loginStatus && productListScreenDrawer}
        {loginStatus === undefined && productListScreenDrawer}

        <Stack.Screen
          name="TaskDetails"
          component={TaskDetails}
          options={({navigation}) => ({
            title: 'Task Details',
            headerTitleStyle: styles.headerTitle,
            headerTitleAlign: 'center',

          })}
        />
        <Stack.Screen
          name="singUpScreen"
          component={SingUpScreen}
          options={({navigation}) => ({
            title: 'Sing Up Screen',
            headerTitleStyle: styles.headerTitle,
            headerTitleAlign: 'center',

          })}
        />

        <Stack.Screen
          name="resetPasswordScreen"
          component={ResetPasswordScreen}
          options={({navigation}) => ({
            title: 'Reset Password Screen',
            headerTitleStyle: styles.headerTitle,
            headerTitleAlign: 'center',

          })}
        />

        <Stack.Screen
          name="addTaskScreen"
          component={AddTaskScreen}
          options={({navigation}) => ({
            title: 'Add Task',
            headerTitleStyle: styles.headerTitle,
            headerTitleAlign: 'center',

          })}
        />

        <Stack.Screen
          name="editTaskScreen"
          component={EditTaskScreen}
          options={({navigation}) => ({
            title: 'Edit Task',
            headerTitleStyle: styles.headerTitle,
            headerTitleAlign: 'center',

          })}
        />

        <Stack.Screen
          name="taskSharingScreen"
          component={TaskSharingScreen}
          options={({navigation}) => ({
            title: 'Task Sharing',
            headerTitleStyle: styles.headerTitle,
            headerTitleAlign: 'center',

          })}
        />

       <Stack.Screen
          name="myTaskScreen"
          component={MyTaskScreen}
          options={({navigation}) => ({
            title: 'My Task',
            headerTitleStyle: styles.headerTitle,
            headerTitleAlign: 'center',

          })}
        />

       <Stack.Screen
          name="profileScreen"
          component={ProfileScreen}
          options={({navigation}) => ({
            title: 'Profile',
            headerTitleStyle: styles.headerTitle,
            headerTitleAlign: 'center',

          })}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
  },
});
export default Navigation;
