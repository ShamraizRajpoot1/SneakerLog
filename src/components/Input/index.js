import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {Colors} from '../../services/utilities/Colors';
import {fontFamily, fontSize} from '../../services/utilities/Fonts';
import {
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {AppStyles} from '../../services/utilities/AppStyles';
import {Picker} from '@react-native-picker/picker';
import {scale} from 'react-native-size-matters';

const Input = props => {
  const container = {
    ...AppStyles.inputcontainer,
    borderWidth: scale(6),
    alignItems: props.align ? 'center' : null,
    width: props.width ? props.width : '90%',
  };
const input ={
  ...styles.input,
  fontFamily: props.family ? fontFamily.LatoRegular :fontFamily.LatoBold,
  marginHorizontal: props.margin ? responsiveWidth(1) : responsiveScreenWidth(3)
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
        style={input}
        editable={props.editable}
        maxLength={props.maxLength}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
   
    fontFamily: fontFamily.LatoBold,
    fontSize: fontSize.h1,
    color: Colors.text3,
    margin: 0,
    padding: 0,
    height: responsiveHeight(5),
  },
});
