import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fontFamily, fontSize} from '../Fonts';
import {
  responsiveHeight,
  responsiveScreenHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../Colors';
import {scale} from 'react-native-size-matters';

export const AppStyles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.lebal,
    fontSize: fontSize.h1,
    marginTop: responsiveHeight(2),
  },
  loginText: {
    color: Colors.loginText,
    fontSize: fontSize.h1,
    marginTop: responsiveHeight(2),
  },
  forgot: {
    color: Colors.forgot,
    fontSize: fontSize.fieldText,
    fontFamily: fontFamily.LatoRegular,
    marginVertical: responsiveHeight(1.5),
  },
  fvrtText: {
    fontFamily: fontFamily.LatoBold,
    fontSize: fontSize.fieldText,
    marginVertical: responsiveHeight(1.5),
    color: Colors.blackText,
  },
  input: {
    height: '100%',
    width: '80%',
    padding: 10,
    fontSize: fontSize.fieldText,
    borderRadius: scale(6),
    color: Colors.fieldText,
  },
  row: {
    marginHorizontal: responsiveWidth(5),
    height: responsiveHeight(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  addCollection: {
    alignSelf: 'center',
    width: '90%',
    height: responsiveScreenHeight(10),
    borderWidth: scale(1),
    borderRadius: scale(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.fieldBackground,
    borderColor: Colors.border1,
  },
  add: {
    width: scale(22),
    height: scale(22),
  },
  redtext: {
    fontSize: fontSize.h1,
    marginTop: responsiveHeight(2),
    color: Colors.forgot,
    marginTop: 0,
    fontWeight: '500',
  },
  inputcontainer: {
    marginTop: responsiveHeight(1),
    width: responsiveWidth(90),
    backgroundColor: Colors.fieldBackground,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderRadius: scale(5),
    borderColor: Colors.blackText,
  },

  field: {
    fontFamily: fontFamily.LatoHeavy,
    fontWeight: 'normal',
    fontSize: fontSize.userName,
    color: Colors.username,
  },
  textinputcontainer: {
    marginTop: responsiveHeight(1),
    height: responsiveHeight(6),
    width: '95%',
    alignItems: 'center',
    borderWidth: responsiveWidth(0.2),
    borderRadius: responsiveWidth(2),
    borderColor: Colors.border1,
    backgroundColor: Colors.fieldBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  brandlist:{
    height: responsiveHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#B6BBC8',
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(1),
    backgroundColor: '#FFF',
    width: responsiveWidth(12),
  },
  touchable: {
    borderTopLeftRadius: scale(6),
    borderBottomLeftRadius: scale(6),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: '100%',
  },
  touchable1: {
    borderTopRightRadius: scale(6),
    borderBottomRightRadius: scale(6),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: '100%',
  },
  plus: {
    color: Colors.blackText,
    fontSize: fontSize.plus,
    fontFamily: fontFamily.LatoBold,
    fontFamily: fontFamily.LatoBold,
  },
  textContainer: {
    alignItems: 'center',
  },

  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    marginTop: responsiveScreenHeight(3),
  },
  emptyText: {
    fontSize: fontSize.h2,
    fontFamily: fontFamily.LatoBold,
    color: Colors.blackText,
  },
  collectionContainer: {
    marginTop: responsiveHeight(3),
    borderRadius: responsiveWidth(2),
    borderColor: Colors.border1,
    width: '90%',
    marginHorizontal: '5%',
    borderWidth: responsiveWidth(0.5),
  },
  collection: {
    flexDirection: 'row',
    marginHorizontal: responsiveWidth(2),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productImage: {
    marginVertical:responsiveHeight(1),
    width: responsiveWidth(12),
    height: responsiveHeight(5),
  },
  priceContainer: {
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  arrowRight: {
    width: scale(13),
    height: scale(13),
    tintColor: Colors.blackText,
    marginLeft: responsiveWidth(2),
  },
  line: {
    height: responsiveWidth(0.2),
    backgroundColor: Colors.border1,
    marginHorizontal: 10,
  },
  resultText: {
    fontSize: fontSize.h1,
    fontFamily: fontFamily.LatoBold,
    color: Colors.blackText,
  },
  userText: {
    fontSize: fontSize.userName,
    fontFamily: fontFamily.LatoBold,
    textAlignVertical: 'center',
    width: responsiveWidth(25),
    marginHorizontal: 2.5,
    color: Colors.blackText,
    fontSize: fontSize.usernameText,
  },
  userHorizontalText: {
    fontSize: fontSize.userName,
    fontFamily: fontFamily.LatoRegular,
    marginTop: responsiveHeight(1.3),
    color: Colors.blackText,
  },
  additionalText: {
    fontSize: fontSize.userName,
    fontFamily: fontFamily.LatoRegular,
    color: Colors.username,
  },
  memberimage: {
    height: responsiveHeight(6),
    width: responsiveHeight(6),
    borderRadius: scale(50),
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(1.2),
  },
  margin: {
    marginTop: responsiveHeight(3),
    marginLeft: responsiveWidth(5),
  },
  touchText: {
    color: Colors.blackText,
    fontSize: fontSize.h3,
    fontFamily: fontFamily.LatoBold,
  },
  button1: {
    height: '100%',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth:scale(0.5) ,
    borderTopWidth: scale(0.5),
    borderLeftWidth: scale(0.5),
    borderRightWidth: scale(0.5),
  },

  container: {
    height: responsiveHeight(8),
    width: '95%',
    marginTop: 10,
  },
  dcontainer: {
    
    height: responsiveHeight(7),
    borderRadius: 5,
    width: responsiveWidth(90),
    marginTop: responsiveHeight(1),
  },
  Dropdown: {
    backgroundColor: Colors.fieldBackground,
    borderRadius: scale(5),
    borderColor: Colors.border1,
    width: responsiveWidth(90),
  },
  dropDownStyle: {
    backgroundColor: Colors.fieldBackground,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: Colors.border1,
    width: responsiveWidth(90),
  },
  items: {
    justifyContent: 'flex-start',
    left: 10,
    top: 4,
    color: Colors.text3,
  },
  marginVerticals: {
    marginVertical: responsiveHeight(3),
    marginLeft: responsiveWidth(5),
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontFamily: fontFamily.LatoBold,
    fontSize: fontSize.h2,
    color: Colors.blackText,
  },
});
