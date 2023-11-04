import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React,{useContext, useState , useEffect} from 'react';
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
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../navigation/AuthProvider';
const ManageAccount = ({navigation}) => {
  const {logout} = useContext(AuthContext)
    const [deleteModal, setDeleteModal] = useState(false)
    const toggleModal = () =>{
        setDeleteModal(prevModal => !prevModal)
    }
    const [email, setEmail] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [isAccountDisabled, setIsAccountDisabled] = useState(false);
     const isButtonDisabled = buttonDisabled;
  const buttonColor = isButtonDisabled ? Colors.disabledButton : Colors.button1;
  const checkEmailExistence = async () => {
    try {
      const usersRef = firestore().collection('Users');
      const querySnapshot = await usersRef.where('email', '==', email).limit(1).get();
      if (!querySnapshot.empty) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    } catch (error) {
      console.error('Error checking email existence: ', error);
    }
  };
  
  React.useEffect(() => {
    if (email) {
      checkEmailExistence();
    }
  }, [email]);
  
  const back = () => {
    navigation.goBack();
  };
  const deleteAccount = async () => {
    try {
      const user = auth().currentUser;
      if (!user) {
        console.error('No user is currently signed in.');
        return;
      }
  
      const userId = user.uid;
      await user.delete();
      console.log('User account deleted successfully');
      await AsyncStorage.removeItem('Token');
      navigation.navigate('Auth', { screen: 'Login' });
      const collectionsRef = firestore().collection('Collections');
      const collectionQuerySnapshot = await collectionsRef.where('userId', '==', userId).get();
      collectionQuerySnapshot.forEach((doc) => {
        doc.ref.delete().then(() => {
          console.log('Document successfully deleted from Collections collection!');
        }).catch((error) => {
          console.error('Error removing document from Collections collection: ', error);
        });
      });
      const usersRef = firestore().collection('Users');
      const userQuerySnapshot = await usersRef.where('userId', '==', userId).get();
      userQuerySnapshot.forEach((doc) => {
        doc.ref.delete().then(() => {
          console.log('Document successfully deleted from Firestore!');
        }).catch((error) => {
          console.error('Error removing document: ', error);
        });
      });
    } catch (error) {
      console.error('Error deleting user account:', error);
    }
  };
  
useEffect(() => {
  const user = auth().currentUser; 

  if (user) {
      const usersRef = firestore().collection('Users');
      const userId = user.uid;

      usersRef
          .doc(userId)
          .get()
          .then((doc) => {
              if (doc.exists) {
                  const userData = doc.data();
                  if (userData.isDisabled) {
                      setIsAccountDisabled(true);
                  }
              } else {
                  console.log('No such document!');
              }
          })
          .catch((error) => {
              console.error('Error getting document:', error);
          });
  }
}, []);

const enableAccount = async () => {
  const user = auth().currentUser; 
  const userId = user.uid;
    await AsyncStorage.removeItem('Token');
    logout();
    navigation.navigate('Auth', {screen: 'Login'});
      const usersRef = firestore().collection('Users');
     

      usersRef
          .doc(userId)
          .update({
              isDisabled: false,
          })
          .then(() => {
              console.log('Account enabled successfully');
              setIsAccountDisabled(false);
          })
          .catch((error) => {
              console.error('Error enabling account: ', error);
          });
  
};
const disableAccount = async () => {
  const user = auth().currentUser; 
  const userId = user.uid;
 
    try {
      await AsyncStorage.removeItem('Token');
      logout();
      navigation.navigate('Auth', { screen: 'Login' });

      const usersRef = firestore().collection('Users');
     

      await usersRef.doc(userId).update({
        isDisabled: true
      });
      console.log('Account disabled successfully');
    } catch (error) {
      console.error('Error disabling account: ', error);
    }
  
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
                    marginTop: responsiveScreenHeight(3),
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
              <Input value={email} onChangeText={setEmail} />
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
              <TouchableOpacity style={[styles.button, { borderWidth: null, backgroundColor: buttonColor }]} disabled={isButtonDisabled} onPress={isAccountDisabled ? enableAccount : disableAccount}>
            <Text style={[styles.buttonText]}>{isAccountDisabled ? 'Enable Account' : 'Disable Account'}</Text>
        </TouchableOpacity>
              <Text
                style={[
                  AppStyles.field,
                  {
                    fontSize: fontSize.usernameText,
                    marginTop: responsiveScreenHeight(5),
                    marginBottom: responsiveScreenHeight(1)
                  },
                ]}>
                DELETE ACCOUNT
              </Text>
              <TouchableOpacity style={[styles.button, {backgroundColor: null,marginBottom: responsiveScreenHeight(3),}]} disabled={isButtonDisabled} onPress={toggleModal}>
                <Text style={[styles.buttonText, {color: Colors.blue}]}>
                  Yes
                </Text>
              </TouchableOpacity>
              {deleteModal && <Delete isVisible={deleteModal} onBackdropPress={toggleModal} onPress={deleteAccount}/>}
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
