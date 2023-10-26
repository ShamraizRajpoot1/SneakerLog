import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import InputField from '../../InputField';
import {Colors} from '../../../services/utilities/Colors';
import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {scale} from 'react-native-size-matters';
import {AppStyles} from '../../../services/utilities/AppStyles';
import {appIcons} from '../../../services/utilities/Assets';
import {AuthContext} from '../../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const CollectionModal = props => {
  const {user} = useContext(AuthContext);
  const [collections, setCollections] = useState([]);
  const [userCollection, setUserCollection] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const userIdToQuery = props.data ? props.data[0].userId : null;
        console.log('userIdToQuery:', userIdToQuery);
        const collectionRef = firestore().collection('Collections');
        collectionRef
          .where('userId', '==', userIdToQuery)
          .onSnapshot(snapshot => {
            const fetchedCollections = [];
            snapshot.forEach(doc => {
              const data = doc.data();
              const {collectionName, isPrivate, sneakers} = data;
             
              const sneakerCount = sneakers ? sneakers.length : 0;
              if (!isPrivate) {
                fetchedCollections.push({
                  id: doc.id,
                  name: collectionName,
                  isPrivate: isPrivate,
                  sneakerCount: sneakerCount,
                });
              }
            });

            setUserCollection(fetchedCollections);
          });
      } catch (error) {
        console.error('Error fetching collections: ', error);
      }
    };

    fetchCollections();
  }, [props.data]);
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const userId = user.uid;

        const collectionRef = firestore().collection('Collections');
        collectionRef.where('userId', '==', userId).onSnapshot(snapshot => {
          const fetchedCollections = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            const {collectionName, isPrivate, sneakers} = data;
            const sneakerCount = sneakers ? sneakers.length : 0;
            fetchedCollections.push({
              id: doc.id,
              name: collectionName,
              isPrivate: isPrivate,
              sneakerCount: sneakerCount,
            });
          });

          setCollections(fetchedCollections);
        });
      } catch (error) {
        console.error('Error fetching collections: ', error);
      }
    };

    fetchCollections();
  }, [user.uid]);
  const renderItem = ({item, index}) => (
    <View>
      <TouchableOpacity
        onPress={() => props.onPress(item)}
        style={[
          AppStyles.collection,
          {marginHorizontal: responsiveScreenWidth(5)},
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={appIcons.star}
            style={{
              width: scale(25),
              height: scale(25),
              marginVertical: responsiveScreenHeight(2),
            }}
          />
          <View style={{marginLeft: responsiveScreenWidth(4)}}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.sneakerCount}>
                {item.sneakerCount} Sneakers in Collection
              </Text>
              {item.isPrivate && (
                <Image
                  source={appIcons.pvt}
                  style={{
                    width: scale(18),
                    height: scale(18),
                    marginLeft: responsiveWidth(2),
                  }}
                />
              )}
            </View>
          </View>
        </View>

        <Image style={AppStyles.arrowRight} source={appIcons.arrowRight} />
      </TouchableOpacity>
      
      {index < (props.data ? userCollection.length  : collections.length) && (
  <View style={[AppStyles.line]} />
)}
    </View>
  );
  return (
    <Modal
      transparent={true}
      visible={props.isVisible}
      onRequestClose={props.onBackdropPress}>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={props.onBackdropPress}>
        <View
          style={styles.modalContent}
          onStartShouldSetResponder={() => true}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>My Collections</Text>
          </View>
          <View style={{flex: 1}}>
            {props.data ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={userCollection}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
              />
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={collections}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default CollectionModal;

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: '92.5%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: Colors.modalBackground,
  },
  modalContent: {
    backgroundColor: Colors.fieldBackground,
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(67),
    borderTopLeftRadius: scale(6),
    borderTopRightRadius: scale(6),
    justifyContent: 'space-between',
  },
  titleContainer: {
    width: '100%',
    height: responsiveScreenHeight(10),
    borderBottomWidth: scale(0.7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fontFamily.LatoBold,
    fontWeight: 'bold',
    fontSize: fontSize.h4,
    color: Colors.blackText,
  },
});
