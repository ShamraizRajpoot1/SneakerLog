import React, { useContext } from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import {
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {appIcons, appImages} from '../../../services/utilities/Assets';
import {Colors} from '../../../services/utilities/Colors';
import { AppStyles } from '../../../services/utilities/AppStyles';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../navigation/AuthProvider';

const Following = props => {
 const {user} = useContext(AuthContext)
  const handleUnfollow = async (selectedUser) => {
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
        followingData: firestore.FieldValue.arrayRemove(selectedUser),
      });
  
      await selectedUserDocRef.update({
        followersData: firestore.FieldValue.arrayRemove({
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
 
  const displayedUsers = props.data;

  return (
    <>
  {displayedUsers.length === 0 ? (
    <View style={{flex:1,alignItems: 'center', justifyContent:'center'}}>
      <Text style={AppStyles.heading}>You are not following anyone.</Text>
      </View>
    ) : (
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
        const handlePress = () => props.onPress(item.Id);
        return (
          <TouchableOpacity
            style={AppStyles.userContainer} onPress={handlePress}>
            {item.profileImage ? (
                    <Image
                    style={AppStyles.memberimage}
                      source={{uri: item.profileImage}}
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
            
            <TouchableOpacity onPress={() => handleUnfollow(item)}>
              <Text
                numberOfLines={1}
                style={[AppStyles.userHorizontalText, {color: Colors.blackText}]}>
                UNFOLLOW
              </Text>
            </TouchableOpacity>
            
            
          </TouchableOpacity>
        );
      }}
    /> ) } 
    </>
  );
};

export default Following;
const styles = {
  
};
