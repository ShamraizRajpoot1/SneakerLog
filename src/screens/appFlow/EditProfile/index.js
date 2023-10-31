import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
  Dimensions
} from 'react-native';
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
import {Size} from '../../../components/Modals';
import * as ImagePicker from 'react-native-image-picker';
import {AuthContext} from '../../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImageResizer from 'react-native-image-resizer';
import Toast from 'react-native-toast-message';
import CustomToast from '../../../components/CustomToast';

const EditProfile = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [sizeModal, setSizeModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [sneakerBrands, setSneakerBrands] = useState('');
  const [sneakerSize, setSneakerSize] = useState([]);

  const showCustomToast = () => {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Update Successful',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
      text1Style: { height: responsiveScreenHeight(20) , fontWeight: 'bold', fontSize: 16, width: 200, marginVertical: responsiveScreenHeight(2) }, 
      text2Style: { width: 200 },
      customComponent: (
        <View style={{ height: responsiveScreenHeight(15) ,flexDirection: 'row', alignItems: 'center' }}>
          
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginVertical: responsiveScreenHeight(2) }}>Update Successful</Text>
            
          </View>
        </View>
      ),
    });
  };
  const toggleModal = () => {
    setSizeModal(prevModal => !prevModal);
  };

  const handleSelection = selectedOption => {
    setGender(selectedOption);
  };

  const container = {
    ...AppStyles.inputcontainer,
    height: responsiveHeight(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(3),
  };

  const update = () => {
    const docRef = firestore().collection('Users').doc(user.uid);

    docRef
      .update({
        name: name,
        userName: userName,
        gender: gender,
        sneakerSize: sneakerSize,
        profileImage: profileImage,
      })
      .then(() => {
        showCustomToast();
        navigation.goBack();
      })
      .catch(error => {
       
      });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docId = user.uid;
        const userDoc = await firestore().collection('Users').doc(docId).get();
        if (userDoc.exists) {
          const data = userDoc.data();
          setName(data.name || null);
          setUserName(data.userName || null);
          setEmail(data.email || null);
          setPhone(data.phone || null);
          setGender(data.gender || 'Male');
          setSneakerBrands(data.brandlist || null);
          setSneakerSize(data.sneakerSize || null);
          setProfileImage(data.profileImage || null);
        } else {
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };
  
    fetchUserData();
  }, [user]);
  useEffect(() => {
    const docId = user.uid;
    const userDocRef = firestore().collection('Users').doc(docId);

    const fetchUserData = async () => {
        try {
            const userDoc = await userDocRef.get();
            if (userDoc.exists) {
                const data = userDoc.data();
                setSneakerBrands(data.brandlist || null);
            }
        } catch (error) {
            console.error('Error fetching user data: ', error);
        }
    };

    fetchUserData(); 

    const unsubscribe = userDocRef.onSnapshot((doc) => {
        if (doc.exists) {
            const data = doc.data();
            setSneakerBrands(data.brandlist || null);
        }
    });

    return () => unsubscribe(); 
}, [user, firestore, setSneakerBrands]);

  
  

  const back = () => {
    navigation.goBack();
  };

  const brands = () => {
    navigation.navigate('Brands');
  };

  const manage = () => {
    navigation.navigate('ManageAccount');
  };

  const sizeGuide = () => {
    navigation.navigate('SizeGuide', {sneakerSize});
  };
  const pickImage = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
  
    ImagePicker.launchImageLibrary(options, async response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.assets && response.assets.length > 0) {
        const selectedAsset = response.assets[0];
        const source = { uri: selectedAsset.uri };
        const filename = selectedAsset.fileName;
        const resizedImage = await ImageResizer.createResizedImage(
          selectedAsset.uri,
          Dimensions.get('window').width / 1,
          Dimensions.get('window').height / 1,
          'JPEG',
          70,
        );
        const uploadUri = Platform.OS === 'ios' ? resizedImage.uri.replace('file://', '') : resizedImage.uri;
        const reference = storage().ref(`/Users/${filename}`);
  
        try {
          await reference.putFile(uploadUri);
          const url = await reference.getDownloadURL();
          setProfileImage(url);
        } catch (error) {
          console.error('Error in uploading image to the bucket:', error);
        }
      }
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.background}}>
      <Header onPress={back} />
      <ProfileHead
        cancel={true}
        update={true}
        cancelPress={back}
        updatePress={update}
      />

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
            <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
              {profileImage ? (
                <Image style={styles.image} source={{uri: profileImage}} />
              ) : (
                <Image style={styles.image} source={appIcons.profile} />
              )}
              <Text style={styles.imageText}>Change Profile Photo</Text>
            </TouchableOpacity>
            <View>
              <View style={AppStyles.marginVerticals}>
                <Text style={AppStyles.field}>MANAGE ACCOUNT</Text>
                <TouchableOpacity
                  onPress={manage}
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
                    <Text style={styles.editText}>Edit</Text>
                  </View>
                  <View style={{width: '10%'}}>
                    <Image
                      style={styles.arrowimage}
                      source={appIcons.arrowRight}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={AppStyles.marginVerticals}>
                <Text style={AppStyles.field}>NAME</Text>
                <Input value={name} onChangeText={setName} />
              </View>
              <View style={AppStyles.marginVerticals}>
                <Text style={AppStyles.field}>USERNAME</Text>
                <Input value={userName} onChangeText={setUserName} />
              </View>
              <View style={AppStyles.marginVerticals}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={AppStyles.field}>EMAIL</Text>
                  <View style={styles.privateContainer}>
                    <Text style={styles.private}>Private</Text>
                  </View>
                </View>
                <Input editable={false} value={email} />
              </View>
              <View style={AppStyles.marginVerticals}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={AppStyles.field}>Phone</Text>
                  <View style={styles.privateContainer}>
                    <Text style={styles.private}>Private</Text>
                  </View>
                </View>
               
                <Input editable={false} value={phone} />
              </View>
              <View style={AppStyles.marginVerticals}>
                <View style={AppStyles.textinputcontainer}>
                  <TouchableOpacity
                    style={[
                      AppStyles.touchable,
                      {
                        backgroundColor:
                          gender === 'Male'
                            ? Colors.barBackground
                            : Colors.fieldBackground,
                      },
                    ]}
                    onPress={() => handleSelection('Male')}>
                    <Text
                      style={[
                        styles.touchText,
                        {
                          color:
                            gender === 'Male' ? Colors.lebal : Colors.text2,
                        },
                      ]}>
                      Male
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      AppStyles.touchable,
                      {
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        backgroundColor:
                          gender === 'Female'
                            ? Colors.barBackground
                            : Colors.fieldBackground,
                      },
                    ]}
                    onPress={() => handleSelection('Female')}>
                    <Text
                      style={[
                        styles.touchText,
                        {
                          color:
                            gender === 'Female' ? Colors.lebal : Colors.text2,
                        },
                      ]}>
                      Female
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      AppStyles.touchable,
                      {
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderTopRightRadius: scale(6),
                        borderBottomRightRadius: scale(6),
                        backgroundColor:
                          gender === 'Other'
                            ? Colors.barBackground
                            : Colors.fieldBackground,
                      },
                    ]}
                    onPress={() => handleSelection('Other')}>
                    <Text
                      style={[
                        styles.touchText,
                        {
                          color:
                            gender === 'Other' ? Colors.lebal : Colors.text2,
                        },
                      ]}>
                      Other
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[AppStyles.marginVerticals, {marginLeft: 0}]}>
                <Text style={[AppStyles.field, {marginLeft: '5%'}]}>
                  FAVORITE SNEAKER BRANDS
                </Text>
                {Array.isArray(sneakerBrands) && sneakerBrands.length > 0 ? (
                  <FlatList
                  data={sneakerBrands}
                  horizontal={true}
                  keyExtractor={(item, index) => index.toString()} 
                  renderItem={({ item, index }) => {
                   
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
                ) : null}
                <TouchableOpacity
                  style={[AppStyles.addCollection, {marginTop: '2%'}]}
                  onPress={brands}>
                  <Image style={AppStyles.add} source={appIcons.add} />
                  <Text style={AppStyles.redtext}>
                    ADD A Favorite Sneaker Brand
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[AppStyles.marginVerticals]}>
                <Text style={[AppStyles.field]}>SNEAKER SIZE</Text>
                <TouchableOpacity
                  onPress={toggleModal}
                  style={styles.sizeContainer}>
                  <Text
                    style={[
                      AppStyles.fvrtText,
                      {color: Colors.text3, marginVertical: 0},
                    ]}>
                    {sneakerSize}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={AppStyles.marginVerticals}>
                <TouchableOpacity
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
              {sizeModal && (
                <Size
                  value={sneakerSize}
                  onBackdropPress={toggleModal}
                  onChange={setSneakerSize}
                  onPress={sizeGuide}
                />
              )}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
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
  arrowimage: {
    width: scale(15),
    height: scale(10),
  },
  sizeContainer: {
    marginTop: responsiveScreenHeight(1),
    width: responsiveScreenWidth(45),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: scale(1),
    height: responsiveScreenHeight(5),
    borderRadius: scale(3),
  },
});
