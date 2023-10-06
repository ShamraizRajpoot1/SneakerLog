import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import Header from '../../../components/Header';
import {AppStyles} from '../../../services/utilities/AppStyles';
import {appImages, appIcons} from '../../../services/utilities/Assets';
import {scale} from 'react-native-size-matters';
import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
import {Colors} from '../../../services/utilities/Colors';
import {
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const UserDetails = ({navigation}) => {
  const data = [
    {id: 1, name: 'Collection 1',  image: appIcons.star},
    {id: 2, name: 'Collection 2',  image: appIcons.star},
    {id: 3, name: 'Collection 3',  image: appIcons.star},
  ];
  const userCollection =() =>{
    navigation.navigate('UserCollection')
  }
  const profile = () => {
    navigation.navigate('Profile');
  };
  const back = () => {
    navigation.goBack();
  };
  const renderItem = ({item, index}) => (
    <View>
      <TouchableOpacity style={AppStyles.collection} onPress={userCollection}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: '4%',
          }}>
          <Image
            source={item.image}
            style={{width: scale(25), height: scale(25)}}
          />
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <View style={AppStyles.priceContainer}>
          <Image style={AppStyles.arrowRight} source={appIcons.arrowRight} />
        </View>
      </TouchableOpacity>
      <View style={[AppStyles.line, {marginHorizontal: 0}]} />
    </View>
  );
  return (
    <>
      <Header options={true} Image={true} onPress={back} press={profile} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
        <TouchableWithoutFeedback>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={[AppStyles.contentContainer]}
            keyboardShouldPersistTaps="handled">
            <View style={styles.profileContainer}>
              <Image style={styles.image} source={appImages.member1} />
              <Text style={[styles.name]}>name</Text>
              <Text style={styles.additionalText}>Additional</Text>
              <TouchableOpacity style={styles.followContainer}>
                <Text
                  style={[
                    AppStyles.userHorizontalText,
                    {color: Colors.forgot, marginTop: 0},
                  ]}>
                  Follow
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <View style={styles.sneakerContainer}>
                <Text style={styles.name}>0</Text>
                <Text style={styles.name}>SNEAKERS</Text>
              </View>
              <View style={styles.sneakerContainer}>
                <Text style={styles.name}>1</Text>
                <Text style={styles.name}>COLLECTIONS</Text>
              </View>
              <View style={styles.sneakerContainer}>
                <Text style={styles.name}>5</Text>
                <Text style={styles.name}>FOLLOWERS</Text>
              </View>
              <View style={styles.sneakerContainer}>
                <Text style={styles.name}>5</Text>
                <Text style={styles.name}>FOLLOWING</Text>
              </View>
            </View>
            {data.length === 0 ? (
              <View
                style={[
                  styles.collectionContainer,
                  {height: responsiveScreenHeight(35), alignItems:'center', justifyContent:'center'},
                ]}>
                    <Text style={styles.emptyText}>No items</Text>
                </View>
            ) : (
              <View style={styles.collectionContainer}>
                <FlatList
                  scrollEnabled={false}
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
                />
                <View style={{height: responsiveHeight(7)}}></View>
              </View>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  profileContainer: {
    marginTop: responsiveScreenHeight(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderRadius: scale(100),
    height: scale(90),
    width: scale(90),
  },
  name: {
    marginTop: responsiveHeight(0.5),
    fontFamily: fontFamily.LatoHeavy,
    textAlignVertical: 'center',
    marginHorizontal: 2.5,
    color: Colors.blackText,
    fontSize: fontSize.usernameText,
  },
  additionalText: {
    fontSize: fontSize.userName,
    fontFamily: fontFamily.LatoMedium,
    color: Colors.username,
  },
  followContainer: {
    marginTop: responsiveHeight(1),
    width: responsiveWidth(19),
    height: responsiveHeight(3.5),
    borderWidth: scale(1),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.barBackground,
  },
  row: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(2),
  },
  sneakerContainer: {
    alignItems: 'center',
  },
  collectionContainer: {
    borderWidth: responsiveScreenWidth(0.5),
    marginTop: responsiveHeight(2),
    width: '90%',
    alignSelf: 'center',
    borderRadius: scale(6),
    borderColor: Colors.border1,
  },
  emptyText: {
    fontSize: fontSize.h2,
    fontFamily: fontFamily.LatoBold,
    color: Colors.blackText,
  },
});
