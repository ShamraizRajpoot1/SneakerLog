import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import { Colors } from '../../services/utilities/Colors';
import { fontFamily, fontSize } from '../../services/utilities/Fonts';
import { scale } from 'react-native-size-matters';

const Button = props => {
  const buttonStyles = {
    width: '80%',
    height: responsiveScreenHeight(6.5),
    backgroundColor: props.background ? props.background : 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(25),
  };
  const textStyles = {
    color:  Colors.lebal,
    fontFamily: fontFamily.LatoRegular,
    fontSize: fontSize.h1,
    fontWeight: props.fontWeight || 'normal',
  };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyles]}
      onPress={props.onPress}
      disabled={props.disabled} // Add the disabled prop
    >
      <Text style={[textStyles]}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
