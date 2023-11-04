import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Image,
  Keyboard,
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
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import Button from '../../../components/Button';
import {fontSize} from '../../../services/utilities/Fonts';
import {appIcons} from '../../../services/utilities/Assets';
import {AuthContext} from '../../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

const SignUp = ({navigation}) => {
  const {register} = useContext(AuthContext);

  const [isChecked, setIsChecked] = useState(false);
  const [emailCheck, setEmailCheck] = useState();
  const [userNameCheck, setUserNameCheck] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [phoneCheck, setPhoneCheck] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toggleCheck = () => {
    if (name && email && phone && userName && password) {
      setIsChecked(prevChecked => !prevChecked);
    }
  };
  const focus1 = () => {
    setEmailCheck('');
  };
  const focus2 = () => {
    setPhoneCheck('');
  };
  const focus4 = () => {
    setUserNameCheck('');
  };
  const focus3 = () => {
    setPasswordCheck('');
  };
  const blur1 = () => {
    if (!isValidEmail(email)) {
      setEmailCheck('Please enter a valid Email');
      return;
    }
    if (isValidEmail(email)) {
      setEmailCheck(null);
    }
  };
  const blur2 = () => {
    if (!isUserName(userName)) {
      setUserNameCheck('UserName should be at least 5 characters!');
      return;
    }
    if (isUserName(userName)) {
      setUserNameCheck(null);
    }
  };
  const blur3 = () => {
    if (!isValidPassword(password)) {
      setPasswordCheck('Password should be at least 5 characters!');
      return;
    }
    if (isValidPassword(password)) {
      setPasswordCheck(null);
    }
  };
  const blur4 = () => {
    if (!isValidPhone(phone)) {
      setPhoneCheck('Phone no should be at least 11 digits');
      return;
    }
    if (isValidPassword(password)) {
      setPhoneCheck(null);
    }
  };
  const isValidEmail = email => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };
  const isValidPassword = password => {
    return password.length >= 6;
  };
  const isValidPhone = phone => {
    return phone.length >= 5;
  };

  const isUserName = userName => {
    return userName.length >= 3 && userName.length <= 25;
  };
  const SignUp = () => {
    try {
      setIsLoading(true);

      if (!isValidEmail(email)) {
        setEmailCheck(true);
        setIsLoading(false);
        return;
      }
      if (isValidEmail(email)) {
        setEmailCheck(false);
      }

      if (!isUserName(userName)) {
        setUserNameCheck(true);
        setIsLoading(false);
        return;
      }
      if (isUserName(userName)) {
        setUserNameCheck(false);
      }
      if (!isValidPassword(password)) {
        setPasswordCheck(true);
        setIsLoading(false);
        return;
      }
      if (isValidPassword(password)) {
        setPasswordCheck(false);
      }

      register(email, password)
        .then(async user => {
          const userCredential = await auth().signInWithEmailAndPassword(
            email,
            password,
          );
          const userId = userCredential.user.uid;
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
                sneakerSize: '',
                gender: '',
                profileImage: '',
              })
              .then(async () => {
                await AsyncStorage.setItem('Token', userId);
                setIsLoading(false);
                showCustomToast();
                navigation.navigate('App');
              })
              .catch(error => {
                setIsLoading(false);
              });
          } else {
            setIsLoading(false);
          }
        })
        .catch(error => {
          setIsLoading(false);
          console.error(error);
        });
    } catch (error) {
      setIsLoading(false);
      Toast.show(error.message, Toast.LONG);
    }
  };
  const showCustomToast = () => {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'SignUp Successfull',
      visibilityTime: 6000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
      text1Style: {
        height: responsiveScreenHeight(20),
        fontWeight: 'bold',
        fontSize: fontSize.h3,
        width: 200,
        marginVertical: responsiveScreenHeight(2),
      },
      text2Style: {width: 200},
    });
  };

  const isButtonDisabled = !isChecked;
  const buttonColor = isButtonDisabled ? Colors.disabledButton : Colors.button1;
  const back = () => {
    navigation.goBack();
  };
  
  const handlePhoneChange = (text) => {
    setPhone(text);
  };
  return (
    <>
      <Header Image={true} onPress={back} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={[
              AppStyles.contentContainer,
              {backgroundColor: Colors.backgroud1},
            ]}>
            <InputField
              lebal="Name"
              type="default"
              onChangeText={setName}
              value={name}
            />
            <InputField
              onFocus={focus1}
              lebal="Email"
              type="email-address"
              onChangeText={setEmail}
              value={email}
              onBlur={blur1}
              message={emailCheck}
            />
            <InputField
              onFocus={focus2}
              lebal="Phone Number"
              type="numeric"
              placeholder={'+1 (895) 852-5982'}
              onChangeText={handlePhoneChange}
              value={phone}
              maxLength={17}
              onBlur={blur4}
              message={phoneCheck}
              phone={true}
            />
            <InputField
              onFocus={focus4}
              userName={true}
              lebal="Username"
              type="default"
              onChangeText={setUserName}
              value={userName}
              onBlur={blur2}
              message={userNameCheck}
            />
            <InputField
              onFocus={focus3}
              lebal="Password"
              type="default"
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
              onBlur={blur3}
              message={passwordCheck}
            />
            <View style={styles.toggleContainer}>
              <TouchableOpacity onPress={toggleCheck} style={styles.toggle}>
                {isChecked && (
                  <Image style={styles.tick} source={appIcons.tick} />
                )}
              </TouchableOpacity>
              <View
                style={{
                  marginTop: responsiveHeight(-1),
                  marginLeft: responsiveWidth(5),
                }}>
                <Text style={styles.text}>By Logging in, you agree to the</Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity>
                    <Text style={[styles.text, {color: Colors.forgot}]}>
                      Terms of Service
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.text}> and </Text>
                  <TouchableOpacity>
                    <Text style={[styles.text, {color: Colors.forgot}]}>
                      Privacy Policy
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={[
                AppStyles.button,
                {marginBottom: responsiveScreenHeight(5)},
              ]}>
              <Button
                onPress={SignUp}
                background={buttonColor}
                text="Create Account"
                disabled={isButtonDisabled}
                isLoading={isLoading}
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
  toggleContainer: {
    flexDirection: 'row',
    marginVertical: responsiveHeight(4),
  },
  toggle: {
    width: scale(21),
    height: scale(21),
    borderRadius: 5,
    backgroundColor: Colors.fieldBackground,
    marginLeft: responsiveWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.toggleText,
    fontSize: fontSize.lebal,
  },
  tick: {
    width: responsiveWidth(5),
    height: responsiveWidth(5),
  },
});
