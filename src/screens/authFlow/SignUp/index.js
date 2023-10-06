import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AppStyles} from '../../../services/utilities/AppStyles';
import {Colors} from '../../../services/utilities/Colors';
import Header from '../../../components/Header';
import InputField from '../../../components/InputField';
import {scale} from 'react-native-size-matters';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Button from '../../../components/Button';
import { fontSize } from '../../../services/utilities/Fonts';
import { appIcons } from '../../../services/utilities/Assets';

const SignUp = ({navigation}) => {
  const [isChecked, setIsChecked] = useState(false);
  const toggleCheck = () => {
    setIsChecked(prevChecked => !prevChecked);
  }
  const isButtonDisabled = !isChecked;
  const buttonColor = isButtonDisabled ? Colors.disabledButton : Colors.button1;
  const back = () =>{
    navigation.goBack()
  }
  return (
    <>
      <Header Image={true} onPress= {back}/>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
        <TouchableWithoutFeedback>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={[AppStyles.contentContainer,{backgroundColor:Colors.backgroud1}]}
            keyboardShouldPersistTaps="handled">
              <InputField
              lebal="Name"
              type="default"
              />
              <InputField
              lebal="Email"
              type="email-address"
              />
              <InputField
              lebal="Phone Number"
              type="numeric"
              placeholder={"+(1)8952-5982"}
              />
              <InputField
              userName={true}
              lebal="Username"
              type="default"
              />
              <InputField
              lebal="Password"
              type="default"
              secureTextEntry={true}
              />
              <View style={styles.toggleContainer}>
                <TouchableOpacity onPress={toggleCheck} style={styles.toggle}>
                  { isChecked &&
                  <Image style={styles.tick} source={appIcons.tick} />
                  }
                  </TouchableOpacity>
                <View style={{marginTop:responsiveHeight(-1),marginLeft: responsiveWidth(5)}}>
                  <Text style={styles.text}>By Logging in, you agree to the</Text>
                  <View style={{flexDirection:'row',}}>
                  <TouchableOpacity>
                  <Text style={[styles.text,{color:Colors.forgot}]}>Terms of Service</Text>
                  </TouchableOpacity>
                  <Text style={styles.text}>{' '}and{' '}</Text>
                  <TouchableOpacity>
                  <Text style={[styles.text,{color:Colors.forgot}]}>Privacy Policy</Text>
                  </TouchableOpacity>
                  </View>
                </View>

              </View>
              <View style={AppStyles.button}>
              <Button
          background={buttonColor} 
          text="Create Account"
          disabled={isButtonDisabled} 
        />
              </View>
            </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  toggleContainer:{
    flexDirection: 'row',
    marginVertical: responsiveHeight(5),
  },
  toggle:{
    width: scale(21),
    height: scale(21),
    borderRadius: 5,
    backgroundColor:Colors.fieldBackground,
    marginLeft: responsiveWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: Colors.toggleText,
    fontSize: fontSize.lebal
  },
  tick : {
    width: responsiveWidth(5),
    height: responsiveWidth(5),
  }
});
