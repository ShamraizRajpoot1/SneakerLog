import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React,{useState,useEffect} from 'react';
import {AppStyles} from '../../../services/utilities/AppStyles';
import {Colors} from '../../../services/utilities/Colors';
import Header from '../../../components/Header';
import {scale} from 'react-native-size-matters';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
import {appIcons} from '../../../services/utilities/Assets';
import ProductView from '../../../components/ProductView';
import UserView from '../../../components/UserView';
import EventsView from '../../../components/EventsView';
import { AddCollection } from '../../../components/Modals';

const Home = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(true);
  const toggleCollection = () => {
    setModalVisible(prev => !prev);
  };
  const profile = () =>{
    navigation.navigate('Profile')
  }
 const AllMembers = () =>{
  navigation.navigate('AllMembers')
 }
  const EventsDetail = () =>{
    navigation.navigate('EventsDetail')
  }
 const Products = () => {
  navigation.navigate('Products')
 }
 const Events = () => {
  navigation.navigate('Events')
 }
 const details = () => {
  navigation.navigate('UserDetails')
 }
  

  return (
    <>
      <Header options={true} press={profile}/>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
        <TouchableWithoutFeedback>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={[AppStyles.contentContainer]}
            keyboardShouldPersistTaps="handled">
            <Text style={[AppStyles.fvrtText, {marginLeft: '5%'}]}>
              MY FOVORITE COLLECTIONS
            </Text>
            <TouchableOpacity style={AppStyles.addCollection} onPress={toggleCollection}>
              <Image style={AppStyles.add} source={appIcons.add} />
              <Text style={AppStyles.redtext}>ADD A COLLECTION</Text>
            </TouchableOpacity>
            <View style={styles.product}>
              <View style={AppStyles.row2}>
                <Text style={AppStyles.fvrtText}>RELEASE DATE</Text>
                <TouchableOpacity onPress={Products}>
                <Text
                  style={[AppStyles.forgot, {fontFamily: fontFamily.LatoBold}]}>
                  View All
                </Text>
                </TouchableOpacity>
              </View>

              <ProductView sliceSize={7}/>
            </View>
            <View
              style={[styles.product, {marginTop: responsiveScreenHeight(-2)}]}>
              <View style={AppStyles.row2}>
                <Text style={AppStyles.fvrtText}>MEMBERS</Text>
                <TouchableOpacity onPress={AllMembers}>
                <Text
                  style={[AppStyles.forgot, {fontFamily: fontFamily.LatoBold}]}>
                  View All
                </Text>
                </TouchableOpacity>
              </View>
              <UserView onPress={details}/>
            </View>

            <Text
              style={[
                AppStyles.fvrtText,
                {marginLeft: '5%', marginTop: responsiveScreenHeight(3)},
              ]}>
              UPCOMING EVENTS
            </Text>
            <EventsView onPress={EventsDetail} sliceSize={5} />
            <TouchableOpacity onPress={Events}>
             
              <Text
                style={[
                  AppStyles.forgot,
                  {fontFamily: fontFamily.LatoBold, alignSelf: 'center'},
                ]}>
                View All
              </Text>
            </TouchableOpacity>
            {modalVisible && (<AddCollection 
            isVisible={modalVisible}
            onBackdropPress={toggleCollection}
            //onChangeText={}
            //value={}
            onPress={toggleCollection}
            />)}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  text: {
    marginLeft: responsiveScreenWidth(10),
    marginTop: responsiveScreenHeight(10),
  },
  
 
  collection: {
    fontSize: fontSize.h1,
  },
  
  product: {
    height: responsiveScreenHeight(25),
  },
});
