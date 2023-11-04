import {
    Modal,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    ScrollView,
    Image,
  } from 'react-native';
  import React, { useState } from 'react';
  import InputField from '../../InputField';
  import { Colors } from '../../../services/utilities/Colors';
  import { fontFamily, fontSize } from '../../../services/utilities/Fonts';
  import {
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
  import { scale } from 'react-native-size-matters';
  
  const Selection = (props) => {
    const handleSelection = (item) => {
      props.onChange(item); 
      props.onBackdropPress()
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
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Select Sneaker Status</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ScrollView>
                <TouchableOpacity style={styles.touchable} onPress={() => handleSelection('Sold')}>
                  <Text style={styles.text}>Sold</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchable} onPress={() => handleSelection('Want')}>
                  <Text style={styles.text}>Want</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchable} onPress={() => handleSelection('Purchased')}>
                  <Text style={styles.text}>Purchased</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchable} onPress={() => handleSelection('Holy Grail')}>
                  <Text style={styles.text}>Holy Grail</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchable} onPress={() => handleSelection('Gift')}>
                  <Text style={styles.text}>Gift</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

export default Selection;

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
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(37),
    borderRadius: scale(12),
    justifyContent: 'space-between',
  },
  titleContainer: {
    width: '100%',
    height: responsiveScreenHeight(10),
    borderBottomWidth: scale(0.7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fontFamily.LatoBold,
    fontWeight: 'bold',
    fontSize: fontSize.h4,
    color: Colors.blackText,
  },
  text: {
    color: Colors.blackText,
    fontFamily: fontFamily.LatoBold,
    marginLeft: responsiveWidth(8),
    fontSize: fontSize.h2,
  },
  touchable:{
    height: responsiveScreenHeight(8),
    width:responsiveScreenWidth(100),
    borderBottomWidth: responsiveScreenHeight(0.1),
    justifyContent:'center'
  }
});
