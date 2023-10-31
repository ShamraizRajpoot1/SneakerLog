import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { appIcons } from '../../services/utilities/Assets';
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';

const CustomToast = ({ text1 }) => (
  <View style={{ width: 10, height:responsiveScreenHeight(40) }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
      <Image
        source={appIcons.tickgreen} 
        style={{ width: scale(40), height: scale(40),  }}
      />
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{text1}</Text>
        
      </View>
      </View>
    </View>
  );

export default CustomToast

const styles = StyleSheet.create({})