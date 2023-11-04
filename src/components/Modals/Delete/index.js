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
  
  const Delete = props => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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
            
           <View style={{alignItems:'center',justifyContent:'center',marginTop: responsiveScreenHeight(3)}}>
              <Text style={styles.privatetext}>ARE YOU SURE YOU</Text>
              <Text style={styles.privatetext}>WANT TO DELETE</Text>
              <Text style={styles.privatetext}>ACCOUNT?</Text>
              </View>
            <View
              style={[
                styles.row,
                {
                  width: '100%',
                  borderTopWidth: responsiveScreenWidth(0.1),
                  marginBottom: responsiveHeight(1),
                },
              ]}>
              <TouchableOpacity onPress={props.onBackdropPress}
                style={[
                  styles.textContainer,
                  {borderRightWidth: responsiveScreenHeight(0.1)},
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
  
  export default Delete;
  
  const styles = StyleSheet.create({
    modalContainer: {
      width: '100%',
      height: '93%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.modalBackground,
    },
    modalContent: {
      backgroundColor: Colors.fieldBackground,
      width: responsiveScreenWidth(80),
      borderRadius: scale(6),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    
    privatetext: {
      fontSize: fontSize.lebal,
      fontFamily: fontFamily.LatoBold,
      color: Colors.blackText,
      marginRight: responsiveWidth(4),
    },
    row: {
      width: '90%',
      flexDirection: 'row',
      marginTop: responsiveScreenHeight(2),
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
  