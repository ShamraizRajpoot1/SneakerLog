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
import React, {useState} from 'react';
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
import Dropdown from '../../../components/Dropdown';

const Sneakers = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const items = ['Purchased', 'Sold', 'Want', 'Holy Grail', 'Gift'];
  const back = () => {
    navigation.goBack();
  };
  const row = {
    ...AppStyles.row2,
    borderBottomWidth: responsiveWidth(0.2),
    width: '100%',
    marginHorizontal: 0,
    height: responsiveHeight(5),
  };
  const Profile = () => {
    navigation.navigate('Profile');
  };
  return (
    <>
      <Header Image={true} onPress={back} options={true} press={Profile}/>

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
            <View style={row}>
              <TouchableOpacity
                style={[styles.textContainer, {width: responsiveWidth(20)}]}>
                <Image
                  style={{width: scale(25), height: scale(25),marginLeft:responsiveWidth(5)}}
                  source={appIcons.star}
                />
              </TouchableOpacity>
              <View
                style={[styles.textContainer, {width: responsiveWidth(60)}]}>
                <Text style={[styles.text]}>Shoes</Text>
              </View>
              <View
                style={[styles.textContainer, {width: responsiveWidth(20)}]}>
                <TouchableOpacity>
                  <Image
                    style={{width: scale(20), height: scale(25), marginRight:responsiveWidth(5)}}
                    source={appIcons.download}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={[
                AppStyles.addCollection,
                {marginTop: responsiveHeight(3), height: responsiveHeight(20)},
              ]}>
              <Image
                style={{width: scale(85), height: scale(70)}}
                source={appIcons.camera}
              />
              <Text style={styles.camtext}>Add Photo</Text>
            </View>
            <View style={styles.margin}>
              <Text style={AppStyles.field}>SNEAKER</Text>
              <Input />
            </View>
            <View style={styles.margin}>
              <Text style={AppStyles.field}>BRAND</Text>
              <Input />
            </View>
            <View style={styles.margin}>
              <Text style={AppStyles.field}>PRICE</Text>
              <Input />
            </View>
            <View style={styles.margin}>
              <Text style={AppStyles.field}>SNEAKER SIZE</Text>
              <Input />
            </View>
            <View style={styles.margin}>
              <Text style={AppStyles.field}>CONDITION</Text>
              <View style={AppStyles.textinputcontainer}>
                <TouchableOpacity style={[AppStyles.touchable]}>
                  <Text style={[styles.touchText]}>New</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    AppStyles.touchable,
                    {backgroundColor: Colors.barBackground},
                  ]}>
                  <Text style={[styles.touchText, {color: Colors.lebal}]}>
                    Used
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.margin}>
              <Text style={AppStyles.field}>SKU</Text>
              <Input />
            </View>
            <View style={styles.margin}>
              <Text style={AppStyles.field}>COLORWAY</Text>
              <Input />
            </View>
            <View style={styles.margin}>
            <Text style={AppStyles.field}>QUANTITY</Text>
              <View style={[AppStyles.row2, {height: responsiveHeight(6), marginLeft: 0,}]}>
                <TouchableOpacity style={[styles.button,{borderRadius: scale(5),}]}>
                  <Text style={[AppStyles.plus, {color: Colors.blackText}]}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={[styles.touchText, {alignSelf: 'center'}]}>1</Text>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {backgroundColor: Colors.barBackground,borderRadius: scale(5)},
                  ]}>
                  <Text style={[AppStyles.plus,{color:Colors.lebal}]}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.margin,{marginBottom:responsiveHeight(6)}]}>
              <Text style={AppStyles.field}>SNEAKER STATUS</Text>
              <Dropdown
                items={items}
                selectedValue={selectedValue}
                onValueChange={setSelectedValue}
                placeholder="Select an option"
              />
            </View>
          </ScrollView>
          
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View style={[AppStyles.textinputcontainer,{width:'100%',height:responsiveHeight(8),marginTop: 0}]}>
                <TouchableOpacity style={[AppStyles.touchable]} >
                  <Text style={[styles.touchText,{color: Colors.blue}]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    AppStyles.touchable,
                    {backgroundColor: Colors.barBackground},
                  ]}>
                  <Text style={[styles.touchText, {color: Colors.lebal}]}>
                    Add to Collection
                  </Text>
                </TouchableOpacity>
              </View>
    </>
  );
};

export default Sneakers;

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
  },
  text: {
    color: Colors.blackText,
    fontSize: fontSize.h3,
  },
  change: {
    fontFamily: fontFamily.LatoBold,
    fontSize: fontSize.lebal,
    color: Colors.blue,
  },
  margin: {
    marginTop: responsiveHeight(3),
    marginLeft: responsiveWidth(5),
  },
  camtext: {
    fontSize: fontSize.lebal,
    color: Colors.blackText,
    marginTop: responsiveHeight(1),
  },
  row: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    height: '100%',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth:scale(0.5) ,
    borderTopWidth: scale(0.5),
    borderLeftWidth: scale(0.5),
    borderRightWidth: scale(0.5),
  },
  touchText: {
    color: Colors.blackText,
    fontSize: fontSize.h3,
    fontFamily: fontFamily.LatoBold,
  },
});
