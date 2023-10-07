import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React,{useState} from 'react';
import {Colors} from '../../../services/utilities/Colors';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {scale} from 'react-native-size-matters';
import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
import Header from '../../../components/Header';
import {AppStyles} from '../../../services/utilities/AppStyles';
import {appIcons, appImages} from '../../../services/utilities/Assets';
import { AddCollection } from '../../../components/Modals';

const ChoseCollection = ({navigation}) => {
    const collection= ()=> {
        navigation.navigate('Collections')
    }
    const back = () => {
      navigation.goBack();
    };
    const profile = () => {
      navigation.navigate('Profile');
    };
    const [modalVisible, setModalVisible] = useState(false);
    const toggleCollection = () => {
      setModalVisible(prev => !prev);
    };
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
      <TouchableOpacity  onPress={collection}
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
          <View style={{marginLeft: responsiveScreenWidth(6)}}>
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
    <>
      <Header options={true} onPress={back} Image={true} press={profile} />
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: Colors.modalBackground,
          justifyContent: 'flex-end',
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
        <TouchableWithoutFeedback>
            <>
          <View style={styles.modalContent}>
            <View style={styles.textContainer}>
              <Text style={[styles.text]}>My Collections</Text>
              <TouchableOpacity onPress={toggleCollection}>
              <Text style={[styles.text, {color: Colors.forgot}]}>
                New Collection
              </Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[AppStyles.contentContainer]}
              keyboardShouldPersistTaps="handled">
              <FlatList
                scrollEnabled={false}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
              />
            </ScrollView>

          </View>
         <View>
         {modalVisible && (<AddCollection 
            isVisible={modalVisible}
            onBackdropPress={toggleCollection}
            //onChangeText={}
            //value={}
            onPress={toggleCollection}
            />)}
         </View>
         </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default ChoseCollection;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: Colors.fieldBackground,
    width: responsiveScreenWidth(100),
    borderTopRightRadius: scale(8),
    borderTopLeftRadius: scale(8),
    width: '100%',
    height: '70%',
  },
  image: {
    marginTop: 20,
    width: scale(45),
    height: scale(45),
  },

  text: {
    color: Colors.blackText,
    fontSize: fontSize.h1,
    fontFamily: fontFamily.LatoBold,
  },
  textContainer: {
    paddingHorizontal: responsiveScreenWidth(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveScreenHeight(2.5),
    paddingBottom: responsiveScreenHeight(2.5),
    borderBottomWidth: responsiveScreenWidth(0.1),
  },
  name: {
    color: Colors.text3,
    fontFamily:fontFamily.LatoBold,
    marginLeft: responsiveWidth(4),
  },
  sneakerCount: {
    color: Colors.blackText,
    
    marginLeft: responsiveWidth(4),
  },
});
