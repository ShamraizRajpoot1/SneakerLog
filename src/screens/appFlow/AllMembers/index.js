import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {AppStyles} from '../../../services/utilities/AppStyles';
import SearchBar from '../../../components/SearchBar';
import UserView from '../../../components/UserView';
import {
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Header from '../../../components/Header';
import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
import {Colors} from '../../../services/utilities/Colors';
import {scale} from 'react-native-size-matters';
import Followers from '../Followers';
import Sent from '../Sent';
import Following from '../Following';
import Received from '../Received';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../navigation/AuthProvider';

const AllMembers = ({navigation, route}) => {
  //const [users, setUsers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const {users} = route.params
  const {user} = useContext(AuthContext)
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sentData, setSentData] = useState([])
  const [recievedData, setReceivedData] = useState([])
  const [followingData, setFollowingData] = useState([])
  const [followerData, setFollowerData] = useState([])
  const [filterSentData, setFilterSentData] = useState([])
  const [filterRecievedData, setFilterRecievedData] = useState([])
  const [filterFollowingtData, setFilterFollowingData] = useState([])
  const [filterFollowerData, setFilterFollowerData] = useState([])
  const [use, setUse] = useState([])
  const [refresh, setRefresh] = useState(false); 
  const [loading, setIsLoading] = useState(false);
  

  
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await firestore().collection('Users').doc(user.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setUse(userData)
          if (userData.sent) {
            const sentUsersData = await Promise.all(
              userData.sent.map(async (sent) => {
                const userSnapshot = await firestore().collection('Users').doc(sent.Id).get();
                if (userSnapshot.exists) {
                  const userDocData = userSnapshot.data();
                  if (!userDocData.isDisabled) {
                    return sent;
                  } else {
                    return null;
                  }
                } else {
                  return null;
                }
              })
            );
            setSentData(sentUsersData.filter((data) => data !== null));
          } else {
            setSentData([]);
          }
          
          if (userData.followingData) {
            const followingData = await Promise.all(
              userData.followingData.map(async (sentUser) => {
                const userSnapshot = await firestore().collection('Users').doc(sentUser.Id).get();
                if (userSnapshot.exists) {
                  const userDocData = userSnapshot.data();
                  if (!userDocData.isDisabled) {
                    return sentUser;
                  } else {
                    return null;
                  }
                } else {
                  return null;
                }
              })
            );
            setFollowingData(followingData.filter((data) => data !== null));
          }
          if (userData.received) {
            const receivedData = await Promise.all(
              userData.received.map(async (received) => {
                const userSnapshot = await firestore().collection('Users').doc(received.Id).get();
                if (userSnapshot.exists) {
                  const userDocData = userSnapshot.data();
                  if (!userDocData.isDisabled) {
                    return received; 
                  } else {
                    return null;
                  }
                } else {
                  return null;
                }
              })
            );
            setReceivedData(receivedData.filter((data) => data !== null));
          }
          if (userData.followersData) {
            const followersData = await Promise.all(
              userData.followersData.map(async (follower) => {
                const userSnapshot = await firestore().collection('Users').doc(follower.Id).get();
                if (userSnapshot.exists) {
                  const userDocData = userSnapshot.data();
                  if (!userDocData.isDisabled) {
                    return follower;
                  } else {
                    return null;
                  }
                } else {
                  return null;
                }
              })
            );
            setFollowerData(followersData.filter((data) => data !== null));
          }
         
        }
        else {
          console.log('No user data found for the specified ID');
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };
  
    const unsubscribe = firestore()
    .collection('Users')
    .doc(user.uid)
    .onSnapshot(() => {
      fetchUserData();
      setRefresh((prev) => !prev); 
    });

  return () => {
    unsubscribe();
  };
}, [use, refresh]);
  
  const back = () => {
    navigation.goBack();
  };
  const details = (itemId) => {
    navigation.navigate('UserDetails', { selectedUserId: itemId });
  };

  const Profile = () => {
    navigation.navigate('Profile');
  };

  const options = ['All', 'Followers', 'Following', 'Sent', 'Received'];
  useEffect(() => {
    setSelectedOption(options[0]);
  }, []);

  let selectedComponent;

  switch (selectedOption) {
    case 'All':
      selectedComponent = <UserView vertical={true} onPress={details} members={users} />;
      break;
    case 'Followers':
      selectedComponent = <Followers onPress={details}  data={followerData}/>;
      break;
    case 'Following':
      selectedComponent = <Following onPress={details} data={followingData} />;
      break;
    case 'Sent':
      selectedComponent = <Sent onPress={details} data={sentData} />;
      break;
    case 'Received':
      selectedComponent = <Received onPress={details}  data={recievedData}/>;
      break;

    default:
      selectedComponent = <UserView onPress={details} vertical={true} members={users} />;
      break;
  }

  const handleOptionPress = option => {
    setSelectedOption(option);
  };
  
  
  const handleSearch = (text) => {
    if (users) {
      const filteredData = users.filter((user) =>
        user.name && user.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUsers(filteredData);
    }
  
    if (sentData) {
      const filterSent = sentData.filter((user) =>
        user.name && user.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilterSentData(filterSent);
    }
  
    if (recievedData) {
      const filterRecieved = recievedData.filter((user) =>
        user.name && user.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilterRecievedData(filterRecieved);
    }
  
    if (followingData) {
      const filterFollowing = followingData.filter((user) =>
        user.name && user.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilterFollowingData(filterFollowing);
    }
  
    if (followerData) {
      const filterFollower = followerData.filter((user) =>
        user.name && user.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilterFollowerData(filterFollower);
    }
  };
  
  return (
    <>
      <Header Image={true} options={true} onPress={back} press={Profile} />

      <View style={styles.container}>
      
        <ScrollView
          style={styles.optionsContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.optionsScrollContent}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOptionPress(option)}
              style={[
                styles.optionItem,
                selectedOption === option && styles.selectedOption,
              ]}>
              <Text style={styles.optionText}>{option}</Text>
              {selectedOption === option && <View style={styles.selectedBar} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
<View style={{backgroundColor: Colors.background,}}>
<SearchBar placeholder={'Search Members'} onChangeText={handleSearch} />
      </View>
      <View style={{flex: 1}}>
        <TouchableWithoutFeedback>
        {loading ? ( 
          <ActivityIndicator style={AppStyles.loadingIndicator} size="large" color={Colors.primary} />
        ) :
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              marginHorizontal: responsiveWidth(5),
              backgroundColor: Colors.background,
            }}
            contentContainerStyle={[AppStyles.contentContainer]}
          >
            {selectedOption === 'Sent' && filterSentData.length > 0 ? (
              <Sent data={filterSentData} onPress={details}/>
            ) : selectedOption === 'Received' && filterRecievedData.length > 0 ? (
              <Received data={filterRecievedData} onPress={details}/>
            ) :  selectedOption === 'All' && filteredUsers.length > 0 ? (
              <UserView vertical={true} members={filteredUsers} onPress={details}/>
            ) : selectedOption === 'Following' && filterFollowingtData.length > 0 ? (
              <Following data={filterFollowingtData} onPress={details}/>
            ) : selectedOption === 'Followers' && filterFollowerData.length > 0 ? (
              <Followers data={filterFollowerData} onPress={details}/>
            ) : (
              selectedComponent
            )}
          </ScrollView>}
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

export default AllMembers;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: responsiveScreenHeight(5),
    backgroundColor: Colors.background,
  },
  optionsContainer: {
    height: '100%',
    flexDirection: 'row',
    marginHorizontal: responsiveWidth(3),
    marginTop: responsiveHeight(2),
    backgroundColor: Colors.background,
  },
  optionItem: {
    alignItems: 'center',
    marginHorizontal: responsiveWidth(3.5),
    width: responsiveScreenWidth(18.5),
    backgroundColor: Colors.background,
  },
  selectedOption: {},
  optionText: {
    fontSize: fontSize.fieldText,
    fontFamily: fontFamily.LatoBold,
    color: Colors.blackText,
  },
  selectedBar: {
    height: responsiveHeight(0.5),
    width: '100%',
    borderRadius: scale(5),
    backgroundColor: Colors.barBackground,
    bottom: 0,
  },
});
