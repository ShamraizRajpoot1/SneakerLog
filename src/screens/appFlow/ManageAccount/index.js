import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React,{useState} from 'react';
import Header from '../../../components/Header';
import {AppStyles} from '../../../services/utilities/AppStyles';
import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../../services/utilities/Colors';
import Input from '../../../components/Input';
import {scale} from 'react-native-size-matters';
import Delete from '../../../components/Modals/Delete';

const ManageAccount = ({navigation}) => {
    const [deleteModal, setDeleteModal] = useState(false)
    const toggleModal = () =>{
        setDeleteModal(prevModal => !prevModal)
    }
  const back = () => {
    navigation.goBack();
  };
  return (
    <>
      <Header Image={true} onPress={back} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
        <TouchableWithoutFeedback>
          <ScrollView
            showsVerticalScrollIndicator={true}
            style={{flex: 1}}
            contentContainerStyle={[AppStyles.contentContainer]}
            keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
              <Text style={styles.heading}>MANAGE ACCOUNT</Text>
              <Text
                style={[
                  AppStyles.field,
                  {
                    fontSize: fontSize.usernameText,
                    marginTop: responsiveScreenHeight(4),
                  },
                ]}>
                DISABLE/ENABLE MY ACCOUNT
              </Text>
              <Text style={styles.infoText}>
                You can disable your account instead of deleting it. This means
                your account will be hidden until you reactivate it by logging
                back in and entering the email address used to create the
                account.
              </Text>
              <Text
                style={[AppStyles.field, {fontSize: fontSize.usernameText}]}>
                To Continue,ENTER EMAIL TO DISABLE ACCOUNT
              </Text>
              <Input />
              <Text
                style={[
                  AppStyles.field,
                  {
                    fontSize: fontSize.usernameText,
                    marginTop: responsiveScreenHeight(2),
                  },
                ]}>
                DISABLE/ENABLE MY ACCOUNT
              </Text>

              <Text style={[styles.infoText,{marginBottom: responsiveScreenHeight(4)}]}>
                Disabling your account will hide your Collections and Profile
                until you reactivate your account.Enabling your account will
                make your Collections and Profile visible
              </Text>
              <View style={[styles.button, {borderWidth: null}]}>
                <Text style={styles.buttonText}>Disable Account</Text>
              </View>
              <Text
                style={[
                  AppStyles.field,
                  {
                    fontSize: fontSize.usernameText,
                    marginTop: responsiveScreenHeight(6),
                  },
                ]}>
                DELETE ACCOUNT
              </Text>
              <TouchableOpacity style={[styles.button, {backgroundColor: null}]} onPress={toggleModal}>
                <Text style={[styles.buttonText, {color: Colors.blue}]}>
                  Yes
                </Text>
              </TouchableOpacity>
              {deleteModal && <Delete isVisible={deleteModal} onBackdropPress={toggleModal}/>}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default ManageAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: responsiveScreenWidth(5),
  },
  heading: {
    fontSize: fontSize.h2,
    fontFamily: fontFamily.LatoBold,
    marginVertical: responsiveScreenHeight(2),
    alignSelf: 'center',
  },
  infoText: {
    fontSize: fontSize.lebal,
    color: Colors.text3,
    marginTop: responsiveScreenHeight(1),
    marginBottom: responsiveScreenHeight(5),
  },
  button: {
    width: '95%',
    height: responsiveScreenHeight(5),
    borderWidth: scale(0.7),
    backgroundColor: Colors.barBackground,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(6),
  },
  buttonText: {
    color: Colors.lebal,
    fontSize: fontSize.h3,
    fontFamily: fontFamily.LatoBold,
  },
});
