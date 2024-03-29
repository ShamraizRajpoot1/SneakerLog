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
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
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
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../../navigation/AuthProvider';

const UserDetails = ({navigation, route}) => {
  const {user} = useContext(AuthContext);
  const {selectedUserId} = route.params;
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [inviteSentUsers, setInviteSentUsers] = useState(false);
  const [collectionCount, setCollectionCount] = useState(0);
  const [sneakerCount, setSneakerCount] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUserData, setLoggedInUserData] = useState({
    name: '',
    userName: '',
    Image: '',
    Id: '',
  });
  useEffect(() => {
    const fetchLoggedInUserData = async () => {
      try {
        if(user){
        const userDoc = await firestore().collection('Users').doc(user.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setLoggedInUserData({
            Id: user.uid,
            name: userData.name, 
            userName: userData.userName, 
            Image: userData.profileImage || '', 
          });
        }
        } else {
          console.log('No user data found for the specified ID');
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchLoggedInUserData();
  }, []);
  useEffect(() => {
    const fetchSelectedUserData = async () => {
      try {
        const userDoc = await firestore()
          .collection('Users')
          .doc(selectedUserId)
          .get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setSelectedUserData(userData);
          if (userData?.followersData?.find(item => item.Id === user.uid)) {
            setIsFollowing(true);
          }
          if (userData?.received?.find(item => item.Id === user.uid)) {
            setInviteSentUsers(true);
          }
        } 
        setIsLoading(false); 
      } catch (error) {
        console.error('Error fetching user data: ', error);
        setIsLoading(false); 
      }
    };

    fetchSelectedUserData();
  }, [selectedUserId]);
  const handleFollow = (selectedUser) => {
    const userData = {
      name: selectedUser.name || '',
      userName: selectedUser.userName || '',
      Id: selectedUser.userId || '',
      Image: selectedUser.profileImage || '',
    };

    

    const selectedUserRef = firestore().collection('Users').doc(selectedUserId);
    const userRef = firestore().collection('Users').doc(user.uid);

    selectedUserRef
      .update({
        received: firestore.FieldValue.arrayUnion(loggedInUserData),
      })
      .then(() => {
        console.log('User data added successfully to selected user: ', loggedInUserData);
       setInviteSentUsers([...inviteSentUsers, true]);
      })
      .catch((error) => {
        console.error('Error adding user data to selected user: ', error);
      });

    userRef
      .update({
        sent: firestore.FieldValue.arrayUnion(userData),
      })
      .then(() => {
        console.log('User data added successfully: ', userData);
      })
      .catch((error) => {
        console.error('Error adding user data: ', error);
      });
  };

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const collectionRef = firestore().collection('Collections');
        collectionRef
          .where('userId', '==', selectedUserId)
          .onSnapshot(snapshot => {
            let count = 0; 
            const fetchedCollections = [];
            snapshot.forEach(doc => {
              const data = doc.data();
              const { collectionName, isPrivate, sneakers } = data;
              fetchedCollections.push({
                id: doc.id,
                name: collectionName,
                sneaker: sneakers,
                isPrivate: isPrivate,
              });
              count += sneakers ? sneakers.length : 0;
            });

            setData(fetchedCollections);
            setCollectionCount(fetchedCollections.length);
            setSneakerCount(count); 
          });
         
      } catch (error) {
        console.error('Error fetching collections: ', error);
        setIsLoading(false); 
      }
    };

    fetchCollections();
  }, [selectedUserId]);

  const userCollection = (selectedCollection) => {
    navigation.navigate('UserCollection', {
      selectedCollection: selectedCollection,
      selectedUserData: selectedUserData,
    });
  };
  const profile = () => {
    navigation.navigate('Profile');
  };
  const back = () => {
    navigation.goBack();
  };
  const renderItem = ({item, index}) => (
    <View>
      <TouchableOpacity
        style={AppStyles.collection}
        onPress={() => userCollection(item)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: '4%',
          }}>
           {item.favorite ? <Image
            source={appIcons.star}
            style={{
              width: scale(25),
              height: scale(25),
            }}
          /> : 
          <Image
            source={appIcons.starUnselected}
            style={{
              width: scale(25),
              height: scale(25),
            }}
          />}
          <Text style={[styles.name, {marginLeft: responsiveWidth(3),} ]}>{item.name}</Text>
        </View>
        <View style={AppStyles.priceContainer}>
          <Image style={AppStyles.arrowRight} source={appIcons.arrowRight} />
        </View>
      </TouchableOpacity>
      <View style={[AppStyles.line, {marginHorizontal: 0}]} />
    </View>
  );
  const filteredData = data.filter(item => !item.isPrivate);
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
            {selectedUserData && (
              <View>
                <View style={styles.profileContainer}>
                  {selectedUserData.profileImage ? (
                    <Image
                      style={styles.image}
                      source={{uri: selectedUserData.profileImage}}
                    />
                  ) : (
                    <Image style={styles.image} source={appIcons.profile} />
                  )}
                  <Text style={[styles.name]}>{selectedUserData.name}</Text>
                  <Text style={styles.additionalText}>
                    {selectedUserData.userName}
                  </Text>
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
                  ) : inviteSentUsers ? ( 
                    <View style={styles.followContainer}>
                      <Text
                        style={[
                          AppStyles.userHorizontalText,
                          { marginTop: 0},
                        ]}>
                        invite Sent
                      </Text>
                    </View>
                  ) : ( 
                    <TouchableOpacity style={styles.followContainer} onPress={() => handleFollow(selectedUserData)}>
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
                <View style={styles.row}>
                  <View style={styles.sneakerContainer}>
                    <Text style={styles.name}>{sneakerCount}</Text>
                    <Text style={styles.name}>SNEAKERS</Text>
                  </View>
                  <View style={styles.sneakerContainer}>
                    <Text style={styles.name}>{collectionCount}</Text>
                    <Text style={styles.name}>COLLECTIONS</Text>
                  </View>
                  <View style={styles.sneakerContainer}>
                    <Text style={styles.name}>
                      {selectedUserData.followersData
                        ? selectedUserData.followersData.length
                        : 0}
                    </Text>
                    <Text style={styles.name}>FOLLOWERS</Text>
                  </View>
                  <View style={styles.sneakerContainer}>
                    <Text style={styles.name}>
                      {selectedUserData.followingData
                        ? selectedUserData.followingData.length
                        : 0}
                    </Text>
                    <Text style={styles.name}>FOLLOWING</Text>
                  </View>
                </View>
              </View>
            )}
            {data.length === 0 ? (
              <View
                style={[
                  styles.collectionContainer,
                  {
                    height: responsiveScreenHeight(35),
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <Text style={styles.emptyText}>No items</Text>
              </View>
            ) : (
              <View style={styles.collectionContainer}>
                <FlatList
                  scrollEnabled={false}
                  data={filteredData}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
                />
                <View style={{height: responsiveHeight(7)}}></View>
              </View>
            )}
          </ScrollView> }
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
