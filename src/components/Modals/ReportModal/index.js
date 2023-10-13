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

const ReportModal = props => {
  const report = () => {
   
    props.onBackdropPress();
    props.onPress();
  };
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
          {props.report ? ( <View>
              <View style={{marginTop: responsiveScreenHeight(1)}}>
                <Text style={styles.privatetext}>Report</Text>
              </View>
              <View style={{marginBottom: responsiveHeight(3.2)}}>
                <Text style={styles.text}>
                  Your report is anonymous, except if you report an intellectual
                  property infringement. If someone is in immediate danger, call
                  the local emergency services.
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.button, {borderWidth: null}]}
                onPress={report}>
                <Text style={styles.buttonText}>Report Activity</Text>
              </TouchableOpacity>
            </View>
         
        ) : (
          <View>
            <View style={{marginTop: responsiveScreenHeight(1)}}>
              <Text style={styles.privatetext}>
                Thank you for letting us know
              </Text>
            </View>
            <View style={{marginBottom: responsiveHeight(3.2)}}>
              <Text style={styles.text}>
                Your fedback is important to us.It helps us keep the sneakerlog
                community safe.
              </Text>
            </View>
            <View style={{marginTop: responsiveScreenHeight(1)}}>
              <Text style={styles.privatetext}>Action you can take</Text>
            </View>
            <TouchableOpacity style={[styles.button, {borderWidth: null}]}>
              <Text style={styles.buttonText}>Block Post</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: null}]}>
              <Text style={[styles.buttonText, {color: Colors.blue}]}>
                Unfollow {'<UserName>'}{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: null}]}>
              <Text style={[styles.buttonText, {color: Colors.blue}]}>
                Block Post
              </Text>
            </TouchableOpacity>
          </View>
        )}
         </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ReportModal;

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
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    justifyContent: 'space-between',
    padding: responsiveWidth(4),
  },

  privatetext: {
    fontSize: responsiveFontSize(2.4),
    fontFamily: fontFamily.LatoHeavy,
    marginBottom: responsiveHeight(2),
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
    borderRadius: scale(6),
    marginBottom: responsiveHeight(5),
  },
  buttonText: {
    color: Colors.lebal,
    fontSize: fontSize.h3,
    fontFamily: fontFamily.LatoRegular,
  },
});
