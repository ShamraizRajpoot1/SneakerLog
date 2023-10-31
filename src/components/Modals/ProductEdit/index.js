import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState, useRef} from 'react';
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
import Input from '../../Input';
import {AppStyles} from '../../../services/utilities/AppStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import {appIcons} from '../../../services/utilities/Assets';
import firestore from '@react-native-firebase/firestore';
import Size from '../Size';
const ProductEdit = props => {
  const {item} = props;
  if (!item) {
    
    return null; 
  }
  const data = [
    {label: 'Purchased', value: 'Purchased'},
    {label: 'Sold', value: 'Sold'},
    {label: 'Want', value: 'Want'},
    {label: 'Holy Grail', value: 'Holy Grail'},
    {label: 'Gift', value: 'Gift'},
  ];
  const [name, setSneakerName] = useState(item.name || '');
  const [size, setSize] = useState(props.item.size || '');
  const [condition, setCondition] = useState(item.condition || 'New');
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [status, setStatus] = useState(item.status || '');
  const [isOpen, setIsOpen] = useState(false);
  const [sizemodal, setSizemodal] = useState(false);
  const scrollViewRef = useRef();

  const handleCreate = async () => {
    if (name) {
      const db = firestore();
      const collectionRef = db.collection('Collections');
  
      const snapshot = await collectionRef.get();
  
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }
  
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.sneakers) {
          const sneakers = data.sneakers;
          const updatedSneakers = sneakers.map(sneaker => {
            if (sneaker.id === item.id) {
              return {
                ...sneaker,
                name: name,
                size: size,
                condition: condition,
                quantity: quantity,
                status: status,
              };
            }
            return sneaker;
          });
  
          doc.ref
            .update({ sneakers: updatedSneakers })
            .then(() => {
              console.log('Document successfully updated in Firestore!');
            })
            .catch((error) => {
              console.error('Error updating document: ', error);
            });
        }
      });
    }
    props.onBackdropPress();
  };
  
  const handleDropdownOpen = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
    }
  };
  const sizeToggle = () => {
    setSizemodal(prev => !prev);
  };
  const handleSneakerNameChange = value => {
    setSneakerName(value);
  };

  const handleOptionPress = option => {
    setCondition(option);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };
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
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
            <TouchableWithoutFeedback>
              <ScrollView
                ref={scrollViewRef}
                onLayout={() => handleDropdownOpen()}
                showsVerticalScrollIndicator={false}
                style={{flex: 1}}
                contentContainerStyle={AppStyles.contentContainer}
                keyboardShouldPersistTaps="handled">
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.modaltxt}>
                    EDIT {item ? item.name : null}
                  </Text>
                  <View
                    style={[
                      AppStyles.margin,
                      {width: '95%', marginLeft: responsiveWidth(5)},
                    ]}>
                    <Text style={[AppStyles.field]}>SNEAKER</Text>
                    <Input
                      family={true}
                      margin={true}
                      value={name}
                      onChangeText={handleSneakerNameChange}
                    />
                  </View>
                  <View
                    style={[
                      AppStyles.margin,
                      {width: '95%', marginLeft: responsiveWidth(5)},
                    ]}>
                    <Text style={[AppStyles.field]}>SIZE</Text>
                    <TouchableOpacity
                      onPress={sizeToggle}
                      style={styles.sizeContainer}>
                      <Text
                        style={[
                          AppStyles.fvrtText,
                          {
                            color: Colors.text3,
                            marginVertical: 0,
                            width: '90%',
                          },
                        ]}>
                        {size}
                      </Text>
                      <View
                        style={{
                          width: '5%',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          style={{width: scale(12), height: scale(15)}}
                          source={appIcons.arrow}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={[AppStyles.margin, {width: '95%'}]}>
                    <Text style={AppStyles.field}>CONDITION</Text>
                    <View style={AppStyles.textinputcontainer}>
                      <TouchableOpacity
                        style={[
                          AppStyles.touchable,
                          condition === 'New' && {
                            backgroundColor: Colors.barBackground,
                          },
                        ]}
                        onPress={() => handleOptionPress('New')}>
                        <Text
                          style={[
                            AppStyles.touchText,
                            condition === 'New' && {color: Colors.lebal},
                          ]}>
                          New
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          AppStyles.touchable1,
                          condition === 'Used' && {
                            backgroundColor: Colors.barBackground,
                          },
                        ]}
                        onPress={() => handleOptionPress('Used')}>
                        <Text
                          style={[
                            AppStyles.touchText,
                            condition === 'Used' && {color: Colors.lebal},
                          ]}>
                          Used
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={[AppStyles.margin, {width: '95%'}]}>
                    <Text style={AppStyles.field}>QUANTITY</Text>
                    <View
                      style={[
                        AppStyles.row2,
                        {
                          marginTop: responsiveHeight(1),
                          height: responsiveHeight(6),
                          marginLeft: 0,
                        },
                      ]}>
                      <TouchableOpacity
                        onPress={decreaseQuantity}
                        style={[AppStyles.button1, {borderRadius: scale(5)}]}>
                        <Text
                          style={[AppStyles.plus, {color: Colors.blackText}]}>
                          -
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={[AppStyles.touchText, {alignSelf: 'center'}]}>
                        {quantity}
                      </Text>
                      <TouchableOpacity
                        onPress={increaseQuantity}
                        style={[
                          AppStyles.button1,
                          {
                            backgroundColor: Colors.barBackground,
                            borderRadius: scale(5),
                          },
                        ]}>
                        <Text style={[AppStyles.plus, {color: Colors.lebal}]}>
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={[AppStyles.margin, {width: '95%'}]}>
                    <Text style={AppStyles.field}>SNEAKER STATUS</Text>
                    <DropDownPicker
                      items={data.map((item, index) => ({
                        label: item.label,
                        value: item.value,
                        key: index.toString(),
                      }))}
                      dropDownDirection={-45}
                      arrowColor={Colors.blackText}
                      labelStyle={styles.label}
                      placeholder={' '}
                      dropDownMaxHeight={170}
                      containerStyle={[
                        AppStyles.dcontainer,
                        {
                          width: responsiveScreenWidth(72),
                          marginBottom: isOpen
                            ? responsiveScreenHeight(25)
                            : null,
                        },
                      ]}
                      style={[
                        AppStyles.Dropdown,
                        {width: responsiveScreenWidth(72)},
                      ]}
                      setValue={value => setStatus(value)}
                      setOpen={() => setIsOpen(!isOpen)}
                      open={isOpen}
                      value={status}
                      dropDownStyle={[
                        AppStyles.dropDownStyle,
                        {width: responsiveScreenWidth(72)},
                      ]}
                    />
                  </View>
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>

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
              onPress={handleCreate}>
              <Text style={styles.text}>Create</Text>
            </TouchableOpacity>
          </View>
          {sizemodal && (
            <Size
              onBackdropPress={sizeToggle}
              onChange={setSize}
              disable={true}
            />
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ProductEdit;

const styles = StyleSheet.create({
  sizeContainer: {
    marginTop: responsiveScreenHeight(1),
    width: responsiveScreenWidth(72),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: scale(0.7),
    height: responsiveScreenHeight(5),
    borderRadius: scale(3),
    borderColor: Colors.border1,
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.modalBackground,
  },
  modalContent: {
    backgroundColor: Colors.fieldBackground,
    width: responsiveScreenWidth(80),
    height: responsiveScreenHeight(62),
    borderRadius: scale(6),
    paddingTop: responsiveHeight(1.5),
  },
  modaltxt: {
    fontSize: fontSize.h3,
    fontFamily: fontFamily.LatoBold,
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
