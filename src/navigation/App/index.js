import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from './Bottom';
import { Colors } from '../../services/utilities/Colors';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false , statusBarColor: Colors.backgroud1}}
      initialRouteName="BottomTab">
      <Stack.Screen name="BottomTab" component={BottomTab} />
    </Stack.Navigator>
  );
};

export default App;
