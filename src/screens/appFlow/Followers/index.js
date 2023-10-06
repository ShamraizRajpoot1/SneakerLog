import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {appImages} from '../../../services/utilities/Assets';
import {scale} from 'react-native-size-matters';
import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
import {Colors} from '../../../services/utilities/Colors';
import { AppStyles } from '../../../services/utilities/AppStyles';

const Followers = props => {
  const Users = [
    {
      Id: '1',
      name: 'User 1',
      profileImage: appImages.member1,
      username: 'user1',
    },
    {
      Id: '2',
      name: 'User 2',
      profileImage: appImages.member2,
      username: 'user2',
    },
    {
      Id: '3',
      name: 'User 3',
      profileImage: appImages.member3,
      username: 'user3',
    },
    {
      Id: '4',
      name: 'User 1',
      profileImage: appImages.member1,
      username: 'user1',
    },
    {
      Id: '5',
      name: 'User 2',
      profileImage: appImages.member2,
      username: 'user2',
    },
    {
      Id: '6',
      name: 'User 3',
      profileImage: appImages.member3,
      username: 'user3',
    },
    {
      Id: '7',
      name: 'User 3',
      profileImage: appImages.member3,
      username: 'user3',
    },
    {
      Id: '8',
      name: 'User 1',
      profileImage: appImages.member1,
      username: 'user1',
    },
    {
      Id: '9',
      name: 'User 2',
      profileImage: appImages.member2,
      username: 'user2',
    },
    {
      Id: '10',
      name: 'User 3',
      profileImage: appImages.member3,
      username: 'user3',
    },
    {
      Id: '11',
      name: 'User 3',
      profileImage: appImages.member3,
      username: 'user3',
    },
    {
      Id: '12',
      name: 'User 3',
      profileImage: appImages.member3,
      username: 'user3',
    },
    {
      Id: '13',
      name: 'User 3',
      profileImage: appImages.member3,
      username: 'user3',
    },
  ];
  
 

  const loggedInUser = {
    Id: '2',
    name: 'User 2',
    profileImage: 'https://example.com/user2.jpg',
    username: 'user2',
  };

  const displayedUsers = Users;

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal={false}
      scrollEnabled={false}
      keyExtractor={item => item.Id}
      data={displayedUsers.filter(item => item.Id !== loggedInUser.Id)}
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
                  {item.username}
                </Text>
                <Text numberOfLines={1} style={AppStyles.additionalText}>
                  Additional Info
                </Text>
              </View>
            </View>
            <TouchableOpacity  style={{marginRight: responsiveWidth(5)}}>
              <Text
                numberOfLines={1}
                style={[AppStyles.userHorizontalText, {color: Colors.follow}]}>
                FOLLOWING
              </Text>
            </TouchableOpacity>
            <TouchableOpacity >
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
