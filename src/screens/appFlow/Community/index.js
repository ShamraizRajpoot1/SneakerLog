import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {appIcons, appImages} from '../../../services/utilities/Assets';
import {AppStyles} from '../../../services/utilities/AppStyles';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../../services/utilities/Colors';
import {scale} from 'react-native-size-matters';
import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
import {Report, ReportModal, ThankYou} from '../../../components/Modals';
import {AuthContext} from '../../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const Comunity = () => {
  const {user} = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [sneakers, setSneakers] = useState([]);
  useEffect(() => {
    const fetchFollowersData = async () => {
      try {
        const doc = await firestore().collection('Users').doc(user.uid).get();
        const userData = doc.data();
        if (userData && userData.followersData) {
          setUsers(userData.followersData);
        }
      } catch (error) {
        console.error('Error fetching followers data: ', error);
      }
    };

    fetchFollowersData();
  }, []);
  useEffect(() => {
    const fetchSneakers = async followerId => {
      try {
        const fetchedSneakers = [];
        const collectionsSnapshot = await firestore()
          .collection('Collections')
          .get();

        collectionsSnapshot.forEach(doc => {
          const data = doc.data();
          if (data.userId === followerId && data.sneakers && !data.isPrivate) {
            fetchedSneakers.push(...data.sneakers);
          }
        });

        setSneakers(prevSneakers => [...prevSneakers, fetchedSneakers]);
      } catch (error) {
        console.error('Error fetching sneakers data: ', error);
      }
    };

    users.forEach(follower => {
      fetchSneakers(follower.Id);
    });
  }, [users]);

  const collection = {
    ...AppStyles.collection,
    borderWidth: scale(0.7),
    marginTop: responsiveHeight(1.5),
    borderRadius: scale(8),
    padding: responsiveWidth(2),
  };
  const [report, setReport] = useState(false);
  const [reportUser, setReportUser] = useState(false);
  const [thankYou, setThankYou] = useState(false);
  const toggle = () => {
    setReport(prev => !prev);
  };
  const reporttoggle = () => {
    setReportUser(prev => !prev);
  };
  const thanktoggle = () => {
    setThankYou(prev => !prev);
  };

  const thank = () => {
    reporttoggle();
    thanktoggle();
  };
  const renderItem = ({item, index}) => (
    <View key={index.toString()} style={styles.userContainer}>
      <View style={styles.userDetails}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {users[index].profileImage ? (
            <Image
              source={{uri: users[index].profileImage}}
              style={styles.userImage}
            />
          ) : (
            <Image source={appIcons.profile} style={styles.userImage} />
          )}

          <View style={styles.nameContainer}>
            <Text style={styles.listdet2}>{users[index].name}</Text>
            <Text style={styles.listdet3}>{users[index].userName}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.listtime}>3 hours ago</Text>
          <TouchableOpacity onPress={toggle}>
            <Image
              source={appIcons.threeDots}
              style={{
                height: scale(20),
                width: scale(20),
                marginBottom: responsiveHeight(2),
                tintColor: Colors.blackText,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.productList}>
        {Array.isArray(sneakers[index]) &&
          sneakers[index].map((product, productIndex) => (
            <View key={product.Id.toString()} style={collection}>
              <View style={styles.inner1}>
                {product.image && (
                  <Image
                    source={{uri: product.image}}
                    style={styles.productpic}
                  />
                )}
                <View style={styles.productDet}>
                  <Text style={styles.pname}>{product.sneakerName}</Text>
                  <Text style={styles.pcolor}>{product.colorway}</Text>
                  <Text style={styles.psize}>Size {product.size}</Text>
                  <View
                    style={{
                      marginTop: responsiveHeight(0.2),
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity>
                      <Image source={appIcons.heartFill} style={styles.like1} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.action}>
                <Text style={styles.pAction}>Added</Text>
              </View>
            </View>
          ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        data={users}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
      {report && (
        <ReportModal
          isVisible={report}
          report={true}
          onBackdropPress={toggle}
          onPress={reporttoggle}
        />
      )}
      {reportUser && (
        <Report
          isVisible={reportUser}
          onBackdropPress={reporttoggle}
          onPress={thank}
        />
      )}
      {thankYou && (
        <ReportModal isVisible={thankYou} onBackdropPress={thanktoggle} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  nameContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    marginLeft: responsiveWidth(2),
  },
  productpic: {
    width: scale(40),
    height: scale(65),
    resizeMode: 'contain',
  },
  productDet: {
    marginLeft: responsiveScreenWidth(2),
  },
  inner1: {flexDirection: 'row', justifyContent: 'space-between'},
  sneakersDet: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    marginLeft: responsiveWidth(3.8),
  },
  container: {
    flex: 1,
    padding: 16,
  },
  pname: {
    color: Colors.text3,
    fontSize: fontSize.usernameText,
    fontFamily: fontFamily.LatoBlack,
  },
  pcolor: {
    color: Colors.text4,
    fontSize: fontSize.userNameComunity,
    fontFamily: fontFamily.LatoRegular,
  },
  psize: {
    color: Colors.text4,
    fontSize: fontSize.userNameComunity,
    fontFamily: fontFamily.LatoRegular,
  },

  pAction: {
    color: Colors.text5,
    fontSize: fontSize.userNameComunity,
    fontFamily: fontFamily.LatoBold,
  },
  action: {
    height: '100%',
    right: responsiveWidth(1),
  },
  userContainer: {
    marginBottom: responsiveHeight(2),
  },
  like1: {height: scale(18), width: scale(18)},
  userDetails: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: responsiveHeight(0.5),
  },
  userImage: {
    width: scale(35),
    height: scale(35),
    borderRadius: scale(100),
  },
  sneakersList: {
    flex: 2,
    marginTop: responsiveHeight(1),
  },
  listdet2: {
    color: Colors.text3,
    fontSize: responsiveFontSize(1.6),
    fontFamily: fontFamily.LatoBlack,
  },
  listdet3: {
    color: Colors.text4,
    fontSize: fontSize.userNameComunity,
    fontFamily: fontFamily.LatoRegular,
  },
  listtime: {
    alignSelf: 'center',
    color: Colors.text4,
    fontSize: fontSize.userNameComunity,
    fontFamily: fontFamily.LatoRegular,
    bottom: responsiveHeight(1),
  },
  sneakerspic: {height: scale(50), width: scale(50), resizeMode: 'contain'},
});

export default Comunity;
