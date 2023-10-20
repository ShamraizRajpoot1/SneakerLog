import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import {
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {appIcons, appImages} from '../../../services/utilities/Assets';
import {Colors} from '../../../services/utilities/Colors';
import {AppStyles} from '../../../services/utilities/AppStyles';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../../navigation/AuthProvider';

const Received = props => {
  const {user} = useContext(AuthContext);
  const [receivedUsers, setReceivedUsers] = useState([]);
  const handleAccept = async selectedUser => {
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
        followersData: firestore.FieldValue.arrayUnion(selectedUser),
      });

      await userDocRef.update({
        received: firestore.FieldValue.arrayRemove(selectedUser),
      });

      await selectedUserDocRef.update({
        sent: firestore.FieldValue.arrayRemove({
          Id: user.uid,
          name: currentUserName,
          userName: currentUserUserName,
          Image: currentUserProfileImage,
        }),
      });

      await selectedUserDocRef.update({
        followingData: firestore.FieldValue.arrayUnion({
          Id: user.uid,
          name: currentUserName,
          userName: currentUserUserName,
          Image: currentUserProfileImage,
        }),
      });
    } catch (error) {
      console.error('Error handling accept: ', error);
    }
  };
  const handleDecline = async (selectedUser) => {
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
        received: firestore.FieldValue.arrayRemove(selectedUser),
      });
  
      await selectedUserDocRef.update({
        sent: firestore.FieldValue.arrayRemove({
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
  

  // useEffect(() => {
  //   const fetchReceivedUsers = async () => {
  //     try {
  //       const userDoc = await firestore()
  //         .collection('Users')
  //         .doc(user.uid)
  //         .get();
  //       if (userDoc.exists) {
  //         const userData = userDoc.data();
  //         if (userData.received) {
  //           setReceivedUsers(userData.received);
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error fetching received users: ', error);
  //     }
  //   };

  //   fetchReceivedUsers();
  // }, [user.uid]);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal={false}
      scrollEnabled={false}
      keyExtractor={item => item.Id}
      data={props.data}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity style={AppStyles.userContainer}>
            <Image
              source={item.profileImage ? item.profileImage : appIcons.profile}
              style={AppStyles.memberimage}
            />
            <View style={{flex: 1}}>
              <View style={{marginLeft: responsiveWidth(4)}}>
                <Text numberOfLines={1} style={AppStyles.userText}>
                  {item.name}
                </Text>
                <Text numberOfLines={1} style={[AppStyles.additionalText]}>
                  {item.userName}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => handleDecline(item)}
              style={{marginRight: responsiveWidth(5)}}>
              <Text
                numberOfLines={1}
                style={[
                  AppStyles.userHorizontalText,
                  {color: Colors.blackText},
                ]}>
                DECLINE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleAccept(item)}>
              <Text
                numberOfLines={1}
                style={[AppStyles.userHorizontalText, {color: Colors.follow}]}>
                ACCEPT
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default Received;
