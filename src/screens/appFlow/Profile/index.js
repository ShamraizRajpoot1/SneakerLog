import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {AppStyles} from '../../../services/utilities/AppStyles';
import Header from '../../../components/Header';
import {Colors} from '../../../services/utilities/Colors';
import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ProfileHead from '../../../components/ProfileHead';
import {appIcons} from '../../../services/utilities/Assets';
import {scale} from 'react-native-size-matters';

const Profile = ({navigation}) => {
  const back = () => {
    navigation.goBack();
  };
  const edit = () => {
    navigation.navigate('EditProfile');
  };
  const container = {
    ...AppStyles.inputcontainer,
    height: responsiveHeight(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(3),
  };
  return (
    <>
      <Header Image={true} onPress={back} />
      <ProfileHead edit={true} onPress={edit} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
        <TouchableWithoutFeedback>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={[AppStyles.contentContainer]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={appIcons.profile} />
            </View>
            <View>
              <View style={AppStyles.marginVerticals}>
                <Text style={styles.field}>NAME</Text>
                <Text style={styles.textValue}>Shamraiz</Text>
              </View>
              <View style={AppStyles.marginVerticals}>
                <Text style={styles.field}>USERNAME</Text>
                <Text style={styles.textValue}>shamraiz</Text>
              </View>
              <View style={AppStyles.marginVerticals}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.field}>EMAIL</Text>
                  <View style={styles.privateContainer}>
                    <Text style={styles.private}>Private</Text>
                  </View>
                </View>
                <Text style={styles.textValue}>shamraiz@gmail.com</Text>
              </View>
              <View style={AppStyles.marginVerticals}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.field}>Phone</Text>
                  <View style={styles.privateContainer}>
                    <Text style={styles.private}>Private</Text>
                  </View>
                </View>

                <Text style={styles.textValue}>03000000000</Text>
              </View>
              <View style={AppStyles.marginVerticals}>
                <View style={styles.textinputcontainer}>
                  <TouchableOpacity
                    style={[
                      styles.touchable,
                      {backgroundColor: Colors.barBackground},
                    ]}>
                    <Text style={[styles.touchText, {color: Colors.lebal}]}>
                      Male
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.touchable]}>
                    <Text style={[styles.touchText]}>Female</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.touchable]}>
                    <Text style={[styles.touchText]}>Other</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={AppStyles.marginVerticals}>
                <Text style={styles.field}>FAVORITE SNEAKER BRANDS</Text>
                <Text style={styles.textValue}>No Brands Selected</Text>
              </View>
              <View style={AppStyles.marginVerticals}>
                <Text style={styles.field}>SNEAKER SIZE</Text>
                <Text style={styles.textValue}>No Size Selected</Text>
              </View>
              <View style={AppStyles.marginVerticals}>
                <TouchableOpacity 
                  style={[
                    container,
                    {flexDirection: 'row', justifyContent: 'space-between'},
                  ]}>
                  <View style={{width: '80%', alignItems:'center',marginLeft:'10%'}}>
                    <Text style={styles.editText}>Log Out</Text>
                  </View>
                  
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  image: {
    height: responsiveWidth(30),
    width: responsiveWidth(30),
    borderRadius: scale(100),
  },
  imageContainer: {
    marginVertical: responsiveHeight(1),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  textValue: {
    fontFamily: fontFamily.LatoMedium,
    fontWeight: 'normal',
    fontSize: fontSize.h1,
    color: '#121212',
  },
  field: {
    fontFamily: fontFamily.LatoHeavy,
    fontWeight: 'normal',
    fontSize: fontSize.userName,
    color: Colors.username,
  },
  
  private: {
    fontSize: fontSize.fieldText,
    fontFamily: fontFamily.LatoMedium,
    fontWeight: 'normal',
    color: Colors.lebal,
  },
  privateContainer: {
    marginLeft: responsiveWidth(2.5),
    height: responsiveHeight(2.5),
    width: responsiveWidth(14),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.privateBg,
    borderRadius: responsiveHeight(0.5),
  },
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: '100%',
  },
  touchText: {
    fontFamily: fontFamily.LatoRegular,
    fontWeight: 'normal',
    fontSize: fontSize.h1,
    color: Colors.text2,
  },
  textinputcontainer: {
    marginTop: responsiveHeight(1),
    height: responsiveHeight(6),
    width: responsiveWidth(90),
    alignItems: 'center',
    borderWidth: responsiveWidth(0.2),
    borderRadius: responsiveWidth(2),
    borderColor: Colors.border1,
    backgroundColor: Colors.fieldBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editText: {
    color: Colors.blue,
    fontFamily: fontFamily.LatoBold,
    fontSize: fontSize.h1,
  },
});
