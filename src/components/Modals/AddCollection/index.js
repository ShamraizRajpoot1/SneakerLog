import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
} from 'react-native';
import React, {useState, useContext} from 'react';
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
import Input from '../../Input';
import {AuthContext} from '../../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const AddCollection = props => {
  const {user} = useContext(AuthContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const toggleSwitch = () =>{ setIsEnabled(previousState => !previousState);}

  const handleButtonClick = async () => {
    props.onBackdropPress();
    const newData = await createNewDoc();
    if (newData) {
      props.onPress(newData);
    }
  };
  const createNewDoc = async () => {
    const userId = user.uid;

    try {
      console.log('Collection Name:', collectionName);

      if (!collectionName || collectionName.trim() === '') {
        console.error('Collection name cannot be empty');
        return null;
      }

      const collectionRef = firestore().collection('Collections');

      const docData = {
        collectionName: collectionName,
        isPrivate: isEnabled,
        userId: userId,
      };

      const docRef = await collectionRef.add(docData);
      const docId = docRef.id;

      const newDoc = await firestore()
        .collection('Collections')
        .doc(docId)
        .get();

      if (newDoc.exists) {
        const data = newDoc.data();
        const formattedData = {
          id: docId,
          name: data.collectionName,
          sneakers: data.sneakers || [],
          price: data.price,
          isPrivate: data.isPrivate,
          sneakerCount: data.sneakerCount,
          favorite: data.favorite || null,
        };
        console.log('New document created:', formattedData);
        return formattedData;
      } else {
        console.error('Document does not exist');
        return null;
      }
    } catch (error) {
      console.error('Error adding document: ', error);
      return null;
    }
  };

  return (
    <Modal
      transparent={true}
      onRequestClose={props.onBackdropPress}
      onBackdropPress={props.onBackdropPress}>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={props.onBackdropPress}>
        <View
          style={styles.modalContent}
          onStartShouldSetResponder={() => true}>
          <Text style={styles.modaltxt}>NEW COLLECTION NAME</Text>
          <View style={{alignItems: 'center', width: '95%'}}>
            <Input
              family={true}
              margin={true}
              onChangeText={text => setCollectionName(text)}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.privatetext}>PRIVATE</Text>
            <Switch
              trackColor={{false: '#767577', true: '#83e7b6'}}
              thumbColor={isEnabled ? '#08cb6b' : '#FFFFFF'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View
            style={[
              styles.row,
              {
                width: '100%',
                borderTopWidth: responsiveScreenWidth(0.1),
                marginBottom: responsiveHeight(1),
              },
            ]}>
            <TouchableOpacity
              onPress={props.onBackdropPress}
              style={[
                styles.textContainer,
                {borderRightWidth: responsiveScreenHeight(0.1)},
              ]}>
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.textContainer}
              onPress={handleButtonClick}>
              <Text style={styles.text}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default AddCollection;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.modalBackground,
  },
  modalContent: {
    backgroundColor: Colors.fieldBackground,
    width: responsiveScreenWidth(86),
    height: responsiveScreenHeight(30), // Adjust the height as needed
    borderRadius: scale(6),
    alignItems: 'center', // Align the content horizontally
    justifyContent: 'center', // Align the content vertically
  },
  modaltxt: {
    fontSize: fontSize.h1,
    fontFamily: fontFamily.LatoBold,
    fontWeight: '900',
    color: Colors.blackText,
    marginVertical: responsiveScreenHeight(1.5),
  },
  privatetext: {
    fontSize: fontSize.fieldText,
    fontFamily: fontFamily.LatoBold,
    color: Colors.blackText,
    marginRight: responsiveWidth(4),
  },
  row: {
    width: '90%',
    flexDirection: 'row',
    marginTop: responsiveScreenHeight(2),
  },
  textContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveScreenHeight(7),
  },
  text: {
    fontSize: fontSize.h1,
    fontFamily: fontFamily.LatoRegular,
    color: Colors.blue,
  },
});
