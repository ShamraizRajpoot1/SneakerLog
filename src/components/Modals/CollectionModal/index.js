import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import InputField from '../../InputField';
import {Colors} from '../../../services/utilities/Colors';
import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {scale} from 'react-native-size-matters';
import { AppStyles } from '../../../services/utilities/AppStyles';
import { appIcons } from '../../../services/utilities/Assets';

const CollectionModal = props => {
  const data = [
    { id: 1, name: 'Collection 1', sneaker: 2, price: 10, image: appIcons.star, isPrivate: false },
    { id: 2, name: 'Collection 2', sneaker: 2, price: 20, image: appIcons.star, isPrivate: true },
    { id: 4, name: 'Collection 3', sneaker: 2, price: 30, image: appIcons.star, isPrivate: true },
    { id: 5, name: 'Collection 3', sneaker: 2, price: 30, image: appIcons.star, isPrivate: false },
    { id: 6, name: 'Collection 3', sneaker: 2, price: 30, image: appIcons.star, isPrivate: false },
    { id: 7, name: 'Collection 3', sneaker: 2, price: 30, image: appIcons.star, isPrivate: true },
    { id: 8, name: 'Collection 3', sneaker: 9, price: 30, image: appIcons.star, isPrivate: false },
    { id: 9, name: 'Collection 3', sneaker: 2, price: 30, image: appIcons.star, isPrivate: true },
    { id: 10, name: 'Collection 3', sneaker: 2, price: 30, image: appIcons.star, isPrivate: false },
    { id: 11, name: 'Collection 3', sneaker: 2, price: 30, image: appIcons.star, isPrivate: true },
    { id: 12, name: 'Collection 3', sneaker: 5, price: 30, image: appIcons.star, isPrivate: false },
    { id: 13, name: 'Collection 3', sneaker: 2, price: 30, image: appIcons.star, isPrivate: true },
  ];
  const renderItem = ({item, index}) => (
    <View>
      <TouchableOpacity onPress={props.onPress}
        style={[
          AppStyles.collection,
          {marginHorizontal: responsiveScreenWidth(5)},
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={item.image}
            style={{
              width: scale(25),
              height: scale(25),
              marginVertical: responsiveScreenHeight(2),
            }}
          />
          <View style={{marginLeft: responsiveScreenWidth(4)}}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.sneakerCount}>
                {item.sneaker} Sneakers in Collection
              </Text>
              {item.isPrivate && (
              <Image
                source={appIcons.pvt}
                style={{width: scale(18), height: scale(18), marginLeft: responsiveWidth(2)}}
              />)}
            </View>
          </View>
        </View>

        <Image style={AppStyles.arrowRight} source={appIcons.arrowRight} />
      </TouchableOpacity>
      {index < data.length - 1 && (
        <View style={[AppStyles.line, {marginHorizontal: 0}]} />
      )}
    </View>
  );
  return (
    <Modal
      transparent={true}
      visible={props.isVisible}
      onRequestClose={props.onBackdropPress}>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={props.onBackdropPress}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>My Collections</Text>
          </View>
          <View style={{flex:1}}>
          <FlatList
          showsVerticalScrollIndicator={false}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
              />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default CollectionModal;

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: '92.5%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: Colors.modalBackground,
  },
  modalContent: {
    backgroundColor: Colors.fieldBackground,
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(67),
    borderTopLeftRadius: scale(6),
    borderTopRightRadius: scale(6),
    justifyContent: 'space-between',
  },
  titleContainer: {
    width: '100%',
    height: responsiveScreenHeight(10),
    borderBottomWidth: scale(0.7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fontFamily.LatoBold,
    fontWeight: 'bold',
    fontSize: fontSize.h4,
    color: Colors.blackText
  },
});
