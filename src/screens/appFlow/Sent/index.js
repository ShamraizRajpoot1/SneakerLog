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

      console.log('Current user data:', selectedUser);

     
        const currentUserName = currentUserData.name ;
        const currentUserUserName = currentUserData.userName ;
        const currentUserProfileImage = currentUserData.profileImage || '';

        await selectedUserDocRef.update({
          received: firestore.FieldValue.arrayRemove({
            Id: user.uid,
            Image: currentUserProfileImage || '',
            name: currentUserName,
            userName: currentUserUserName,
          }),
        });

        await userDocRef.update({
          sent: firestore.FieldValue.arrayRemove(selectedUser),
        });

        console.log('Data removed successfully');
      
    } catch (error) {
      console.error('Error handling withdrawal: ', error);
    }
  };
  return (
    <>
    {data.length === 0 ? (
      <View style={{flex:1,alignItems: 'center', justifyContent:'center'}}>
        <Text style={AppStyles.heading}>You have not sent any invites</Text>
        </View>
      ) : (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal={false}
      scrollEnabled={false}
      keyExtractor={item => item.Id}
      data={data}
      renderItem={({item, index}) => {
        if (item.Id === user.uid) {
          return null;
        }
        const handlePress = () => props.onPress(item.Id);
        return (
          <TouchableOpacity
            style={AppStyles.userContainer}
            onPress={handlePress}>
            {item.Image ? (
              <Image style={AppStyles.memberimage} source={{uri: item.Image}} />
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
    /> ) }
    </>
  );
};

export default Sent;
