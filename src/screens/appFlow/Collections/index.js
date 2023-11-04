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
  ActivityIndicator,
  BackHandler,Linking
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AppStyles} from '../../../services/utilities/AppStyles';
import Header from '../../../components/Header';
import {Colors} from '../../../services/utilities/Colors';
import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
import {
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {appIcons, appImages} from '../../../services/utilities/Assets';
import {scale} from 'react-native-size-matters';
import AddSneakers from '../../../components/AddSneakers';
import CollectionHeader from '../../../components/CollectionHeader';
import SearchBar from '../../../components/SearchBar';
import {CollectionModal, ShareApp} from '../../../components/Modals';
import firestore from '@react-native-firebase/firestore';
import RNFS from 'react-native-fs';
import Toast from 'react-native-simple-toast';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import Clipboard from '@react-native-clipboard/clipboard';
import RNShare from 'react-native-share';

const Collections = ({navigation, route}) => {
  const [data, setSneakersData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [share, setShare] = useState(false);
  const [filter, setFilter] = useState(false);
  const [collection, setCollection] = useState(false);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState([]);
  const selectedCollection = selectedId
    ? selectedId
    : route.params.selectedCollection;
const selectedCollectionfavorite = selectedCollection.favorite ? selectedCollection.favorite : null
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
useEffect(() => {
  const selectedCollectionId = route.params.selectedCollection.id;
  const collectionRef = firestore().collection('Collections').doc(selectedCollectionId);

  const unsubscribe = collectionRef.onSnapshot((doc) => {
    if (doc.exists) {
      const data = doc.data();
      setFavorite(data.favorite);
      const sneakers = data.sneakers || [];
      setSneakersData(sneakers);
      setLoading(false)
    } else {
      console.log('No such document!');
      setSneakersData([]);
    }
  });

  return () => unsubscribe();
}, [route.params.selectedCollection]);

  const back = () => {
    navigation.goBack();
  };
  const addProduct = () => {
    navigation.navigate('AddProduct', {selectedCollection, favorite});
  };
  const profile = () => {
    navigation.navigate('Profile');
  };
  const Sneakers = () => {
    navigation.navigate('SneakerStack', {
      screen: 'Sneakers',
      params: {selectedCollection, favorite},
    });
  };
  const Search = () => {
    navigation.navigate('SearchSneaker', {selectedCollection , favorite});
  };
  const details = (item, index) => {
    navigation.navigate('ProductDetails', {
      selectedCollection: selectedCollection,
      selectedItem: item,
      selectedIndex: index,
    });
  };
  const setCollectionId = selectedItem => {
    setCollection(prev => !prev);
    setSelectedId(selectedItem);
  };

  const toggle = () => {
    setCollection(prev => !prev);
  };
  const Shares = () => {
    setShare(prevShare => !prevShare);
  };
  const Filter = () => {
    setFilter(prevFilter => !prevFilter);
  };
  const [sneaker, setSneaker] = useState('');
  const renderItem = ({item, index}) => (
    <View>
      <TouchableOpacity
        style={AppStyles.collection}
        onPress={() => details(item, index)}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {item.image &&item.image.small ? (
        <Image
          source={{ uri: item.image.small }}
          style={AppStyles.productImage}
        />
      ) : item.image && typeof item.image === 'string' && (
        <Image source={{ uri: item.image }} style={AppStyles.productImage} />
      ) }
          <Text style={[styles.name]}>
        {item.name.length > 17 ? item.name.substring(0, 18) + '...' : item.name}
      </Text>
        </View>
        <View style={AppStyles.priceContainer}>
          <Text style={styles.price}>${item.retailPrice}</Text>
          <Image style={AppStyles.arrowRight} source={appIcons.arrowRight} />
        </View>
      </TouchableOpacity>
      {index < data.length - 1 && <View style={AppStyles.line} />}
    </View>
  );
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(sneaker.toLowerCase()),
  );
  const Favorite = () => {
    if (favorite === true) {
      firestore()
        .collection('Collections')
        .doc(selectedCollection.id)
        .update({
          favorite: false
        })
        .then(() => {
          setFavorite(false);
        })
        .catch(error => {
          console.error('Error updating collection as not favorite: ', error);
        });
    } else {
      firestore()
        .collection('Collections')
        .doc(selectedCollection.id)
        .update({
          favorite: true
        })
        .then(() => {
          setFavorite(true);
        })
        .catch(error => {
          console.error('Error updating collection as favorite: ', error);
        });
    }
  };
  
  const SpreadSheet = () => {
    try {
     
  
      let sheetData = data.map((item) => ({
        ID: item.Id || '',
        EstimatedPrice: item.estimatedPrice || '',
        Style: item.style || '',
        SneakerName: item.name || '',
        Brand: item.brand || '',
        Price: item.price || '',
        Size: item.size || '',
        Condition: item.condition || '',
        SKU: item.sku || '',
        Colorway: item.colorway || '',
        Quantity: item.quantity || '',
        Status: item.status || '',
        Year: item.year || '',
      }));
      const ws = XLSX.utils.json_to_sheet(sheetData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sneaker Collection');
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
      const downloadsPath = RNFS.DownloadDirectoryPath + `/${selectedCollection.name}.xlsx`;
      RNFS.writeFile(downloadsPath, wbout, 'ascii')
      
        .then(() => {
          console.log('Spreadsheet created at path:', downloadsPath);
          Toast.show('File Download Successfully', Toast.LONG);
          Share.open({
          url: `file://${downloadsPath}`,
          mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          failOnCancel: false,
        })
          Shares()
          
        })
        .catch((error) => {
          console.error('Error creating spreadsheet: ', error);
        });
    } catch (error) {
      console.error('Error generating spreadsheet: ', error);
    }
  };
 
  const ShareCollection = async () => {
    try {
      const uploadedFileURL = await uploadFile();
  
      const result = await Share.open({
      title: 'Share Sneaker Collection',
      message: 'Check out my Sneaker Collection!',
      url: uploadedFileURL,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log(`Shared with ${result.activityType}`);
      } else {
        console.log('Shared');
      }
    } else if (result.action === Share.dismissedAction) {
      console.log('Sharing dismissed');
    }
    Shares()
  } catch (error) {
    Shares()
    console.error('Error generating and sharing link:', error);
  }
  };
  
  const uploadFile = async () => {
    const currentCol = this.state?.CurrentCol || '';
    const uploadedFileURL = `sneakerlog://App/Home/UserCollectionDetailslink/${selectedCollection.id}/${currentCol}`;
    return uploadedFileURL;
  };
  const copyLink = async () => {
    const link = `sneakerlog://App/Home/UserCollectionDetailslink/${selectedCollection.id}`;
  
    try {
      await Clipboard.setString(link);
      console.log('Link copied to clipboard:', link);
      Shares()
    } catch (error) {
      console.error('Error copying link to clipboard:', error);
    }
  };
  return (
    <>
      <Header Image={true} onPress={back} options={true} press={profile} />

      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: Colors.background}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
        <TouchableWithoutFeedback>
          {loading ? (
            <ActivityIndicator
              style={AppStyles.loadingIndicator}
              size="large"
              color={Colors.primary}
            />
          ) : (
            <ScrollView
              style={{flex: 1}}
              contentContainerStyle={[AppStyles.contentContainer]}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <CollectionHeader
              Favorite = {favorite}
              press={Favorite}
                name={selectedCollection.name}
                onPress={toggle}
              />
              {data.length === 0 ? (
                <View>
                  <View style={styles.textContainer}>
                    <Text style={styles.emptyText}>
                      YOUR COLLECTION IS EMPTY.
                    </Text>
                    <Text style={styles.letsdo}>
                      Let's do Something about that!
                    </Text>
                  </View>
                  <AddSneakers onPress={Sneakers} press={Search} />
                  {collection && (
                    <CollectionModal
                      onBackdropPress={toggle}
                      onPress={setCollectionId}
                    />
                  )}
                </View>
              ) : (
                <>
                  {filter ? (
                    <View style={styles.row}>
                      <View style={{width: responsiveScreenWidth(80)}}>
                        <SearchBar onChangeText={setSneaker} value={sneaker} />
                      </View>
                      <TouchableOpacity onPress={Filter}>
                        <Text style={styles.cancel}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View
                      style={[
                        AppStyles.row2,
                        {
                          marginTop: responsiveHeight(3),
                          marginBottom: responsiveHeight(3),
                        },
                      ]}>
                      <View style={styles.iconContaier}>
                        {selectedCollection.isPrivate ? (
                          <View style={styles.iconContaier}>
                            <Image
                              style={[
                                styles.icon,
                                {marginLeft: responsiveWidth(2)},
                              ]}
                              source={appIcons.pvt}
                            />
                            <Text
                              style={[
                                AppStyles.resultText,
                                {marginLeft: responsiveWidth(2)},
                              ]}>
                              Private
                            </Text>
                          </View>
                        ) : null}
                      </View>
                      <View style={styles.iconContaier}>
                        <TouchableOpacity onPress={Shares}>
                          <Image
                            style={[
                              styles.icon,
                              {width: scale(17), height: scale(22)},
                            ]}
                            source={appIcons.upload}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={Filter}>
                          <Image
                            style={[
                              styles.icon,
                              {width: scale(18), height: scale(22)},
                            ]}
                            source={appIcons.filter}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={addProduct}>
                          <Image
                            style={[
                              styles.icon,
                              {width: scale(22), height: scale(22)},
                            ]}
                            source={appIcons.add}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  <View style={[AppStyles.collectionContainer, {marginTop: 0}]}>
                    {filteredData.length > 0 ? (
                      <FlatList
                        scrollEnabled={false}
                        data={filteredData}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    ) : (
                      <View style={{alignSelf: 'center'}}>
                        <Text style={AppStyles.emptyText}>No Sneaker</Text>
                      </View>
                    )}
                    {collection && (
                      <CollectionModal
                        onBackdropPress={toggle}
                        onPress={setCollectionId}
                      />
                    )}
                    {share && (
                      <ShareApp isVisible={share} onBackdropPress={Shares} press={copyLink} onPress={ShareCollection} onClick={SpreadSheet}/>
                    )}
                  </View>
                </>
              )}
            </ScrollView>
          )}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default Collections;

const styles = StyleSheet.create({
  text: {
    color: Colors.blackText,
    fontSize: fontSize.h3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: responsiveScreenWidth(7),
  },
  textContainer: {
    alignItems: 'center',
  },
  emptyText: {
    fontSize: fontSize.h2,
    fontFamily: fontFamily.LatoBold,
    color: Colors.blackText,
  },
  letsdo: {
    fontSize: fontSize.h3,
    color: Colors.blackText,
  },
  icon: {
    width: scale(30),
    height: scale(30),
    marginLeft: responsiveWidth(6),
  },
  iconContaier: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  name: {
    fontSize: fontSize.lebal,
    color: Colors.blackText,
    marginLeft: responsiveWidth(2),
  },
  cancel: {
    fontSize: fontSize.usernameText,
    fontFamily: fontFamily.LatoBold,
    color: Colors.forgot,
  },
  price:{
    fontSize: fontSize.lebal,
  }
});
