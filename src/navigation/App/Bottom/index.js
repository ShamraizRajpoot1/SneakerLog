import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../../screens/appFlow/Home';
import { appIcons } from '../../../services/utilities/Assets';
import { Colors } from '../../../services/utilities/Colors';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import Sneakers from '../Sneakers';
import Collections from '../CollectionsStack';
import HomeStack from '../HomeStack';
import SneakerStack from '../Sneakers';
import CollectionStack from '../CollectionsStack';

const Bottom = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Bottom.Navigator
    screenOptions={{
      tabBarStyle: [
        {
        height: responsiveScreenHeight(7),
          display: 'flex',
          backgroundColor: Colors.barBackground
        },
        null,
      ],
      tabBarLabelStyle: {
        color: Colors.lebal,
        marginBottom: responsiveScreenHeight(0.8),
        fontSize: responsiveFontSize(1.3) // Change the label color here
      },
    }}
  >
      <Bottom.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Image
              source={appIcons.home}
              style={styles.icon}
            />
          ),
        }}
      />

      <Bottom.Screen
        name="SneakerStack"
        component={SneakerStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Sneakers',
          tabBarIcon: ({color, size}) => (
            <Image
              source={appIcons.barcodeWhite}
              style={styles.icon}
            />
          ),
        }}
      />
      <Bottom.Screen
        name="CollectionStack"
        component={CollectionStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Collections',
          tabBarIcon: ({color, size}) => (
            <Image
              source={appIcons.collections}
              style={[styles.icon,{width:responsiveScreenWidth(6)}]}
            />
          ),
        }}
      />
    </Bottom.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
icon:{
    width: responsiveScreenWidth(7),
    height: responsiveScreenWidth(6)
}
})
