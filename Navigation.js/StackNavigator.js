import React from 'react';
import {createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import PostScreen from '../screens/PostScreen'

const Stac = createStackNavigator();

const StackNavigator = () => {
    return(
        <StackNavigator.Navigator 
        initialRouteName ='Home'
        screenOptions = {{
            headerShown: false
        }}>
            <Stack.Screen name= 'Home' component = {TabNavigator}/>
            <Stack.Screen name= 'PostScreen' component = {PostScreen}/>

        </StackNavigator.Navigator>
    );
};

export default StackNavigator;