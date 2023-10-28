import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {AppStyles} from '../../../services/utilities/AppStyles';
import {Colors} from '../../../services/utilities/Colors';
import Header from '../../../components/Header';
import {scale} from 'react-native-size-matters';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
import {appIcons} from '../../../services/utilities/Assets';
import ProductView from '../../../components/ProductView';
import UserView from '../../../components/UserView';
import EventsView from '../../../components/EventsView';
import {AddCollection} from '../../../components/Modals';
import Comunity from '../Community';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../navigation/AuthProvider';

const Home = ({navigation}) => {
  const {user} = useContext(AuthContext)
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showTopTab, setShowTopTab] = useState(false); // Added state to control the visibility of the top tab

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersCollection = firestore().collection('Users');
        usersCollection.onSnapshot(async (snapshot) => {
          const fetchedUsers = [];
          snapshot.forEach((doc) => {
            fetchedUsers.push({ Id: doc.id, ...doc.data() });
          });
          setUsers(fetchedUsers);
          if (user && user.uid) {
            const userDoc = firestore().collection('Users').doc(user.uid);
            const doc = await userDoc.get();
            const userData = doc.data();
            if (userData && userData.followersData && userData.followersData.length > 0) {
              setShowTopTab(true);
            }
          }
        });
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };
  
    fetchData();
  }, [user]);
  
  const toggleCollection = () => {
    setModalVisible(prev => !prev);
  };
  const profile = () => {
    navigation.navigate('Profile');
  };
  const AllMembers = () => {
    navigation.navigate('AllMembers',{users});
  };
  const EventsDetail = () => {
    navigation.navigate('EventsDetail');
  };
  const Products = () => {
    navigation.navigate('Products');
  };
  const Events = () => {
    navigation.navigate('Events');
  };
  const details = (itemId) => {
    navigation.navigate('UserDetails', { selectedUserId: itemId });
  };
  const [selectedTab, setSelectedTab] = useState('MY CLOSET');

  return (
    <>
      <Header options={true} press={profile} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
        <TouchableWithoutFeedback>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{flex: 1}}
            contentContainerStyle={[AppStyles.contentContainer]}
            keyboardShouldPersistTaps="handled">
             {showTopTab && ( 
        <View style={styles.topTab}>
          <TouchableOpacity
            style={selectedTab === 'MY CLOSET' ? styles.topTabbtn : styles.topTabbtn2}
            onPress={() => setSelectedTab('MY CLOSET')}>
            <Text
              style={
                selectedTab === 'MY CLOSET' ? styles.tabactiveText : styles.inActiveText
              }>
              MY CLOSET
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={selectedTab === 'COMMUNITY' ? styles.topTabbtn : styles.topTabbtn2}
            onPress={() => setSelectedTab('COMMUNITY')}>
            <Text
              style={
                selectedTab === 'COMMUNITY' ? styles.tabactiveText : styles.inActiveText
              }>
              COMMUNITY
            </Text>
          </TouchableOpacity>
        </View>
      )}
            {selectedTab === 'MY CLOSET' ? (
              <View>
                <Text style={[AppStyles.fvrtText, {marginLeft: '5%'}]}>
                  MY FOVORITE COLLECTIONS
                </Text>
                <TouchableOpacity
                  style={AppStyles.addCollection}
                  onPress={toggleCollection}>
                  <Image style={AppStyles.add} source={appIcons.add} />
                  <Text style={AppStyles.redtext}>ADD A COLLECTION</Text>
                </TouchableOpacity>
                <View style={styles.product}>
                  <View style={AppStyles.row2}>
                    <Text style={AppStyles.fvrtText}>RELEASE DATE</Text>
                    <TouchableOpacity onPress={Products}>
                      <Text
                        style={[
                          AppStyles.forgot,
                          {fontFamily: fontFamily.LatoBold},
                        ]}>
                        View All
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <ProductView sliceSize={7} />
                </View>
                <View
                  style={[
                    styles.product,
                    {marginTop: responsiveScreenHeight(-2)},
                  ]}>
                  <View style={[AppStyles.row2,]}>
                    <Text style={AppStyles.fvrtText}>MEMBERS</Text>
                    <TouchableOpacity onPress={AllMembers}>
                      <Text
                        style={[
                          AppStyles.forgot,
                          {fontFamily: fontFamily.LatoBold},
                        ]}>
                        View All
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <UserView onPress={details} members={users}/>
                </View>
                <Text
                  style={[
                    AppStyles.fvrtText,
                    {marginLeft: '5%', marginTop: responsiveScreenHeight(2)},
                  ]}>
                  UPCOMING EVENTS
                </Text>
                <EventsView onPress={EventsDetail} sliceSize={5} />
                <TouchableOpacity onPress={Events}>
                  <Text
                    style={[
                      AppStyles.forgot,
                      {fontFamily: fontFamily.LatoBold, alignSelf: 'center'}
                    ]}>
                    View All
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Comunity />
            )}
            {modalVisible && (
              <AddCollection
                isVisible={modalVisible}
                onBackdropPress={toggleCollection}
                //onChangeText={}
                //value={}
                onPress={toggleCollection}
              />
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  text: {
    marginLeft: responsiveScreenWidth(10),
    marginTop: responsiveScreenHeight(10),
  },

  collection: {
    fontSize: fontSize.h1,
  },

  product: {
    height: responsiveScreenHeight(25),
  },
  topTab: {
    flexDirection: 'row',
    marginTop: responsiveHeight(2),
    height: responsiveHeight(6.5),
    width: responsiveWidth(90),
    backgroundColor: '#ebebeb',
    alignSelf: 'center',
    borderRadius: 50,
    justifyContent: 'space-evenly',
    borderColor: '#cecbd5',
    borderWidth: 0.5,
  },
  topTabbtn: {
    width: '50%',
    height: '100%',
    backgroundColor: '#D9173B',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTabbtn2: {
    width: '50%',
    height: '100%',
    backgroundColor: '#ebebeb',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabactiveText: {
    fontFamily: 'Lato-Bold',
    fontWeight: 'bold',
    color: 'white',
    fontSize: responsiveFontSize(2),
  },
  inActiveText: {
    fontFamily: 'Lato-Bold',
    fontWeight: 'bold',
    color: '#cecbd5',
    fontSize: responsiveFontSize(2),
  },
});
