import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  Alert,
  BackHandler
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
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
import {appIcons} from '../../../services/utilities/Assets';
import {scale} from 'react-native-size-matters';
import Input from '../../../components/Input';
import DropDownPicker from 'react-native-dropdown-picker';
import CollectionHeader from '../../../components/CollectionHeader';
import {CollectionModal, Size} from '../../../components/Modals';
import {AuthContext} from '../../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import Toast from 'react-native-simple-toast';
import { useIsFocused } from '@react-navigation/native';

const Sneakers = ({navigation, route}) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backHandler.remove();
  }, []);
  const handleBackPress = () => {
    return true;
  };
  const {user} = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedColl, setSelectedColl] = useState([]);
  const [collection, setCollection] = useState(false);
  const [sizemodal, setSizemodal] = useState(false);
  const [image, setImage] = useState(null);
  const [sneakerName, setSneakerName] = useState('');
  const [brand, setBrand] = useState('');
  const [retailPrice, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [condition, setCondition] = useState('Used');
  const [sku, setSku] = useState('');
  const [colorway, setColorway] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState('');
  const [estimatedMarketValue, setEstimatedPrice] = useState('');
  const [style, setStyle] = useState('');
  const [releaseYear, setYear] = useState('');

  let favorite;

  if (selectedId) {
    favorite = selectedId.favorite;
  } else if (route?.params?.selectedCollection.favorite) {
    favorite = route.params.selectedCollection.favorite;
  } else {
    favorite = selectedColl.favorite;
  }
  
  let selectedCollection;

  if (selectedId) {
    selectedCollection = selectedId;
  } else if (route?.params?.selectedCollection) {
    selectedCollection = route.params.selectedCollection;
  } else {
    selectedCollection = selectedColl;
  }
  const upload = async () => {
    try {
      const uniqueId = '_' + Math.random().toString(36).substr(2, 9);

      if (
        !image ||
        !sneakerName ||
        !brand ||
        !retailPrice ||
        !size ||
        !condition ||
        !sku ||
        !colorway ||
        !quantity ||
        !status
      ) {
        Alert.alert('Please fill all fields');
        return;
      }
     // const timestamp = new Date();
      await firestore()
        .collection('Collections')
        .doc(selectedCollection.id)
        .update({
          sneakers: firestore.FieldValue.arrayUnion({
            id: uniqueId,
            estimatedMarketValue,
            style,
            image,
            name,
            brand,
            retailPrice,
            size,
            condition,
            sku,
            colorway,
            quantity,
            status,
            releaseYear,
           // timestamp: timestamp.toISOString(),
          }),
        });
      Toast.show('Sneaker Adedd Successfully', Toast.LONG);
      navigation.navigate('CollectionStack', {
        screen: 'Collections',
        params: {selectedCollection},
      });
    } catch (error) {
      console.error('Error uploading sneaker data to Firestore: ', error);
    }
  };
  useEffect(() => {
    if (isFocused) {
      setImage(null);
      setSneakerName('');
      setBrand('');
      setPrice('');
      setSize('');
      setCondition('Used');
      setSku('');
      setColorway('');
      setQuantity(1);
      setStatus('');
      setEstimatedPrice('');
      setStyle('');
      setYear('');
    }
  }, [isFocused]);
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const userId = user.uid;

        const collectionRef = firestore().collection('Collections');
        collectionRef.where('userId', '==', userId).onSnapshot(snapshot => {
          const fetchedCollections = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            const {collectionName, favorite, isPrivate, sneaker, price} = data;
            fetchedCollections.push({
              id: doc.id,
              name: collectionName,
              sneaker: sneaker,
              price: price,
              isPrivate: isPrivate,
              favorite: favorite
            });
          });

          if (!selectedId && fetchedCollections.length > 0) {
            setSelectedColl(fetchedCollections[0]);
          }
        });
      } catch (error) {
        console.error('Error fetching collections: ', error);
      }
    };

    fetchCollections();
  }, [selectedId]);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };
  const handleConditionSelection = selectedCondition => {
    setCondition(selectedCondition);
  };
  const setCollectionId = selectedItem => {
    setCollection(prev => !prev);
    setSelectedId(selectedItem);
  };
  const Profile = () => {
    navigation.navigate('Profile');
  };

  const toggle = () => {
    setCollection(prev => !prev);
  };
  const sizeToggle = () => {
    setSizemodal(prev => !prev);
  };
  const sizeGuide = () => {
    navigation.navigate('SizeGuide', {size});
  };

  const items = [
    {label: 'Purchased', value: 'Purchased'},
    {label: 'Sold', value: 'Sold'},
    {label: 'Want', value: 'Want'},
    {label: 'Holy Grail', value: 'Holy Grail'},
    {label: 'Gift', value: 'Gift'},
  ];
  const back = () => {
    navigation.goBack();
  };
  const touchable = {
    ...AppStyles.touchable,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
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
        const source = {uri: selectedAsset.uri};
        const filename = selectedAsset.fileName;

        const resizedImage = await ImageResizer.createResizedImage(
          selectedAsset.uri,
          Dimensions.get('window').width / 1,
          Dimensions.get('window').height / 1,
          'JPEG',
          70,
        );

        const uploadUri =
          Platform.OS === 'ios'
            ? resizedImage.uri.replace('file://', '')
            : resizedImage.uri;
        const reference = storage().ref(`/Sneakers/${filename}`);
        try {
          await reference.putFile(uploadUri);
          const url = await reference.getDownloadURL();
          setImage(url);
        } catch (error) {
          console.error('Error in uploading image to the bucket:', error);
        }
      }
    });
  };
  return (
    <>
      <Header Image={true} onPress={back} options={true} press={Profile} />

      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: Colors.background}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={[AppStyles.contentContainer]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <CollectionHeader
              Favorite={favorite}
              name={selectedCollection?.name}
              onPress={toggle}
            />
            <TouchableOpacity
              onPress={pickImage}
              style={[
                AppStyles.addCollection,
                {marginTop: responsiveHeight(3), height: responsiveHeight(20)},
              ]}>
              {image ? (
                <Image
                  style={[styles.image, {borderRadius: scale(10)}]}
                  source={{uri: image}}
                />
              ) : (
                <Image style={styles.image} source={appIcons.camera} />
              )}
              <Text style={styles.camtext}>Add Photo</Text>
            </TouchableOpacity>
            <View style={AppStyles.margin}>
              <Text style={AppStyles.field}>SNEAKER</Text>
              <Input value={sneakerName} onChangeText={setSneakerName} />
            </View>
            <View style={AppStyles.margin}>
              <Text style={AppStyles.field}>BRAND</Text>
              <Input value={brand} onChangeText={setBrand} />
            </View>
            <View style={AppStyles.margin}>
              <Text style={AppStyles.field}>PRICE</Text>
              <Input value={retailPrice} onChangeText={setPrice} />
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
                <TouchableOpacity
                  style={[
                    AppStyles.touchable,
                    condition === 'New'
                      ? {backgroundColor: Colors.barBackground}
                      : {},
                  ]}
                  onPress={() => handleConditionSelection('New')}>
                  <Text
                    style={[
                      AppStyles.touchText,
                      condition === 'New' ? {color: Colors.lebal} : {},
                    ]}>
                    New
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.touchable,
                    condition === 'Used'
                      ? {backgroundColor: Colors.barBackground}
                      : {},
                  ]}
                  onPress={() => handleConditionSelection('Used')}>
                  <Text
                    style={[
                      AppStyles.touchText,
                      condition === 'Used' ? {color: Colors.lebal} : {},
                    ]}>
                    Used
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={AppStyles.margin}>
              <Text style={AppStyles.field}>SKU</Text>
              <Input value={sku} onChangeText={setSku} />
            </View>
            <View style={AppStyles.margin}>
              <Text style={AppStyles.field}>COLORWAY</Text>
              <Input value={colorway} onChangeText={setColorway} />
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
                  style={[AppStyles.button1, {borderRadius: scale(5)}]}
                  onPress={decreaseQuantity}>
                  <Text style={[AppStyles.plus, {color: Colors.blackText}]}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={[AppStyles.touchText, {alignSelf: 'center'}]}>
                  {quantity}
                </Text>
                <TouchableOpacity
                  style={[
                    AppStyles.button1,
                    {
                      backgroundColor: Colors.barBackground,
                      borderRadius: scale(5),
                    },
                  ]}
                  onPress={increaseQuantity}>
                  <Text style={[AppStyles.plus, {color: Colors.lebal}]}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={AppStyles.margin}>
              <Text style={AppStyles.field}>SNEAKER STATUS</Text>
              <View style={styles.dropdownContainer}>
                <DropDownPicker
                  items={items.map((item, index) => ({
                    label: item.label,
                    value: item.value,
                    key: index.toString(),
                  }))}
                  arrowColor={Colors.blackText}
                  labelStyle={styles.label}
                  placeholder={' '}
                  dropDownMaxHeight={170}
                  containerStyle={AppStyles.dcontainer}
                  style={AppStyles.Dropdown}
                  setValue={value => setStatus(value)}
                  setOpen={() => setIsOpen(!isOpen)}
                  open={isOpen}
                  value={status}
                  dropDownStyle={AppStyles.dropDownStyle}
                />
              </View>
            </View>

            {collection && (
              <CollectionModal
                onBackdropPress={toggle}
                onPress={setCollectionId}
              />
            )}
            {sizemodal && (
              <Size
                onBackdropPress={sizeToggle}
                onChange={setSize}
                onPress={sizeGuide}
              />
            )}
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
          onPress={upload}
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
  dcontainer: {
    height: responsiveHeight(7),
    borderRadius: 5,
    width: responsiveWidth(90),
    marginTop: responsiveHeight(1),
  },
  Dropdown: {
    backgroundColor: Colors.fieldBackground,
    top: 2,
    borderRadius: scale(5),
    borderColor: Colors.bordor1,
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
    flexDirection: 'row',
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
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: '100%',
    borderTopRightRadius: scale(6),
    borderBottomRightRadius: scale(6),
  },
  image: {
    height: responsiveHeight(10),
    width: responsiveWidth(25),
  },
});
