import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
  AppState,
  ActivityIndicator
} from 'react-native';
import Header from '../../../components/Header';
import {AppStyles} from '../../../services/utilities/AppStyles';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../../services/utilities/Colors';
import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
import CollectionHeader from '../../../components/CollectionHeader';
import SearchBar from '../../../components/SearchBar';
import {appIcons, appImages} from '../../../services/utilities/Assets';
import {CollectionModal} from '../../../components/Modals';
import { scale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';

const SearchSneaker = ({navigation, route}) => {
  const [data, setSneakersData] = useState([]);
  const [sneaker, setSneaker] = useState('');
  const [search, setSearch] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [collection, setCollection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const favorite = route.params.favorite;
  const selectedCollection = selectedId
    ? selectedId
    : route.params.selectedCollection;
  const [data2, setData2] = useState([]);
  const fetchFirestoreData = async () => {
     
    try {
      if (selectedCollection) {
        const selectedCollectionId = selectedCollection.id;
        const collectionRef = firestore()
          .collection('Collections')
          .doc(selectedCollectionId);
        const doc = await collectionRef.get();

        if (doc.exists) {
          const data = doc.data();
          
          const sneakers = data.sneakers || [];
          setSneakersData(sneakers);
        } else {
          console.log('No such document!');
          setSneakersData([]);
        }
      }
      
    } catch (error) {
      console.error('Error fetching Firestore data: ', error);
     
    }
  };

  useEffect(() => {
    GetDataFromApi();
    fetchFirestoreData();
  }, [sneaker]);
  const addSneaker = async (selectedItem) => {
    
    const { image, ...rest } = selectedItem;
    const updatedImage = {
      original: image.original,
      small: image.small,
      thumbnail: image.thumbnail,
    };
  
    const updatedSelectedItem = {
      ...rest,
      image: updatedImage,
    };
    setIsLoading(true);
    try {
      await firestore()
        .collection('Collections')
        .doc(selectedCollection.id)
        .update({
          sneakers: firestore.FieldValue.arrayUnion(updatedSelectedItem),
        });
        fetchFirestoreData();
        setIsLoading(false);
    } catch (error) {
      console.error('Error updating collection: ', error);
      setIsLoading(false);
    }
  };
  
  async function GetDataFromApi() {
    try {
      setIsLoading(true);
      let response = await fetch(
        'https://the-sneaker-database.p.rapidapi.com/sneakers?limit=20&&name=' +
          sneaker,
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key':
              '620bbcea62msh6543700f8450844p125a83jsn1996b91bedea',
            'X-RapidAPI-Host': 'the-sneaker-database.p.rapidapi.com',
          },
        },
      );

      let data = await response.json();
      if (data && data.results && data.results.length > 0) {
        console.log('====================================');
        console.log(data.results);
        console.log('====================================');
        setData2(data.results);
        setSearch(true);
      } else {
        setData2([]);
        setSearch(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data from API: ', error);
    }
  }
  const setCollectionId = selectedItem => {
    setCollection(prev => !prev);
    setSelectedId(selectedItem);
  };

  const toggle = () => {
    setCollection(prev => !prev);
  };

  const handleClearText = () => {
    setSneaker('');
    setSearch(false);
  };

  const back = () => {
    navigation.goBack();
  };

  const profile = () => {
    navigation.navigate('Profile');
  };

  const renderItem = ({ item }) => {
    const isExisting = data.some(
      (sneaker) => sneaker.id === item.id
    );
  
    return (
      <>
      <TouchableOpacity style={AppStyles.collection}>
        <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center' }}>
          {item.image ? (
            <Image
              source={{ uri: item.image.small }}
              style={AppStyles.productImage}
            />
          ) : (
            <View style={AppStyles.productImage} />
          )}
          <Text style={[styles.name]}>{item.name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => addSneaker(item)}
          style={[
            AppStyles.priceContainer,
            { width: '10%', justifyContent: 'center' },
          ]}
        >
          {isExisting ? (
            <Image
              source={appIcons.greenCheck}
              style={{ width: scale(18), height: scale(18) }}
            />
          ) : (
            <Image
              source={appIcons.add}
              style={{ width: scale(18), height: scale(18) }}
            />
          )}
        </TouchableOpacity>
       
      </TouchableOpacity>
       <View style={[AppStyles.line]} />
       </>
    );
  };
  

  return (
    <>
      <Header Image={true} onPress={back} options={true} press={profile} />

      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: Colors.background}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
        <TouchableWithoutFeedback>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={[AppStyles.contentContainer]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <CollectionHeader
              Favorite={favorite}
              name={selectedCollection.name}
            />

            <SearchBar
              Text={'Search Sneakers'}
              value={sneaker}
              onChangeText={setSneaker}
              //onBlur={Search}
              onClearText={handleClearText}
              clear={true}
            />{isLoading ? (
              <ActivityIndicator style={AppStyles.loadingIndicator} size="large" color={Colors.primary} /> 
            ) : search ? (
              <View style={AppStyles.collectionContainer}>
                <View  style={styles.result}>
                  <Text style={AppStyles.resultText}>Results</Text>
                </View>
                <FlatList
                  scrollEnabled={false}
                  data={data2}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
                />
                <View
                  style={[
                    styles.result,
                  ]}></View>
              </View>
            ) : (
              <View style={styles.container}>
                <Text style={[styles.text]}>
                  {'   '}QUICKLY ADD SNEAKERS {'\n'} TO YOUR COLLECTION BY{' '}
                  {'\n'} SEARCHING OUR INVENTORY
                </Text>
                <Text style={[styles.text2]}>
                  If you cannot find the sneaker, {'\n'} {'   '}you can add it
                  manually
                </Text>
                {collection && (
                  <CollectionModal
                    onBackdropPress={toggle}
                    onPress={setCollectionId}
                  />
                )}
              </View>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default SearchSneaker;

const styles = StyleSheet.create({
  text: {
    color: Colors.blackText,
    fontSize: fontSize.h2,
    fontFamily: fontFamily.LatoBold,
    fontWeight: 'bold',
    alignContent: 'center',
  },
  text2: {
    color: Colors.blackText,
    fontSize: fontSize.h1,
    fontFamily: fontFamily.LatoBold,
    marginTop: responsiveHeight(4),
    alignContent: 'center',
  },
  container: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  name: {
    color: Colors.blackText,
    marginLeft: responsiveWidth(4),
  },
  result: {
    height: responsiveHeight(6),
    borderBottomWidth: responsiveHeight(0.1),
    justifyContent: 'center',
    paddingLeft: responsiveWidth(2),
    borderColor: Colors.border1,
  },
});
