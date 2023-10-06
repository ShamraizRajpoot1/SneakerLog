import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Auth from './Auth';
import App from './App';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{headerShown: false}}>
        <Stack.Screen name='Auth' component={Auth} />
        <Stack.Screen name='App' component={App} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation