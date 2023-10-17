import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    ScrollView,
  } from 'react-native';
  import React from 'react';
  import {AppStyles} from '../../../services/utilities/AppStyles';
  import {Colors} from '../../../services/utilities/Colors';
  import Header from '../../../components/Header';
  import InputField from '../../../components/InputField';
  import {
    responsiveScreenHeight,
    responsiveWidth,
    responsiveHeight,
  } from 'react-native-responsive-dimensions';
  import Button from '../../../components/Button';
  
  const Forgot = ({navigation}) => {
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
                <View style={styles.text}>
                <Text style={AppStyles.loginText}>Enter the Email address used to {"\n"}create account</Text>
                </View>
                <View >
                <InputField
                lebal="Email"
                type="email-address"
                />
                </View>
                
                <View style={[AppStyles.button,{marginTop: responsiveScreenHeight(8),}]}>
                  <Button 
                  background= {Colors.button1}
                  text="Update Password" />
                </View>
              </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </>
    );
  };
  
  export default Forgot;
  
  const styles = StyleSheet.create({
    text:{
        marginLeft: responsiveWidth(10),
        marginTop: responsiveHeight(8,),
        marginBottom: responsiveHeight(2)
    }
  });
  