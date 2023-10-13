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
  
  const CollectionModal = props => {
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
           
              
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
  
  export default CollectionModal;
  
  const styles = StyleSheet.create({
    modalContainer: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: Colors.modalBackground,
    },
    modalContent: {
      backgroundColor: Colors.fieldBackground,
      width: responsiveScreenWidth(100),
      height: responsiveScreenHeight(70),
      borderTopLeftRadius: scale(20),
      borderTopRightRadius: scale(20),
      justifyContent: 'space-between',
      padding: responsiveWidth(4)
    },
    
    privatetext: {
        fontSize: responsiveFontSize(2.4),
        fontFamily: fontFamily.LatoHeavy,
        marginBottom: responsiveHeight(2)
    },
    text: {
        fontSize: fontSize.lebal,
        color: Colors.text4,
        fontFamily: fontFamily.LatoRegular,
        lineHeight: 20,
      },
    
    button: {
        width: '100%',
        height: responsiveScreenHeight(6),
        borderWidth: scale(0.7),
        backgroundColor: Colors.barBackground,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scale(10),
        marginBottom: responsiveHeight(2),
        borderColor: Colors.border1,
      },
      buttonText: {
        color: Colors.lebal,
        fontSize: fontSize.h3,
        fontFamily: fontFamily.LatoRegular,
      },
  });
  