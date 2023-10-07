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
    width: scale(25),
    height: scale(25),
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
    width: responsiveWidth(90),
    alignItems: 'center',
    borderWidth: responsiveWidth(0.2),
    borderRadius: responsiveWidth(2),
    borderColor: Colors.border1,
    backgroundColor: Colors.fieldBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  touchable: {
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
    width: responsiveWidth(12),
    height: responsiveWidth(15),
    resizeMode: 'center',
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
    height: responsiveWidth(0.5),
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
    fontFamily: fontFamily.LatoBold,
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
});
