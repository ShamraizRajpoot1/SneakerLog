import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Image,
  Keyboard
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
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
import { AuthContext } from '../../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

const SignUp = ({navigation}) => {

  const {register, user} = useContext(AuthContext)

  const [isChecked, setIsChecked] = useState(false);
  const [emailCheck, setEmailCheck] = useState(null);
  const [userNameCheck, setUserNameCheck] = useState(null);
  const [passwordCheck, setPasswordCheck] = useState(null);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const toggleCheck = () => {
    if (name && email && phone && userName && password) {
      setIsChecked(prevChecked => !prevChecked);
    }
  };
  const isValidEmail = email => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const isValidPassword = password => {
    return password.length >= 6;
  };

  const isUserName = userName => {
    return userName.length >= 4 && userName.length <=25;
  };
  const SignUp = () => {
    try {
      if (!isValidEmail(email)) {
        setEmailCheck(true)
        return
      }
      if (isValidEmail(email)) {
        setEmailCheck(false)
      }
  
      if (!isUserName(userName)) {
       setUserNameCheck(true)
       return
      }
      if (isUserName(userName)) {
        setUserNameCheck(false)
       }
      if (!isValidPassword(password)) {
       setPasswordCheck(true)
       return
      }
      if (isValidPassword(password)) {
       setPasswordCheck(false)
      }
  
     
        register(email, password)
          .then(async(user) => {
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            const userId = userCredential.user.uid;
            console.log('====================================');
            console.log(userId);
            console.log('====================================');
            if (user) {
              firestore()
              .collection('Users')
              .doc(userId)
              .set({
                userId: userId,
                email: email,
                name: name,
                phone: phone,
                userName: userName, 
              
                  
              })
              .then(async () => {
                console.log('User Registered');
                await AsyncStorage.setItem('Token', userId);
                navigation.navigate('App');
              })
              .catch((error) => {
                console.log('Something went wrong', error);
              });
            } else {

            //  Toast.show('Registration failed', Toast.LONG);
            }
          })
          .catch((error) => {
           // setIsLoading(false); // Log here
            console.error(error);
            //Toast.show('Registration error', Toast.LONG);
          });
      
    } catch (error) {
      //Toast.show(error.message, Toast.LONG);
    }
  };
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={[AppStyles.contentContainer,{backgroundColor:Colors.backgroud1}]}>
              <InputField
              lebal="Name"
              type="default"
              onChangeText={setName}
              value={name}
              />
              <InputField
              lebal="Email"
              type="email-address"
              onChangeText={setEmail}
              value={email}
              setCross={setEmailCheck}
              cross={emailCheck}
              />
              <InputField
              lebal="Phone Number"
              type="numeric"
              placeholder={"+(1)8952-5982"}
              onChangeText={setPhone}
              value={phone}
              maxLength={10}
              />
              <InputField
              userName={true}
              lebal="Username"
              type="default"
              onChangeText={setUserName}
              value={userName}
              setCross={setUserNameCheck}
              cross={userNameCheck}
              />
              <InputField
              lebal="Password"
              type="default"
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
              setCross={setPasswordCheck}
              cross={passwordCheck}
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
              onPress={SignUp}
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
    marginVertical: responsiveHeight(4),
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
