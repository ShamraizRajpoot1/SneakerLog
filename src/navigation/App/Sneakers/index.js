import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Sneakers from '../../../screens/appFlow/Sneakers'
const Stack = createNativeStackNavigator()
const SneakerStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Sneakers' component={Sneakers} />
    </Stack.Navigator>
  )
}

export default SneakerStack

const styles = StyleSheet.create({})