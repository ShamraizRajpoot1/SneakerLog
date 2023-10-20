import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {Colors} from '../../../services/utilities/Colors';
import {AppStyles} from '../../../services/utilities/AppStyles';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../../navigation/AuthProvider';
import {appIcons} from '../../../services/utilities/Assets';

const Sent = props => {
  const {user} = useContext(AuthContext);
  const [data, setData] = useState(props.data);
  useEffect(() => {
    setData(props.data); 
  }, [props.data]);
  const handleWithDraw = async selectedUser => {
    try {
      const selectedUserId = selectedUser.Id;
      const userDocRef = firestore().collection('Users').doc(user.uid);
      const selectedUserDocRef = firestore()
        .collection('Users')
        .doc(selectedUserId);

      const currentUserDoc = await userDocRef.get();
      const currentUserData = currentUserDoc.data();

      console.log('Current user data:', currentUserData); 

      if (currentUserData && currentUserData.name && currentUserData.userName) {
        const {name: currentUserName, userName: currentUserUserName} = currentUserData;

        await selectedUserDocRef.update({
          sent: firestore.FieldValue.arrayRemove({
            Id: user.uid,
            name: currentUserName,
            userName: currentUserUserName,
            //Image: currentUserProfileImage,
          }),
        });

        await userDocRef.update({
          sent: firestore.FieldValue.arrayRemove(selectedUser),
        });

        console.log('Data removed successfully');
      } else {
        console.error('Current user data is undefined or incomplete');
      }
     
    } catch (error) {
      console.error('Error handling withdrawal: ', error);
    }
  };
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal={false}
      scrollEnabled={false}
      keyExtractor={item => item.Id}
      data={data}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity style={AppStyles.userContainer}>
            <Image
              source={
                item.profileImage ? {uri: item.profileImage} : appIcons.profile
              }
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
            <TouchableOpacity onPress={() => handleWithDraw(item)}>
              <Text
                numberOfLines={1}
                style={[
                  AppStyles.userHorizontalText,
                  {color: Colors.blackText},
                ]}>
                WITHDRAW
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default Sent;
