import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {fontSize} from '../../services/utilities/Fonts';
import {Colors} from '../../services/utilities/Colors';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {scale} from 'react-native-size-matters';
import {appIcons} from '../../services/utilities/Assets';
import {AppStyles} from '../../services/utilities/AppStyles';

const InputField = props => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  //let formattedValue = props.Value;
  const formatValue = value => {
    if (props.lebal === 'Phone Number' && value) {
      let formattedValue = value.replace(/[^\d]/g, ''); 
      if (formattedValue.length > 0) {
        let formattedNumber = '+1 (';
        if (formattedValue.length >= 3) {
          formattedNumber += formattedValue.substring(0, 3) + ') ';
        }
        if (formattedValue.length >= 6) {
          formattedNumber += formattedValue.substring(3, 6) + '-';
        }
        if (formattedValue.length >= 10) {
          formattedNumber += formattedValue.substring(6, 10);
        }
        return formattedNumber;
      }
    }
    return value;
  };


  // if (props.lebal === 'Phone Number') {
  //   formattedValue = formatValue(props.Value);
  // }

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.lebal}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: props.cross
              ? Colors.barBackground
              : isFocused
              ? Colors.blue
              : null,
            borderWidth: isFocused ? scale(3) : null,
          },
        ]}>
        <TextInput
          style={AppStyles.input}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          value={props.Value}
          keyboardType={props.type}
          secureTextEntry={secureTextEntry && props.secureTextEntry}
          onFocus={() => {
            setIsFocused(true);
            {props.setCross && props.setCross(null);} 
          }}
          maxLength={props.maxLength}
          onBlur={() => setIsFocused(false)}
        />
        {props.cross && !props.secureTextEntry && (
          <View style={styles.right}>
            <Image
              source={appIcons.cross}
              style={{width: scale(18), height: scale(18)}}
            />
          </View>
        )}
        {props.cross === false && !props.secureTextEntry && (
          <View style={styles.right}>
            <Image
              source={appIcons.tickgreen}
              style={{width: scale(18), height: scale(18)}}
            />
          </View>
        )}
        {props.secureTextEntry && (
          <TouchableOpacity
            style={[styles.right, {borderLeftWidth: responsiveWidth(0.1)}]}
            onPress={toggleSecureTextEntry}>
            {secureTextEntry ? (
              <Image source={appIcons.eye} style={styles.passwordIcon} />
            ) : (
              <Image source={appIcons.eye1} style={styles.passwordIcon2} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {props.cross && (
        <Text style={[styles.username,{color: Colors.forgot}]}>
         Please enter a valid value
        </Text>
      )}
      {props.userName && (
        <Text style={styles.username}>
          Usernames must be between 3 and 25 characters.
        </Text>
      )}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    //height:responsiveHeight(11.5),
    marginHorizontal: '10%',
    marginTop: responsiveHeight(1.5),
  },
  label: {
    fontSize: fontSize.lebal,
    color: Colors.lebal,
  },
  right: {
    width: '10%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    height: responsiveHeight(6.7),
    marginTop: responsiveHeight(1),
    backgroundColor: Colors.fieldBackground,
    borderRadius: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.bordor2,
  },
  passwordIcon: {
    width: scale(20),
    height: scale(20),
  },
  passwordIcon2: {
    width: scale(20),
    height: scale(15),
    backgroundColor: 'white',
  },
  username: {
    color: Colors.toggleText,
    fontSize: fontSize.userName,
  },
});
