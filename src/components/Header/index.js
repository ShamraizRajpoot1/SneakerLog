import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {appIcons, appImages} from '../../services/utilities/Assets';
import {Colors} from '../../services/utilities/Colors';
import {AuthContext} from '../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const Header = props => {
  const {user} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const docId = user.uid;
    const docRef = firestore().collection('Users').doc(docId);

    const unsubscribe = docRef.onSnapshot(doc => {
      if (doc.exists) {
        setUserData({Id: doc.id, ...doc.data()});
      } else {
      }
    });
    return () => unsubscribe();
  }, [user]);
  const optionimage = {
    ...styles.headerback,
    height: scale(25),
    width: scale(25),
    borderRadius: scale(100),
    padding: 0,
    marginRight: responsiveScreenWidth(5),
  };

  return (
    <View style={styles.header}>
      <View style={{width: '15%'}}>
        {props.Image && (
          <TouchableOpacity
            style={{marginLeft: responsiveScreenWidth(4)}}
            onPress={props.onPress}>
            <Image style={styles.headerback} source={appIcons.back} />
          </TouchableOpacity>
        )}
      </View>

      {props.Image || props.options ? (
        <View style={styles.headerWithImage}>
          <Image style={styles.logo} source={appImages.logo} />
        </View>
      ) : (
        <View style={styles.headerWithoutImage}>
          <Image style={styles.logo} source={appImages.logo} />
        </View>
      )}
      <View style={{width: '15%'}}>
        {props.options && (
          <TouchableOpacity
            style={{marginLeft: responsiveScreenWidth(5)}}
            onPress={props.press}>
            {userData?.profileImage ? (
              <Image
                style={optionimage}
                source={{uri: userData.profileImage}}
              />
            ) : (
              <Image style={optionimage} source={appIcons.profile} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: responsiveScreenHeight(7.5),
    backgroundColor: Colors.backgroud1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  headerWithImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerWithoutImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  headerback: {
    height: scale(25),
    width: scale(22),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: scale(140),
    height: scale(25),
    alignSelf: 'center',
  },
});
