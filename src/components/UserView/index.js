import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { appImages } from '../../services/utilities/Assets';
import { scale } from 'react-native-size-matters';
import { fontFamily, fontSize } from '../../services/utilities/Fonts';
import { Colors } from '../../services/utilities/Colors';


const UserView = props => {
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
 const memberimage = {
    height:props.vertical ? responsiveHeight(6) : responsiveHeight(12),
    width:props.vertical ? responsiveHeight(6) : responsiveHeight(12), 
    borderRadius: scale(50),
  }
  const text= {
   ...styles.text,
   fontSize: props.vertical ? fontSize.usernameText : fontSize.userName
  }

  const loggedInUser = {
    Id: '2', 
    name: 'User 2',
    profileImage: 'https://example.com/user2.jpg',
    username: 'user2',
  };

  const displayedUsers = props.sliceSize ? Users.slice(0, props.sliceSize) : Users

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal={!props.vertical}
      scrollEnabled={!props.vertical}
      keyExtractor={(item) => item.Id}
      data={displayedUsers.filter((item) => item.Id !== loggedInUser.Id)}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity onPress={props.onPress}
            style={{
              flexDirection: props.vertical ? 'row' : 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: props.vertical ? responsiveHeight(0.5) : 0,
              marginLeft: index === 0 && !props.vertical ? responsiveWidth(5) : 0,
              marginRight: index + 1 === Users.length && !props.vertical ? responsiveWidth(5) : responsiveWidth(3),
            }}>
            <Image
              source={item.profileImage ? item.profileImage : appImages.member3}
              style={memberimage}
            />
            <View style={{ flex: 1 }}>
              {props.vertical && (
                <View style={{ marginLeft: responsiveWidth(2) }}>
                  <Text numberOfLines={1} style={text}>
                    {item.username}
                  </Text>
                  <Text numberOfLines={1} style={styles.additionalText}>
                    Additional Info
                  </Text>
                </View>
              )}
              {!props.vertical && (
                <Text numberOfLines={1} style={styles.horizontalText}>
                  {item.username}
                </Text>
              )}
              
              
            </View>
            {props.vertical && (
              <TouchableOpacity>
                <Text numberOfLines={1} style={[styles.horizontalText,{color:Colors.follow}]}>
                  Follow
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
    marginHorizontal: 2.5,
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