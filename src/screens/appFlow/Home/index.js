import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  BackHandler
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {AppStyles} from '../../../services/utilities/AppStyles';
import {Colors} from '../../../services/utilities/Colors';
import Header from '../../../components/Header';
import {scale} from 'react-native-size-matters';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
import {appIcons} from '../../../services/utilities/Assets';
import ProductView from '../../../components/ProductView';
import UserView from '../../../components/UserView';
import EventsView from '../../../components/EventsView';
import {AddCollection} from '../../../components/Modals';
import Comunity from '../Community';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../../navigation/AuthProvider';

const Home = ({navigation}) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backHandler.remove();
  }, []);
  const handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  };
  const {user} = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showTopTab, setShowTopTab] = useState(false);
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const [followerUsers, setFollowerUsers] = useState([]);
  const [sneakers, setSneakers] = useState([]);
  
  useEffect(() => {
    const fetchFollowersData = async () => {
      try {
        const doc = await firestore().collection('Users').doc(user.uid).get();
        const userData = doc.data();
        if (userData && userData.followersData) {
          setFollowerUsers(userData.followersData);
        }
      } catch (error) {
        console.error('Error fetching followers data: ', error);
      }
    };
    fetchFollowersData();
  }, []);
  useEffect(() => {
    const fetchSneakers = async followerId => {
      try {
        const fetchedSneakers = [];
        const collectionsSnapshot = await firestore()
          .collection('Collections')
          .get();

        collectionsSnapshot.forEach(doc => {
          const data = doc.data();
          if (data.userId === followerId && data.sneakers && !data.isPrivate) {
            fetchedSneakers.push(...data.sneakers);
          }
        });

        setSneakers(prevSneakers => [...prevSneakers, fetchedSneakers]);
      } catch (error) {
        console.error('Error fetching sneakers data: ', error);
      }
    };

    users.forEach(follower => {
      fetchSneakers(follower.Id);
    });
  }, [users]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const usersCollection = firestore().collection('Users');
        usersCollection.onSnapshot(async snapshot => {
          const fetchedUsers = [];
          snapshot.forEach(doc => {
            fetchedUsers.push({Id: doc.id, ...doc.data()});
          });
          setUsers(fetchedUsers);
          if (user && user.uid) {
            const userDoc = firestore().collection('Users').doc(user.uid);
            const doc = await userDoc.get();
            const userData = doc.data();
            if (
              userData &&
              userData.followersData &&
              userData.followersData.length > 0
            ) {
              setShowTopTab(true);
            }
          }
          setLoading(false);
        });
      } catch (error) {
        console.error('Error fetching users: ', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);
  useEffect(() => {
    setLoading(true);
    const fetchCollections = async () => {
      try {
        const userId = user.uid;

        const collectionRef = firestore().collection('Collections');
        collectionRef
          .where('userId', '==', userId)
          .where('favorite', '==', true)
          .onSnapshot(snapshot => {
            const fetchedCollections = [];
            snapshot.forEach(doc => {
              const data = doc.data();
              const {collectionName, favorite, isPrivate, sneakers} = data;
              const sneakerCount = sneakers ? sneakers.length : 0;
              fetchedCollections.push({
                id: doc.id,
                name: collectionName,
                isPrivate: isPrivate,
                sneakerCount: sneakerCount,
                favorite: favorite,
              });
            });

            setCollections(fetchedCollections);
          });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching collections: ', error);
        setLoading(false);
      }
    };

    fetchCollections();
  }, [user]);
  const toggleCollection = () => {
    setModalVisible(prev => !prev);
  };
  const profile = () => {
    navigation.navigate('Profile');
  };
  const AllMembers = () => {
    navigation.navigate('AllMembers', {users});
  };
  const EventsDetail = (selectedItem) => {
    navigation.navigate('EventsDetail', { selectedItem }); 
  };
  const Products = () => {
    navigation.navigate('Products');
  };
  const Events = () => {
    navigation.navigate('Events');
  };
  const details = itemId => {
    navigation.navigate('UserDetails', {selectedUserId: itemId});
  };
  const collection = selectedCollection => {
    navigation.navigate('CollectionStack', {
      screen: 'Collections',
      params: {selectedCollection},
    });
  };
  const createNewDoc = async () => {
    const userId = user.uid;

    try {
      console.log('Collection Name:', collectionName);

      if (!collectionName || collectionName.trim() === '') {
        console.error('Collection name cannot be empty');
        return;
      }

      const collectionRef = firestore().collection('Collections');

      const docData = {
        collectionName: collectionName,
        isPrivate: isEnabled,
        userId: userId,
      };

      await collectionRef.add(docData);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };
  const [selectedTab, setSelectedTab] = useState('MY CLOSET');
  const renderItem = ({item, index}) => (
    <View>
      <TouchableOpacity
        onPress={() => collection(item)}
        style={[
          AppStyles.addCollection,
          {
            marginLeft: responsiveScreenWidth(5),
            width:
              collections.length === 1
                ? responsiveScreenWidth(90)
                : responsiveScreenWidth(75),
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: responsiveScreenWidth(5),
          },
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={appIcons.star}
            style={{
              width: scale(25),
              height: scale(25),
              marginVertical: responsiveScreenHeight(2),
            }}
          />
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
    </View>
  );
  return (
    <>
      <Header options={true} press={profile} />
      <KeyboardAvoidingView
        style={{flex: 1}}
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
              showsVerticalScrollIndicator={false}
              style={{flex: 1}}
              contentContainerStyle={[AppStyles.contentContainer]}
              keyboardShouldPersistTaps="handled">
              {showTopTab && (
                <View style={styles.topTab}>
                  <TouchableOpacity
                    style={
                      selectedTab === 'MY CLOSET'
                        ? styles.topTabbtn
                        : styles.topTabbtn2
                    }
                    onPress={() => setSelectedTab('MY CLOSET')}>
                    <Text
                      style={
                        selectedTab === 'MY CLOSET'
                          ? styles.tabactiveText
                          : styles.inActiveText
                      }>
                      MY CLOSET
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={
                      selectedTab === 'COMMUNITY'
                        ? styles.topTabbtn
                        : styles.topTabbtn2
                    }
                    onPress={() => setSelectedTab('COMMUNITY')}>
                    <Text
                      style={
                        selectedTab === 'COMMUNITY'
                          ? styles.tabactiveText
                          : styles.inActiveText
                      }>
                      COMMUNITY
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {selectedTab === 'MY CLOSET' ? (
                <View>
                  <Text style={[AppStyles.fvrtText, {marginLeft: '5%'}]}>
                    MY FOVORITE COLLECTIONS
                  </Text>
                  {collections.length > 0 ? (
                    <View style={{marginRight: responsiveScreenWidth(5)}}>
                      <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={collections}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                      />
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={AppStyles.addCollection}
                      onPress={toggleCollection}>
                      <Image style={AppStyles.add} source={appIcons.add} />
                      <Text style={AppStyles.redtext}>ADD A COLLECTION</Text>
                    </TouchableOpacity>
                  )}
                  <View style={styles.product}>
                    <View style={AppStyles.row2}>
                      <Text style={AppStyles.fvrtText}>RELEASE DATE</Text>
                      <TouchableOpacity onPress={Products}>
                        <Text
                          style={[
                            AppStyles.forgot,
                            {fontFamily: fontFamily.LatoBold},
                          ]}>
                          View All
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <ProductView sliceSize={7} />
                  </View>
                  <View
                    style={[
                      styles.product,
                      {marginTop: responsiveScreenHeight(-2)},
                    ]}>
                    <View style={[AppStyles.row2]}>
                      <Text style={AppStyles.fvrtText}>MEMBERS</Text>
                      <TouchableOpacity onPress={AllMembers}>
                        <Text
                          style={[
                            AppStyles.forgot,
                            {fontFamily: fontFamily.LatoBold},
                          ]}>
                          View All
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <UserView sliceSize={8} onPress={details} members={users} />
                  </View>
                  <Text
                    style={[
                      AppStyles.fvrtText,
                      {marginLeft: '5%', marginTop: responsiveScreenHeight(2)},
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
                </View>
              ) : (
                <Comunity users={followerUsers} sneakers={sneakers}/>
              )}
              {modalVisible && (
                <AddCollection
                  isVisible={modalVisible}
                  onBackdropPress={toggleCollection}
                  //onChangeText={}
                  //value={}
                  onPress={toggleCollection}
                />
              )}
            </ScrollView>
          )}
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
  topTab: {
    flexDirection: 'row',
    marginTop: responsiveHeight(2),
    height: responsiveHeight(6.5),
    width: responsiveWidth(90),
    backgroundColor: '#ebebeb',
    alignSelf: 'center',
    borderRadius: 50,
    justifyContent: 'space-evenly',
    borderColor: '#cecbd5',
    borderWidth: 0.5,
  },
  topTabbtn: {
    width: '50%',
    height: '100%',
    backgroundColor: '#D9173B',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTabbtn2: {
    width: '50%',
    height: '100%',
    backgroundColor: '#ebebeb',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabactiveText: {
    fontFamily: 'Lato-Bold',
    fontWeight: 'bold',
    color: 'white',
    fontSize: responsiveFontSize(2),
  },
  inActiveText: {
    fontFamily: 'Lato-Bold',
    fontWeight: 'bold',
    color: '#cecbd5',
    fontSize: responsiveFontSize(2),
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
