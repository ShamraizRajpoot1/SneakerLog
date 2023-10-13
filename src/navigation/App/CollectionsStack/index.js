import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Collections from '../../../screens/appFlow/Collections'
import AddProduct from '../../../screens/appFlow/AddProduct'
import SearchSneaker from '../../../screens/appFlow/SearchSneaker'
import ChoseCollection from '../../../screens/appFlow/ChoseCollection'
import ProductDetails from '../../../screens/appFlow/ProductDetails'
import Profile from '../../../screens/appFlow/Profile'
import EditProfile from '../../../screens/appFlow/EditProfile'
const Stack = createNativeStackNavigator()
const CollectionStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='ChoseCollection'>
      <Stack.Screen name='ChoseCollection' component={ChoseCollection} />
        <Stack.Screen name='Collections' component={Collections} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='EditProfile' component={EditProfile} />
        <Stack.Screen name='AddProduct' component={AddProduct} />
        <Stack.Screen name='SearchSneaker' component={SearchSneaker} />
        <Stack.Screen name='ProductDetails' component={ProductDetails} />
            </Stack.Navigator>
  )
}

export default CollectionStack

const styles = StyleSheet.create({})