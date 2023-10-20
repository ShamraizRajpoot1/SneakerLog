import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
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
  const { users } = route.params;
  const [selectedOption, setSelectedOption] = useState(null);
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
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await firestore().collection('Users').doc(user.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setUse(userData)
          if (userData.sent) {
            setSentData(userData.sent);
          }
          if (userData.followingData) {
            setFollowingData(userData.followingData);
          }
          if (userData.received) {
            setReceivedData(userData.received);
          }
          if (userData.followersData) {
            setFollowerData(userData.followersData);
          }
        } else {
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
      selectedComponent = <UserView vertical={true} members={users} />;
      break;
    case 'Followers':
      selectedComponent = <Followers  data={followerData}/>;
      break;
    case 'Following':
      selectedComponent = <Following data={followingData} />;
      break;
    case 'Sent':
      selectedComponent = <Sent data={sentData} />;
      break;
    case 'Received':
      selectedComponent = <Received  data={recievedData}/>;
      break;

    default:
      selectedComponent = <UserView vertical={true} members={users} />;
      break;
  }

  const handleOptionPress = option => {
    setSelectedOption(option);
  };
  
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     handleSearch('');
  //   }, 1000); 
  
  //   return () => clearTimeout(timer);
  // }, []);
  const handleSearch = (text) => {
    // if (text === '') {
    //   console.log('Text is empty. Setting filtered users to all users.');
    //   setFilteredUsers(users);
    //   setFilterSentData(sentData);
    //   setFilterFollowerData(followerData);
    //   setFilterFollowingData(followingData);
    //   setFilterRecievedData(recievedData);
    // } else {
      const filteredData = users.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      const filterSent = sentData.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      const filterRecieved = recievedData.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      const filterFollowing = followingData.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      const filterFollower = followerData.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUsers(filteredData);
      setFilterSentData(filterSent);
      setFilterFollowerData(filterFollower);
      setFilterRecievedData(filterRecieved);
      setFilterFollowingData(filterFollowing);
    
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
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              marginHorizontal: responsiveWidth(5),
              backgroundColor: Colors.background,
            }}
            contentContainerStyle={[AppStyles.contentContainer]}
          >
            {selectedOption === 'Sent' && filterSentData.length > 0 ? (
              <Sent data={filterSentData} />
            ) : selectedOption === 'Received' && filterRecievedData.length > 0 ? (
              <Received data={filterRecievedData} />
            ) :  selectedOption === 'All' && filteredUsers.length > 0 ? (
              <UserView vertical={true} members={filteredUsers} />
            ) : selectedOption === 'Following' && filterFollowingtData.length > 0 ? (
              <Following data={filterFollowingtData} />
            ) : selectedOption === 'Followers' && filterFollowerData.length > 0 ? (
              <Followers data={filterFollowerData} />
            ) : (
              selectedComponent
            )}
          </ScrollView>
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
