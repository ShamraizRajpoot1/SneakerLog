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
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ProfileHead from '../../../components/ProfileHead';
import {appIcons} from '../../../services/utilities/Assets';
import {scale} from 'react-native-size-matters';
import Input from '../../../components/Input';
import Dropdown from '../../../components/Dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import CollectionHeader from '../../../components/CollectionHeader';
import {CollectionModal, Size} from '../../../components/Modals';

const Sneakers = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const items = ['Purchased', 'Sold', 'Want', 'Holy Grail', 'Gift'];
  const back = () => {
    navigation.goBack();
  };
  const touchable = {
    ...AppStyles.touchable,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
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
  const [collection, setCollection] = useState(false);
  const [sizemodal, setSizemodal] = useState(false);
  const toggle = () => {
    setCollection(prev => !prev);
  };

  const sizeToggle = () => {
    setSizemodal(prev => !prev);
  };
  const sizeGuide = () => {
    navigation.navigate('SizeGuide', {size});
  };
  const [size, setSize] = useState('');
  // const [sizee, size] = useState('')
  return (
    <>
      <Header Image={true} onPress={back} options={true} press={Profile} />

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
            <CollectionHeader onPress={toggle} />
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
            <View style={AppStyles.margin}>
              <Text style={AppStyles.field}>SNEAKER</Text>
              <Input />
            </View>
            <View style={AppStyles.margin}>
              <Text style={AppStyles.field}>BRAND</Text>
              <Input />
            </View>
            <View style={AppStyles.margin}>
              <Text style={AppStyles.field}>PRICE</Text>
              <Input />
            </View>
            <View style={AppStyles.margin}>
              <Text style={[AppStyles.field]}>SNEAKER SIZE</Text>
              <TouchableOpacity
                onPress={sizeToggle}
                style={styles.sizeContainer}>
                <Text
                  style={[
                    AppStyles.fvrtText,
                    {color: Colors.text3, marginVertical: 0, width: '90%'},
                  ]}>
                  {size}
                </Text>
                <View
                  style={{
                    width: '5%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{width: scale(12), height: scale(15)}}
                    source={appIcons.arrow}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={AppStyles.margin}>
              <Text style={AppStyles.field}>CONDITION</Text>
              <View style={AppStyles.textinputcontainer}>
                <TouchableOpacity style={[AppStyles.touchable]}>
                  <Text style={[AppStyles.touchText]}>New</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    AppStyles.touchable,
                    {backgroundColor: Colors.barBackground,},
                  ]}>
                  <Text style={[AppStyles.touchText, {color: Colors.lebal}]}>
                    Used
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={AppStyles.margin}>
              <Text style={AppStyles.field}>SKU</Text>
              <Input />
            </View>
            <View style={AppStyles.margin}>
              <Text style={AppStyles.field}>COLORWAY</Text>
              <Input />
            </View>
            <View style={AppStyles.margin}>
              <Text style={AppStyles.field}>QUANTITY</Text>
              <View
                style={[
                  AppStyles.row2,
                  {
                    marginTop: responsiveHeight(1),
                    height: responsiveHeight(6),
                    marginLeft: 0,
                  },
                ]}>
                <TouchableOpacity
                  style={[AppStyles.button1, {borderRadius: scale(5)}]}>
                  <Text style={[AppStyles.plus, {color: Colors.blackText}]}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={[AppStyles.touchText, {alignSelf: 'center'}]}>
                  1
                </Text>
                <TouchableOpacity
                  style={[
                    AppStyles.button1,
                    {
                      backgroundColor: Colors.barBackground,
                      borderRadius: scale(5),
                    },
                  ]}>
                  <Text style={[AppStyles.plus, {color: Colors.lebal}]}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={AppStyles.margin}>
              <Text style={AppStyles.field}>SNEAKER STATUS</Text>
              <DropDownPicker
                items={items.map(item => ({
                  label: item,
                  value: item,
                }))}
                defaultValue={selectedValue}
                containerStyle={AppStyles.container}
                style={AppStyles.dropdown}
                itemStyle={AppStyles.itemStyle}
                labelStyle={AppStyles.labelStyle}
                dropDownStyle={AppStyles.dropDown}
                onChangeItem={item => setSelectedValue(item.value)}
              />
              {collection && <CollectionModal onBackdropPress={toggle} onPress={toggle} />}
              {sizemodal && (
                <Size
                  onBackdropPress={sizeToggle}
                  onChange={setSize}
                  onPress={sizeGuide}
                />
              )}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View
        style={[
          AppStyles.textinputcontainer,
          {
            width: '100%',
            borderRadius: 0,
            height: responsiveHeight(8),
            marginTop: 0,
          },
        ]}>
        <TouchableOpacity style={[AppStyles.touchable]}>
          <Text style={[styles.touchText, {color: Colors.blue}]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[touchable, {backgroundColor: Colors.barBackground}]}>
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
  sizeContainer: {
    marginTop: responsiveScreenHeight(1),
    width: responsiveScreenWidth(90),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: scale(0.7),
    height: responsiveScreenHeight(5),
    borderRadius: scale(3),
    borderColor: Colors.border1,
    flexDirection:'row'
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
});
