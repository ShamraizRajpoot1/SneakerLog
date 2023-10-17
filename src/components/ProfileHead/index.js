import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {AppStyles} from '../../services/utilities/AppStyles';
import {Colors} from '../../services/utilities/Colors';
import {fontFamily, fontSize} from '../../services/utilities/Fonts';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const ProfileHead = props => {
  return (
    <>
      <View style={[AppStyles.row,{backgroundColor:Colors.background}]}>
        <TouchableOpacity
          style={[styles.textContainer, {width: responsiveWidth(20)}]}
          onPress={props.cancelPress}>
          {props.cancel && <Text style={[styles.change]}>Cancel</Text>}
        </TouchableOpacity>
        <View style={[styles.textContainer, {width: responsiveWidth(50)}]}>
          <Text style={[styles.text]}>Profile</Text>
        </View>
        <View style={[styles.textContainer, {width: responsiveWidth(20)}]}>
          {props.edit && (
            <TouchableOpacity onPress={props.onPress}>
              <Text style={[styles.text, {color: Colors.forgot}]}>Edit</Text>
            </TouchableOpacity>
          )}
          {props.update && (
            <TouchableOpacity onPress={props.updatePress}>
              <Text style={[styles.text]}>Update</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

export default ProfileHead;

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    
  },
  text: {
    color: Colors.text2,
    fontSize: fontSize.h3,
    fontFamily: fontFamily.LatoBold,
  },
  change: {
    fontFamily: fontFamily.LatoBold,
    fontSize: fontSize.lebal,
    color: Colors.blue,
  },
});
