import {
    Modal,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Switch,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    ScrollView
  } from 'react-native';
  import React, {useState} from 'react';
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
import { AppStyles } from '../../../services/utilities/AppStyles';
import DropDownPicker from 'react-native-dropdown-picker';
const ProductEdit = (props) => {
    const [selectedValue, setSelectedValue] = useState('');
  const items = ['Purchased', 'Sold', 'Want', 'Holy Grail', 'Gift'];
    const [selectedOption, setSelectedOption] = useState('New');

    const handleOptionPress = (option) => {
      setSelectedOption(option);
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
        <View style={styles.modalContent}>
        <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
        <TouchableWithoutFeedback>
          <ScrollView
          showsVerticalScrollIndicator={false}
            style={{flex:1,}}
            contentContainerStyle={[AppStyles.contentContainer]}
            keyboardShouldPersistTaps="handled">
                <View style={{alignItems:'center'}}>
          <Text style={styles.modaltxt}>EDIT TFF</Text>
          <View style={[AppStyles.margin,{width:'95%', marginLeft: responsiveWidth(5)}]}>
             <Text style={[AppStyles.field]}>SNEAKER</Text>
          <Input family={true} margin={true} lebal={"SNEAKER"}/>
          </View>
          <View style={[AppStyles.margin,{width:'95%', marginLeft: responsiveWidth(5)}]}>
             <Text style={[AppStyles.field]}>SIZE</Text>
          <Input family={true} margin={true} lebal={"SNEAKER"}/>
          </View>
          <View style={[AppStyles.margin, { width: '95%' }]}>
      <Text style={AppStyles.field}>CONDITION</Text>
      <View style={AppStyles.textinputcontainer}>
        <TouchableOpacity
          style={[
            AppStyles.touchable,
            selectedOption === 'New' && {
              backgroundColor: Colors.barBackground,
            },
          ]}
          onPress={() => handleOptionPress('New')}>
          <Text
            style={[
                AppStyles.touchText,
              selectedOption === 'New' && { color: Colors.lebal },
            ]}>
            New
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            AppStyles.touchable1,
            selectedOption === 'Used' && {
              backgroundColor: Colors.barBackground,
            },
          ]}
          onPress={() => handleOptionPress('Used')}>
          <Text
            style={[
              AppStyles.touchText,
              selectedOption === 'Used' && { color: Colors.lebal },
            ]}>
            Used
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={[AppStyles.margin, { width: '95%' }]}>
            <Text style={AppStyles.field}>QUANTITY</Text>
              <View style={[AppStyles.row2, {marginTop:responsiveHeight(1),height: responsiveHeight(6), marginLeft: 0,}]}>
                <TouchableOpacity style={[AppStyles.button1,{borderRadius: scale(5),}]}>
                  <Text style={[AppStyles.plus, {color: Colors.blackText}]}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={[AppStyles.touchText, {alignSelf: 'center'}]}>1</Text>
                <TouchableOpacity
                  style={[
                    AppStyles.button1,
                    {backgroundColor: Colors.barBackground,borderRadius: scale(5)},
                  ]}>
                  <Text style={[AppStyles.plus,{color:Colors.lebal}]}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[AppStyles.margin, { width: '95%' }]}>
        <Text style={AppStyles.field}>SNEAKER STATUS</Text>
        <DropDownPicker
          items={items.map((item) => ({
            label: item,
            value: item,
          }))}
          defaultValue={selectedValue}
          containerStyle={AppStyles.container}
          style={AppStyles.dropdown}
          itemStyle={AppStyles.itemStyle}
          labelStyle={AppStyles.labelStyle}
          dropDownStyle={AppStyles.dropDown}
          onChangeItem={(item) => setSelectedValue(item.value)}
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
            <TouchableOpacity onPress={props.onBackdropPress}
              style={[
                styles.textContainer,
                {borderRightWidth: responsiveScreenHeight(0.1)},
              ]}>
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textContainer} onPress={props.onBackdropPress}>
              <Text style={styles.text}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

export default ProductEdit

const styles = StyleSheet.create({
    modalContainer: {
        flex:1,
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
})