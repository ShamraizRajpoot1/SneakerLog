import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import React, { useContext, useState } from 'react';
import {Colors} from '../../../services/utilities/Colors';
import {appIcons, appImages} from '../../../services/utilities/Assets';
import {scale} from 'react-native-size-matters';
import {AppStyles} from '../../../services/utilities/AppStyles';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
import { AuthContext } from '../../../navigation/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const SignUp = () => {
    navigation.navigate('SignUp')
  }
  const Forgot = () => {
    navigation.navigate('Forgot')
  }
  const { login, user } = useContext(AuthContext)
  //const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const Login = () => {
    if (!isValidEmail(email)) {
     // Toast.show('Invalid email address', Toast.LONG);
      return;
    }

   // setLoading(true);

    login(email, password)
      .then((user) => {
        console.log('User:', user); 
        if (user) {
          return AsyncStorage.setItem('Token', user.uid);
        } else {
         throw new Error('Login failed');
        }
      })
      .then(() => {
        navigation.navigate('App');
       // Toast.show('Login Successful', Toast.LONG);
      })
      .catch((error) => {
        console.error('Login error:', error); 
      // Alert.alert('Login error:', error)
      })
      .finally(() => {
       // setLoading(false);
      });
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
      <TouchableWithoutFeedback>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={[
            AppStyles.contentContainer,
            {backgroundColor: Colors.backgroud1},
          ]}
          keyboardShouldPersistTaps="handled">
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={appImages.logo} />
            <Text style={[AppStyles.loginText]}>Please Log In to your account</Text>
            <TouchableOpacity style={styles.fbContainer} >
              <Image style={styles.facebook} source={appIcons.facebook} />
            </TouchableOpacity>
            <Text style={[AppStyles.loginText, {fontSize: fontSize.h2}]}>- OR -</Text>
          </View>
          <View style={styles.fieldContainer}>
            <View style={styles.field}>
            <InputField
            onChangeText={setEmail}
            value={email}
            lebal="Email" 
            type='email-address'
            />
            </View>
             <View style={{marginTop: responsiveHeight(1)}}>
            <InputField 
            onChangeText={setPassword}
            value={password}
            lebal="Password" 
            type='default'
            secureTextEntry={true}
            />
            </View>
            <TouchableOpacity  onPress={Forgot}>
            <Text style={[AppStyles.forgot,{marginLeft: '10%',}]}>Forgot Password?</Text>
            </TouchableOpacity>
            
          </View>
          <View style={styles.buttonContainer}>
          <Button 
          text={"Log In"}
          background={Colors.button1}
          fontWeight={'900'}
          onPress={Login}
          />
          <Button 
          onPress={SignUp}
          text={"Sign Up"}
          
          />

          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  logo: {
    width: scale(230),
    height: scale(40),
    marginBottom: responsiveHeight(2),
    marginTop: responsiveHeight(9)
  },
  logoContainer: {
    alignItems: 'center',
  },
  
  fieldContainer: {
    justifyContent:'flex-start',
    
    
  },
  buttonContainer: {
    marginTop:responsiveHeight(3),
    alignItems:'center',
    justifyContent:'flex-start',
    
  },
  fbContainer: {
    width: responsiveWidth(32),
    height: responsiveHeight(5),
    backgroundColor: Colors.fbBackground,
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
  },
  facebook: {
    width: scale(25),
    height: scale(25),
  },
 
  field:{
    
   
    marginTop: responsiveHeight(1),
  }
});
