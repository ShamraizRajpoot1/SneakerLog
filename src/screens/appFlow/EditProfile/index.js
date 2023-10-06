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
import Input from '../../../components/Input';

const EditProfile = ({navigation}) => {
  const container = {
    ...AppStyles.inputcontainer,
    height: responsiveHeight(5),
    alignItems: 'center',
    justifyContent: 'center',
  };
  const back = () => {
    navigation.goBack();
  };
  const brands = () => {
    navigation.navigate('Brands');
  };
  return (
    <>
      <Header onPress={back} />
      <ProfileHead cancel={true} update={true} cancelPress={back} updatePress={back}/>
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
            <TouchableOpacity style={styles.imageContainer}>
              <Image style={styles.image} source={appIcons.profile} />
              <Text style={styles.imageText}>Change Profile Photo</Text>
            </TouchableOpacity>
            <View>
              <View style={styles.margin}>
                <Text style={AppStyles.field}>MANAGE ACCOUNT</Text>
                <TouchableOpacity
                  style={[
                    container,
                    {flexDirection: 'row', justifyContent: 'space-between'},
                  ]}>
                  <View style={{width: '80%', alignItems:'center',marginLeft:'10%'}}>
                    <Text style={styles.editText}>Edit</Text>
                  </View>
                  <View style={{width: '10%'}}>
                    <Image style={styles.arrowimage} source={appIcons.arrowRight} />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.margin}>
                <Text style={AppStyles.field}>NAME</Text>
                <Input placeholder={'Name'} />
              </View>
              <View style={styles.margin}>
                <Text style={AppStyles.field}>USERNAME</Text>
                <Input placeholder={'UserName'} />
              </View>
              <View style={styles.margin}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={AppStyles.field}>EMAIL</Text>
                  <View style={styles.privateContainer}>
                    <Text style={styles.private}>Private</Text>
                  </View>
                </View>
                <Input editable={false} placeholder={'shamraiz@gmail.com'} />
              </View>
              <View style={styles.margin}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={AppStyles.field}>Phone</Text>
                  <View style={styles.privateContainer}>
                    <Text style={styles.private}>Private</Text>
                  </View>
                </View>

                <Input editable={false} placeholder={'03003565295'} />
              </View>
              <View style={styles.margin}>
                
                <View style={AppStyles.textinputcontainer}>
                  <TouchableOpacity
                    style={[
                      AppStyles.touchable,
                      {backgroundColor: Colors.barBackground},
                    ]}>
                    <Text style={[styles.touchText, {color: Colors.lebal}]}>
                      Male
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[AppStyles.touchable]}>
                    <Text style={[styles.touchText]}>Female</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[AppStyles.touchable]}>
                    <Text style={[styles.touchText]}>Other</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.margin, {marginLeft: 0}]}>
                <Text style={[AppStyles.field, {marginLeft: '5%'}]}>
                  FAVORITE SNEAKER BRANDS
                </Text>
                <TouchableOpacity
                  style={[AppStyles.addCollection, {marginTop: '2%'}]} onPress={brands}>
                  <Image style={AppStyles.add} source={appIcons.add} />
                  <Text style={AppStyles.redtext}>
                    ADD A Favorite Sneaker Brand
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.margin]}>
                <Text style={[AppStyles.field]}>SNEAKER SIZE</Text>
                <Input
                  placeholder={'7.5'}
                  width={responsiveWidth(45)}
                  align={true}
                  maxLength={5}
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default EditProfile;

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
  margin: {
    marginVertical: responsiveHeight(3),
    marginLeft: responsiveWidth(5),
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
  
  touchText: {
    fontFamily: fontFamily.LatoRegular,
    fontWeight: 'normal',
    fontSize: fontSize.h1,
    color: Colors.text2,
  },
 
  imageText: {
    fontFamily: fontFamily.LatoHeavy,
    fontWeight: 'normal',
    fontSize: fontSize.userName,
    color: Colors.forgot,
  },
  editText: {
    color: Colors.blue,
    fontFamily: fontFamily.LatoBold,
    fontSize: fontSize.h1,
  },
  arrowimage:{
    width: scale(15),
    height: scale(10)
  }
});