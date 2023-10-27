import React, { useContext, useState, useEffect } from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import {
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {appIcons, appImages} from '../../../services/utilities/Assets'
import {Colors} from '../../../services/utilities/Colors';
import { AppStyles } from '../../../services/utilities/AppStyles';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../navigation/AuthProvider';

const Followers = props => {
  const {user} = useContext(AuthContext)
  const [inviteSentUsers, setInviteSentUsers] = useState([]);
  const [isFollowing, setIsFollowing] = useState([]);
  const displayedUsers = props.data
  const [loggedInUserData, setLoggedInUserData] = useState({
    name: '',
    userName: '',
    Image: '',
    Id: '',
  });
  useEffect(() => {
    const checkIfInviteSent = async () => {
      try {
        const userDoc = await firestore().collection('Users').doc(user.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
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
    };
    checkIfInviteSent();
  }, [user.uid]);
  useEffect(() => {
    const userDocRef = firestore().collection('Users').doc(user.uid);
  
    const unsubscribe = userDocRef.onSnapshot((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        setLoggedInUserData({
          Id: user.uid,
          name: userData.name,
          userName: userData.userName,
          Image: userData.profileImage || '',
        });
      } else {
        console.log('No user data found for the specified ID');
      }
    });
  
    // Unsubscribe from the listener when the component is unmounted
    return () => unsubscribe();
  }, [user.uid]);
  
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
  const handleRemove = async (selectedUser) => {
    try {
      const selectedUserId = selectedUser.Id;
      const userDocRef = firestore().collection('Users').doc(user.uid);
      const selectedUserDocRef = firestore()
        .collection('Users')
        .doc(selectedUserId);

      const userDoc = await userDocRef.get();
      const currentUserData = userDoc.data();

      const currentUserName = currentUserData.name || '';
      const currentUserUserName = currentUserData.userName || '';
      const currentUserProfileImage = currentUserData.profileImage || '';
  
      await userDocRef.update({
        followersData: firestore.FieldValue.arrayRemove(selectedUser),
      });
  
      await selectedUserDocRef.update({
        followingData: firestore.FieldValue.arrayRemove({
          Id: user.uid,
          name: currentUserName,
          userName: currentUserUserName,
          Image: currentUserProfileImage,
        }),
      });
  
      console.log('Data removed successfully');
    } catch (error) {
      console.error('Error handling decline: ', error);
    }
  }; 
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal={false}
      scrollEnabled={false}
      keyExtractor={item => item.Id}
      data={displayedUsers}
      renderItem={({item, index}) => {
        if (item.Id === user.uid) {
          return null; 
        }
        const isUserInvited = inviteSentUsers.includes(item.Id);
        const following = isFollowing.includes(item.Id);
        const handlePress = () => props.onPress(item.Id);
        return (
          <TouchableOpacity
            style={AppStyles.userContainer} onPress={handlePress}>
           {item.Image ? (
                    <Image
                    style={AppStyles.memberimage}
                      source={{uri: item.Image}}
                    />
                  ) : (
                    <Image style={AppStyles.memberimage} source={appIcons.profile} />
                  )}
            <View style={{flex: 1}}>
              <View style={{marginLeft: responsiveWidth(2)}}>
                <Text numberOfLines={1} style={AppStyles.userText}>
                  {item.name}
                </Text>
                <Text numberOfLines={1} style={AppStyles.additionalText}>
                  {item.userName}
                </Text>
              </View>
            </View>
            {following ? (
              <View>
                <Text numberOfLines={1}  style={[AppStyles.userHorizontalText,{marginRight: responsiveWidth(5), color: Colors.follow}]}>
                  FOLLOWING
                </Text>
              </View>
            ) : isUserInvited ? (
              <View  style={{marginRight: responsiveWidth(5)}}>
                <Text numberOfLines={1} style={[AppStyles.userHorizontalText]}>
                  Invite Sent
                </Text>
              </View>
            ) : (
              <TouchableOpacity  style={{marginRight: responsiveWidth(5)}} onPress={() => handleFollow(item)}>
                <Text numberOfLines={1} style={[AppStyles.userHorizontalText, { color: Colors.follow }]}>
                  FOLLOW
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity  onPress={() => handleRemove(item)}>
              <Text
                numberOfLines={1}
                style={[AppStyles.userHorizontalText, {color: Colors.blackText}]}>
                REMOVE
              </Text>
            </TouchableOpacity>
            
            
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default Followers;
const styles = {
  
};
