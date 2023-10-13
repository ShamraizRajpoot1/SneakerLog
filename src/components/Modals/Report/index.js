import {
    Modal,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Switch,
  } from 'react-native';
  import React, {useState} from 'react';
  import InputField from '../../InputField';
  import {Colors} from '../../../services/utilities/Colors';
  import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
  import {
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
  import {scale} from 'react-native-size-matters';
  import Input from '../../Input';
  
  const Report = props => {
    return (
      <Modal
        transparent={true}
        visible={props.isVisible}
        onRequestClose={props.onBackdropPress}>
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={props.onBackdropPress}>
          <View style={styles.modalContent}>
            
          <View
                style={styles.container}>
                <Text
                  style={styles.privatetext}>
                  Are you sure you {'\n'}
                  want to report this activty?
                </Text>
              </View>
            <View
              style={[
                styles.row,
                {
                  width: '100%',
                  borderTopWidth: responsiveScreenWidth(0.1),
                },
              ]}>
              <TouchableOpacity onPress={props.onBackdropPress}
                style={[
                  styles.textContainer,
                  {borderRightWidth: responsiveScreenHeight(0.1), borderColor: Colors.text3,}
                ]}>
                <Text style={styles.text}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.textContainer} onPress={props.onPress}>
                <Text style={styles.text}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
  
  export default Report;
  
  const styles = StyleSheet.create({
    modalContainer: {
      width: '100%',
      height: '92.5%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.modalBackground,
    },
    modalContent: {
      backgroundColor: Colors.fieldBackground,
      width: responsiveScreenWidth(78),
      borderRadius: scale(6),
      alignItems: 'center',
      justifyContent: 'space-between',
      padding:0
    },
    container:{
        width: responsiveWidth(78),
        alignItems: 'center',
        marginVertical: responsiveHeight(7),
        justifyContent: 'center',
      },
    privatetext: {
        color: Colors.text3,
        fontSize: fontSize.h1,
        textAlign: 'center',
      },
    row: {
      width: '90%',
      flexDirection: 'row',
    },
    textContainer: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
      height: responsiveScreenHeight(7),
    },
    text: {
      fontSize: fontSize.h1,
      fontFamily: fontFamily.LatoRegular,
      color: Colors.blue,
    },
  });
  