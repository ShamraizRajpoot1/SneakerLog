import {
    Modal,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Switch,
  } from 'react-native';
  import React, {useState} from 'react';
  import {Colors} from '../../../services/utilities/Colors';
  import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
  import {
    responsiveHeight,
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
  import {scale} from 'react-native-size-matters';
  import Input from '../../Input';
  
  const ShareApp = props => {
    return (
      <Modal
        transparent={true}
        visible={props.isVisible}
        onRequestClose={props.onBackdropPress}>
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={props.onBackdropPress}>
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <Text style={styles.modaltxt}>Share Collection to...</Text>
            <TouchableOpacity style={styles.textContainer}>
              <Text style={styles.text}>Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textContainer}>
              <Text style={styles.text}>Copy Link</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textContainer}>
              <Text style={styles.text}>Spreadsheet</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
  
  export default ShareApp;
  
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
      borderTopRightRadius: scale(15),
      borderTopLeftRadius: scale(15),
      justifyContent: 'space-between',
      paddingHorizontal:'5%'
    },
    modaltxt: {
      fontSize: fontSize.h3,
      fontFamily: fontFamily.LatoHeavy,
      fontWeight: 'bold',
      color: Colors.text3,
      marginTop: responsiveScreenHeight(2.5),
      marginBottom: responsiveScreenHeight(2)
    },
    textContainer:{
      width:'100%',
      height: responsiveScreenHeight(5),
      borderWidth: responsiveScreenWidth(0.15),
      borderRadius: scale(6),
      alignItems:'center',
      justifyContent:'center',
      marginBottom:responsiveScreenHeight(2),
      borderColor: Colors.border1,
    },
    text:{
      fontSize: fontSize.h1,
      fontFamily: fontFamily.LatoBold,
      color: Colors.blue, 
      opacity: 0.7
    }
   
  });
  