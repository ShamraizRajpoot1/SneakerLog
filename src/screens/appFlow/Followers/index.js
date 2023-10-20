import React, { useContext, useState, useEffect } from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {appImages} from '../../../services/utilities/Assets'
import {Colors} from '../../../services/utilities/Colors';
import { AppStyles } from '../../../services/utilities/AppStyles';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../navigation/AuthProvider';

const Followers = props => {
  const {user} = useContext(AuthContext)
  const displayedUsers = props.data
  const [loggedInUserData, setLoggedInUserData] = useState({
    name: '',
    userName: '',
    Image: '',
    Id: '',
  });
  useEffect(() => {
    const fetchLoggedInUserData = async () => {
      try {
        const userDoc = await firestore().collection('Users').doc(user.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setLoggedInUserData({
            Id: user.uid,
            name: userData.name, 
            userName: userData.userName, 
            Image: userData.profileImage || '', 
          });
        } else {
          console.log('No user data found for the specified ID');
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchLoggedInUserData();
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
       // setInviteSentUsers([...inviteSentUsers, selectedUser.Id]);
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
        return (
          <TouchableOpacity
            style={AppStyles.userContainer}>
            <Image
              source={item.profileImage ? item.profileImage : appImages.member3}
              style={AppStyles.memberimage}
            />
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
            <TouchableOpacity  style={{marginRight: responsiveWidth(5)}} onPress={() => handleFollow(item)}>
              <Text
                numberOfLines={1}
                style={[AppStyles.userHorizontalText, {color: Colors.follow}]}>
                FOLLOWING
              </Text>
            </TouchableOpacity>
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
