import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
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
import {AuthContext} from '../../../navigation/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
const Profile = ({navigation}) => {
  const {logout, user} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  if (userData && !userData.gender) {
    userData.gender = '';
  }
  useEffect(() => {
    const docId = user.uid;
    const docRef = firestore().collection('Users').doc(docId);

    const unsubscribe = docRef.onSnapshot(doc => {
      if (doc.exists) {
        setUserData({Id: doc.id, ...doc.data()});
      } else {
      }
    });
    return () => unsubscribe();
  }, [user]);

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
  const Logout = async () => {
    try {
      await AsyncStorage.removeItem('Token');
      logout();
      navigation.navigate('Auth', {screen: 'Login'});
    } catch (error) {
      console.error('Error getting Token from AsyncStorage:', error);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.background}}>
      <Header Image={true} onPress={back} />
      <ProfileHead edit={true} onPress={edit} />
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: Colors.background}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
        <TouchableWithoutFeedback>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={[AppStyles.contentContainer]}
            showsVerticalScrollIndicator={false}>
            {userData && (
              <View>
                <View style={styles.imageContainer}>
                  {userData.profileImage ? (
                    <Image
                      style={styles.image}
                      source={{uri: userData.profileImage}}
                    />
                  ) : (
                    <Image style={styles.image} source={appIcons.profile} />
                  )}
                </View>
                <View>
                  <View style={AppStyles.marginVerticals}>
                    <Text style={styles.field}>NAME</Text>
                    <Text style={styles.textValue}>{userData.name}</Text>
                  </View>
                  <View style={AppStyles.marginVerticals}>
                    <Text style={styles.field}>USERNAME</Text>
                    <Text style={styles.textValue}>{userData.userName}</Text>
                  </View>
                  <View style={AppStyles.marginVerticals}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.field}>EMAIL</Text>
                      <View style={styles.privateContainer}>
                        <Text style={styles.private}>Private</Text>
                      </View>
                    </View>
                    <Text style={styles.textValue}>{userData.email}</Text>
                  </View>
                  <View style={AppStyles.marginVerticals}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.field}>Phone</Text>
                      <View style={styles.privateContainer}>
                        <Text style={styles.private}>Private</Text>
                      </View>
                    </View>

                    <Text style={styles.textValue}>{userData.phone}</Text>
                  </View>
                  <View style={AppStyles.marginVerticals}>
                    <View style={styles.textinputcontainer}>
                      <View
                        style={[
                          styles.touchable,
                          {
                            backgroundColor:
                              userData.gender === 'Male'
                                ? Colors.barBackground
                                : Colors.fieldBackground,
                                borderTopLeftRadius: scale(6),
                                borderBottomLeftRadius: scale(6),
                          },
                        ]}>
                        <Text
                          style={[
                            styles.touchText,
                            {
                              color:
                                userData.gender === 'Male'
                                  ? Colors.lebal
                                  : Colors.text2,
                            },
                          ]}>
                          Male
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.touchable,
                          {
                            backgroundColor:
                              userData.gender === 'Female'
                                ? Colors.barBackground
                                : Colors.fieldBackground,
                                
                          },
                        ]}>
                        <Text
                          style={[
                            styles.touchText,
                            {
                              color:
                                userData.gender === 'Female'
                                  ? Colors.lebal
                                  : Colors.text2,
                            },
                          ]}>
                          Female
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.touchable,
                          {
                            backgroundColor:
                              userData.gender === 'Others'
                                ? Colors.barBackground
                                : Colors.fieldBackground,
                                borderTopRightRadius: scale(6),
                                borderBottomRightRadius: scale(6),
                          },
                        ]}>
                        <Text
                          style={[
                            styles.touchText,
                            {
                              color:
                                userData.gender === 'Other'
                                  ? Colors.lebal
                                  : Colors.text2,
                            },
                          ]}>
                          Other
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[AppStyles.marginVerticals,{marginLeft:0 ,}]}>
                    <Text style={[styles.field,{marginLeft:responsiveWidth(5) ,}]}>FAVORITE SNEAKER BRANDS</Text>

                    {Array.isArray(userData.brandlist) &&
                    userData.brandlist.length > 0 ? (
                      <FlatList
                        data={userData.brandlist}
                        horizontal={true}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => {
                          
                          return (
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={AppStyles.brandlist}>
                                <Image
                                  style={{
                                    height: responsiveHeight(5),
                                    width: responsiveWidth(7),
                                    resizeMode: 'contain',
                                  }}
                                  source={{uri: item.image}}
                                />
                              </View>
                            </View>
                          );
                        }}
                      />
                    ) : (
                      <Text style={[styles.textValue,{marginLeft: '5%'}]}>No Brands Selected</Text>
                    )}
                  </View>
                  <View style={AppStyles.marginVerticals}>
                    <Text style={styles.field}>SNEAKER SIZE</Text>
                    {userData.sneakerSize ? (
                      <Text style={styles.textValue}>
                        {userData.sneakerSize}
                      </Text>
                    ) : (
                      <Text style={styles.textValue}>No Size Selected</Text>
                    )}
                  </View>
                  <View style={AppStyles.marginVerticals}>
                    <TouchableOpacity
                      onPress={Logout}
                      style={[
                        container,
                        {flexDirection: 'row', justifyContent: 'space-between'},
                      ]}>
                      <View
                        style={{
                          width: '80%',
                          alignItems: 'center',
                          marginLeft: '10%',
                        }}>
                        <Text style={styles.editText}>Log Out</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
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
