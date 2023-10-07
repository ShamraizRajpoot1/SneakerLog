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

const AddCollection = props => {
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
        <View style={styles.modalContent}>
          <Text style={styles.modaltxt}>NEW COLLECTION NAME</Text>
          <Input family={true} margin={true}/>
          <View style={styles.row}>
            <Text style={styles.privatetext}>PRIVATE</Text>
            <Switch
              trackColor={{false: '#767577', true: '#00FF7F'}}
              thumbColor={isEnabled ? '#08CF6E' : 'FFFFFF'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View
            style={[
              styles.row,
              {width: '100%', borderTopWidth: responsiveScreenWidth(0.1),marginBottom: responsiveHeight(1)},
            ]}>
            <TouchableOpacity style={[styles.textContainer,{borderRightWidth: responsiveScreenHeight(0.1),}]}>
              
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textContainer}>
             
              <Text style={styles.text}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default AddCollection;

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: '93%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.7)',
    
  },
  modalContent: {
    backgroundColor: Colors.fieldBackground,
    width: responsiveScreenWidth(86),
    borderRadius: scale(6),
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },
  modaltxt: {
    fontSize: fontSize.h1,
    fontFamily: fontFamily.LatoBold,
    fontWeight: '900',
    color: Colors.blackText,
    marginVertical: responsiveScreenHeight(1.5),
  },
  privatetext: {
    fontSize: fontSize.fieldText,
    fontFamily: fontFamily.LatoBold,
    color: Colors.blackText,
    marginRight: responsiveWidth(4),
  },
  row: {
    width: '90%',
    flexDirection: 'row',
    marginTop: responsiveScreenHeight(2),
  },
  textContainer:{
    width:'50%',
    alignItems:"center",
    justifyContent:'center',
    height: responsiveScreenHeight(7)
  },
  text:{
    fontSize: fontSize.h1,
    fontFamily: fontFamily.LatoRegular,
    color: Colors.blue,
  }
});
