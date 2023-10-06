import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Collections from '../../../screens/appFlow/Collections'
import AddProduct from '../../../screens/appFlow/AddProduct'
import SearchSneaker from '../../../screens/appFlow/SearchSneaker'
const Stack = createNativeStackNavigator()
const CollectionStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Collections' component={Collections} />
        <Stack.Screen name='AddProduct' component={AddProduct} />
        <Stack.Screen name='SearchSneaker' component={SearchSneaker} />
    </Stack.Navigator>
  )
}

export default CollectionStack

const styles = StyleSheet.create({})