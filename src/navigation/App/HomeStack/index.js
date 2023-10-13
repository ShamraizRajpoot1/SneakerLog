import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../../../screens/appFlow/Home'
import Events from '../../../screens/appFlow/Events'
import Members from '../../../screens/appFlow/Products'
import Products from '../../../screens/appFlow/Products'
import EventsDetail from '../../../screens/appFlow/EventDetail'
import Profile from '../../../screens/appFlow/Profile'
import EditProfile from '../../../screens/appFlow/EditProfile'
import Brands from '../../../screens/appFlow/Brands'
import AllMembers from '../../../screens/appFlow/AllMembers'
import UserDetails from '../../../screens/appFlow/UserDetails'
import UserCollection from '../../../screens/appFlow/UserCollection'
import ManageAccount from '../../../screens/appFlow/ManageAccount'
import SizeGuide from '../../../screens/appFlow/SizeGuide'

const Stack = createNativeStackNavigator()
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Events' component={Events} />
        <Stack.Screen name='Products' component={Products} />
        <Stack.Screen name='EventsDetail' component={EventsDetail} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='EditProfile' component={EditProfile} />
        <Stack.Screen name='Brands' component={Brands} />
        <Stack.Screen name='AllMembers' component={AllMembers} />
        <Stack.Screen name='UserDetails' component={UserDetails} />
        <Stack.Screen name='UserCollection' component={UserCollection} />
        <Stack.Screen name='ManageAccount' component={ManageAccount} />
        <Stack.Screen name='SizeGuide' component={SizeGuide} />
    </Stack.Navigator>
  )
}

export default HomeStack

const styles = StyleSheet.create({})