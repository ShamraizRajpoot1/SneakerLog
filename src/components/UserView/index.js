import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { appIcons } from '../../services/utilities/Assets';
import { scale } from 'react-native-size-matters';
import { fontFamily, fontSize } from '../../services/utilities/Fonts';
import { Colors } from '../../services/utilities/Colors';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../navigation/AuthProvider';
import { AppStyles } from '../../services/utilities/AppStyles';

const UserView = (props) => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [inviteSentUsers, setInviteSentUsers] = useState([]);
  const [isFollowing, setIsFollowing] = useState([]);
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
    const fetchData = async () => {
      try {
        const usersCollection = await firestore().collection('Users').get();
        const fetchedUsers = [];
        usersCollection.forEach((doc) => {
          fetchedUsers.push({ Id: doc.id, ...doc.data() });
        });
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const userDocRef = firestore().collection('Users').doc(user.uid);
  
    const unsubscribe = userDocRef.onSnapshot((doc) => {
      try {
        if (doc.exists) {
          const userData = doc.data();
          if (userData.sent && userData.sent.length > 0) {
            const updatedInvitedSentUsers = userData.sent.map((sentUser) => sentUser.Id);
            setInviteSentUsers(updatedInvitedSentUsers);
          }
          if (userData.followingData && userData.followingData.length > 0) {
            const updatedFollowing = userData.followingData.map((followingUser) => followingUser.Id);
            setIsFollowing(updatedFollowing);
          }
        }
      } catch (error) {
        console.error('Error checking if invite sent: ', error);
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  const handleFollow = (selectedUser) => {
    const userData = {
      name: selectedUser.name || '',
      userName: selectedUser.userName || '',
      Id: selectedUser.Id || '',
      Image: selectedUser.profileImage || '',
    };

    

    const selectedUserRef = firestore().collection('Users').doc(selectedUser.Id);
    const userRef = firestore().collection('Users').doc(user.uid);

    selectedUserRef
      .update({
        received: firestore.FieldValue.arrayUnion(loggedInUserData),
      })
      .then(() => {
        console.log('User data added successfully to selected user: ', loggedInUserData);
        setInviteSentUsers([...inviteSentUsers, selectedUser.Id]);
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

  const memberimage = {
    height: props.vertical ? responsiveHeight(6) : responsiveHeight(12),
    width: props.vertical ? responsiveHeight(6) : responsiveHeight(12),
    borderRadius: scale(50),
  };
  const text = {
    ...styles.text,
    fontSize: fontSize.usernameText,
  };

  const displayedUsers = props.sliceSize ? props.members.slice(0, props.sliceSize) : props.members;

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal={!props.vertical}
      scrollEnabled={!props.vertical}
      keyExtractor={(item) => item.userId}
      data={displayedUsers}
      renderItem={({ item, index }) => {
        if (user && item.Id === user.uid) {
          return null; 
        }
        const isUserInvited = inviteSentUsers.includes(item.Id);
        const following = isFollowing.includes(item.Id);
        const handlePress = () => props.onPress(item.Id);
        return (
          <TouchableOpacity
          onPress={handlePress}
            style={{
              flexDirection: props.vertical ? 'row' : 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: props.vertical ? responsiveHeight(0.5) : 0,
              marginLeft: index === 0 && !props.vertical ? responsiveWidth(5) : 0,
              marginRight: index + 1 === users.length && !props.vertical ? responsiveWidth(5) : responsiveWidth(3),
            }}
          >
            {item.profileImage ? (
                    <Image
                    style={memberimage}
                      source={{uri: item.profileImage}}
                    />
                  ) : (
                    <Image style={memberimage} source={appIcons.profile} />
                  )}
            <View style={{ flex: 1 }}>
              {props.vertical && (
                <View style={{ marginLeft: responsiveWidth(4) }}>
                  <Text numberOfLines={1} style={text}>
                    {item.name}
                  </Text>
                  <Text numberOfLines={1} style={styles.additionalText}>
                    {item.userName}
                  </Text>
                </View>
              )}
              {!props.vertical && (
                <Text numberOfLines={1} style={styles.horizontalText}>
                  {item.name}
                </Text>
              )}
            </View>
            {props.vertical && following ? (
              <View>
                <Text numberOfLines={1} style={[AppStyles.userHorizontalText, { color: Colors.follow }]}>
                  FOLLOWING
                </Text>
              </View>
            ) : props.vertical && isUserInvited ? (
              <View>
                <Text numberOfLines={1} style={[AppStyles.userHorizontalText]}>
                  Invite Sent
                </Text>
              </View>
            ) : ( props.vertical &&
              <TouchableOpacity onPress={() => handleFollow(item)}>
                <Text numberOfLines={1} style={[AppStyles.userHorizontalText, { color: Colors.follow }]}>
                  FOLLOW
                </Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default UserView;

const styles = {
  text: {
    fontSize: fontSize.userName,
    fontFamily: fontFamily.LatoBold,
    textAlignVertical: 'center',
    width: responsiveWidth(25),
    //marginHorizontal: 2.5,
    color: Colors.blackText,
  },
  horizontalText: {
    fontSize: fontSize.userName,
    fontFamily: fontFamily.LatoBold,
    marginTop: responsiveHeight(1.3),
    color: Colors.blackText,
  },
  additionalText: {
    fontSize: fontSize.userName,
    fontFamily: fontFamily.LatoRegular,
    color: Colors.username,
  },
};
