import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AppStyles} from '../../../services/utilities/AppStyles';
import Header from '../../../components/Header';
import {Colors} from '../../../services/utilities/Colors';
import {appIcons, appImages} from '../../../services/utilities/Assets';
import {
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {scale} from 'react-native-size-matters';
import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
import CollectionHeader from '../../../components/CollectionHeader';
import {AuthContext} from '../../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { CollectionModal } from '../../../components/Modals';

const UserCollection = ({navigation, route}) => {
  const {user} = useContext(AuthContext);
  const [collectionData, setData] = useState([]);
  const [data, setSneakersData] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [collection, setCollection] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const selectedUserData = route.params.selectedUserData
 
  const selectedCollection = selectedId ? selectedId : route.params.selectedCollection;
   
  useEffect(() => {
    const fetchFirestoreData = async () => {
      setIsLoading(true); 
      if (selectedUserData?.followersData.find(item => item.Id === user.uid)) {
        setIsFollowing(true);
      }
      try {
        if (selectedCollection) {
          const selectedCollectionId = selectedCollection.id;
          const collectionRef = firestore()
            .collection('Collections')
            .doc(selectedCollectionId);
          const doc = await collectionRef.get();
          if (doc.exists) {
            const data = doc.data();
            const sneakers = data.sneakers || 0;
            setSneakersData(sneakers);
          }
        } else {
          setSneakersData([]);
        }
        setIsLoading(false); 
      } catch (error) {
        console.error('Error fetching Firestore data: ', error);
        setIsLoading(false); 
      }
    };

    fetchFirestoreData();
  }, [route.params.selectedCollection, selectedId]);
  useEffect(() => {
    const fetchCollections = async () => {
      setIsLoading(true); 
      try {
        const collectionRef = firestore().collection('Collections');
        collectionRef
          .where('userId', '==', selectedUserData.userId)
          .onSnapshot(snapshot => {
            let count = 0; 
            const fetchedCollections = [];
            snapshot.forEach(doc => {
              const data = doc.data();
              const { collectionName, isPrivate, sneakers, userId } = data;
              fetchedCollections.push({
                id: doc.id,
                userId:userId,
                name: collectionName,
                sneaker: sneakers,
                isPrivate: isPrivate,
              });
              count += sneakers ? sneakers.length : 0;
            });

            setData(fetchedCollections);
           
            
          });
          setIsLoading(false); 
      } catch (error) {
        console.error('Error fetching collections: ', error);
        setIsLoading(false); 
      }
    };

    fetchCollections();
  }, [selectedUserData]);
  const toggle = () => {
    setCollection(prev => !prev);
  };
  const setCollectionId = (selectedItem) => {
    setCollection(prev => !prev);
    setSelectedId(selectedItem);
  };
  const profile = () => {
    navigation.navigate('Profile');
  };
  const back = () => {
    navigation.goBack();
  };
  const renderItem = ({item, index}) => (
    <View>
      <TouchableOpacity style={[AppStyles.collection, {width: '80%'}]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={{uri: item.image}} style={AppStyles.productImage} />
          <Text style={styles.name}>{item.sneakerName}</Text>
        </View>
        <View style={AppStyles.priceContainer}>
          <Text>${item.price}</Text>
        </View>
      </TouchableOpacity>
      {index < data.length && <View style={[AppStyles.line,{marginHorizontal:0}]} />}
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
        {isLoading ? ( 
              <ActivityIndicator style={AppStyles.loadingIndicator} size="large" color={Colors.primaryColor} />
            ) :
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={[AppStyles.contentContainer]}
            keyboardShouldPersistTaps="handled">
            <View style={styles.profileContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  height: '100%',
                  alignItems: 'center',
                }}>
                {selectedUserData.profileImage ? (
                  <Image
                    style={styles.image}
                    source={{uri: selectedUserData.profileImage}}
                  />
                ) : (
                  <Image style={styles.image} source={appIcons.profile} />
                )}
                <View style={{marginLeft: responsiveWidth(5)}}>
                  <Text style={[styles.name]}>{selectedUserData.name}</Text>
                  <Text
                    style={[
                      styles.additionalText,
                      {marginTop: responsiveScreenHeight(0.5)},
                    ]}>
                    {selectedUserData.userName}
                  </Text>
                </View>
              </View>
              {isFollowing ? (
                <View style={styles.followContainer}>
                  <Text
                    style={[
                      AppStyles.userHorizontalText,
                      {color: Colors.forgot, marginTop: 0},
                    ]}>
                    Following
                  </Text>
                </View>
              ) : (
                <TouchableOpacity style={styles.followContainer}>
                  <Text
                    style={[
                      AppStyles.userHorizontalText,
                      {color: Colors.forgot, marginTop: 0},
                    ]}>
                    Follow
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <CollectionHeader name={selectedCollection.name} onPress={toggle} />
            {data !== 0 ? (
              <View
                style={[
                  styles.collectionContainer,
                  {
                    height: responsiveScreenHeight(35),
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <FlatList
                  scrollEnabled={false}
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            ) : (
              <View
                style={[
                  styles.collectionContainer,
                  {
                    height: responsiveScreenHeight(35),
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <Text style={styles.emptyText}>No Sneaker</Text>
              </View>
            )}
             {collection && (
              <CollectionModal
                onBackdropPress={toggle}
                onPress={setCollectionId}
                data={collectionData}
              />
            )}
          </ScrollView> }
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default UserCollection;

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: '4%',

    borderBottomWidth: responsiveScreenWidth(0.1),
  },
  image: {
    borderRadius: scale(100),
    height: scale(70),
    width: scale(70),
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
