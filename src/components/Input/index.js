import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { Colors } from '../../services/utilities/Colors'
import { fontFamily, fontSize } from '../../services/utilities/Fonts'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { AppStyles } from '../../services/utilities/AppStyles'
import {Picker} from '@react-native-picker/picker';
import { scale } from 'react-native-size-matters'

const Input = props => {
  const container = { 
    ...AppStyles.inputcontainer,
    borderWidth: scale(6),
    alignItems: props.align ? 'center' : null ,
    width: props.width ? props.width : responsiveWidth(90)
  }
  
  return (
    <View style={container}>
                <TextInput
                  paddingHorizontal={12}
                  keyboardType={props.type}
                  placeholder={props.placeholder}
                  placeholderTextColor={Colors.text2}
                  autoCapitalize="sentences"
                  value={props.value}
                  onChangeText={props.onChangeText}
                  style={styles.input}
                  editable={props.editable}
                  maxLength={props.maxLength}
                />
              </View>
  )
  }

export default Input

const styles = StyleSheet.create({
    input:{
        
            marginHorizontal: responsiveWidth(3),
            fontFamily: fontFamily.LatoBold,
            fontSize: fontSize.h1,
            color:Colors.text2,
            margin: 0,
            padding: 0,
            height:responsiveHeight(5)
    },
    

})