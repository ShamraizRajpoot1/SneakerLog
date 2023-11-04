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
import React, {useState, useContext, useEffect} from 'react';
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
import {AddCollection} from '../../../components/Modals';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../../navigation/AuthProvider';

const ChoseCollection = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const collection = selectedCollection => {
    navigation.navigate('Collections', {selectedCollection});
  };
  const Product = selectedCollection => {
    navigation.navigate('Collections', {selectedCollection});
  };
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
  const [collections, setCollections] = useState([]);
  const [sneakerCount, setSneakerCount] = useState(0);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const userId = user.uid;

        const collectionRef = firestore().collection('Collections');
        collectionRef.where('userId', '==', userId).onSnapshot((snapshot) => {
          const fetchedCollections = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            const { collectionName, isPrivate, sneakers,favorite, price } = data;
            const sneakerCount = sneakers ? sneakers.length : 0; 
            fetchedCollections.push({
              id: doc.id,
              name: collectionName,
              sneakers: sneakers || [],
              price: price,
              isPrivate: isPrivate,
              sneakerCount: sneakerCount, 
              favorite: favorite || null
            });
          });

          setCollections(fetchedCollections);
        });
      } catch (error) {
        console.error('Error fetching collections: ', error);
      }
    };

    fetchCollections();
  }, []);

  const renderItem = ({item, index}) => (
    <View>
      <TouchableOpacity
        onPress={() => collection(item)}
        style={[
          AppStyles.collection,
          {marginHorizontal: responsiveScreenWidth(5)},
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {item.favorite ? <Image
            source={appIcons.star}
            style={{
              width: scale(25),
              height: scale(25),
              marginVertical: responsiveScreenHeight(2),
            }}
          /> : 
          <Image
            source={appIcons.starUnselected}
            style={{
              width: scale(25),
              height: scale(25),
              marginVertical: responsiveScreenHeight(2),
            }}
          />} 
          <View style={{marginLeft: responsiveScreenWidth(4)}}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.sneakerCount}>
                {item.sneakerCount} Sneakers in Collection
              </Text>
              {item.isPrivate === true && (
                <Image
                  source={appIcons.pvt}
                  style={{
                    width: scale(18),
                    height: scale(18),
                    marginLeft: responsiveWidth(2),
                  }}
                />
              )}
            </View>
          </View>
        </View>

        <Image style={AppStyles.arrowRight} source={appIcons.arrowRight} />
      </TouchableOpacity>
      {index < collections.length - 1 && (
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
                  data={collections}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
                />
              </ScrollView>
            </View>
            <View>
              {modalVisible && (
                <AddCollection
                  isVisible={modalVisible}
                  onBackdropPress={toggleCollection}
                  //onChangeText={}
                  //value={}
                  onPress={Product}
                />
              )}
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
    paddingHorizontal: responsiveScreenWidth(7),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveScreenHeight(2.5),
    paddingBottom: responsiveScreenHeight(2.5),
    borderBottomWidth: responsiveScreenWidth(0.15),
  },
  name: {
    color: Colors.text3,
    fontFamily: fontFamily.LatoBold,
    marginLeft: responsiveWidth(4),
    fontSize:fontSize.fieldText
  },
  sneakerCount: {
    color: Colors.blackText,
    fontSize: fontSize.fieldText,
    marginLeft: responsiveWidth(4),
  },
});
