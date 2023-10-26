import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Colors } from '../../../services/utilities/Colors';
import { fontFamily, fontSize } from '../../../services/utilities/Fonts';
import {
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import Input from '../../Input';
import { AppStyles } from '../../../services/utilities/AppStyles';
import { appIcons } from '../../../services/utilities/Assets';

const Size = (props) => {
  const data = [
    1,
    1.5,
    2,
    2.5,
    3,
    3.5,
    4,
    4.5,
    5,
    5.5,
    6,
    6.5,
    7,
    7.5,
    8,
    8.5,
    9,
    9.5,
    10,
    10.5,
    11,
    11.5,
    12,
    12.5,
    13,
    13.5,
    14,
    14.5,
    15,
    15.5,
    16,
    16.5,
    17,
    17.5,
    18,
    18.5,
    19,
    19.5,
    20,
    'others',
  ];

  const [selectedSize, setSelectedSize] = useState(null);

  const numColumns = 4;
  const numRows = Math.ceil(data.length / numColumns);

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
    if (props.onChange) {
      props.onChange(size);
    }
    if (props.onBackdropPress) {
      props.onBackdropPress();
    }
  };

  const sizeGuide = () =>{
    props.onPress();
    
  }

  return (
    <Modal
      transparent={true}
      visible={props.isVisible}
      onRequestClose={props.onBackdropPress}>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={props.onBackdropPress}>
        <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
        <View style={styles.row}>
              <Text style={[AppStyles.labelStyle, { fontSize: fontSize.lebal }]}>
                Select Sneaker Size
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: responsiveScreenWidth(5),
                }}>
                <Image style={styles.rular} source={appIcons.rular} />
                <TouchableOpacity onPress={sizeGuide}>
                  <Text
                    style={[
                      AppStyles.labelStyle,
                      { fontSize: fontSize.lebal, color: Colors.forgot },
                    ]}>
                    Size Guide
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            

            {Array.from({ length: numRows }).map((_, rowIndex) => (
              <View key={rowIndex} style={styles.rowContainer}>
                {data
                  .slice(rowIndex * numColumns, (rowIndex + 1) * numColumns)
                  .map((item) => (
                    <TouchableOpacity
                      key={item.toString()}
                      style={[
                        styles.textContainer,
                        item === props.value && styles.selectedSize,
                      ]}
                      onPress={() => handleSizeSelection(item)}>
                      <Text
                        style={[
                          styles.text,
                          item === props.value && styles.selectedSize,
                        ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            ))}
            
          </ScrollView>
          <TouchableOpacity style={styles.bottonContainer} onPress={props.onBackdropPress}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default Size;

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
    height: "97%",
    borderTopRightRadius: scale(6),
    borderTopLeftRadius: scale(6),
    padding: responsiveScreenWidth(5),
    paddingBottom: responsiveScreenHeight(1)
  },
  modaltxt: {
    fontSize: fontSize.h2,
    fontFamily: fontFamily.LatoHeavy,
    fontWeight: 'bold',
    color: Colors.text3,
    //marginBottom: responsiveScreenHeight(2.5),
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems:'center'
  },
  rowContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    height: responsiveHeight(8),
    width: responsiveWidth(17),
    borderWidth: responsiveScreenWidth(0.15),
    borderRadius: scale(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.bordor2,
    marginHorizontal: responsiveScreenWidth(2.2),
    marginVertical: responsiveScreenHeight(1)
  },
  text: {
    fontSize: fontSize.h3,
    color: Colors.text3,
  },
  selectedSize: {
    backgroundColor: Colors.barBackground,
    color: Colors.lebal,
  },
  rular: {
    width: scale(18),
    height: scale(20),
    marginRight: responsiveScreenWidth(2),
  },
  row: {
    marginLeft: responsiveScreenHeight(1),
    marginTop: responsiveHeight(0.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: responsiveScreenHeight(5),
  },
  bottonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: scale(1),
    borderColor: Colors.border1,
    height: responsiveScreenHeight(6),
  },
  cancel: {
    color: Colors.blue,
    fontSize: fontSize.h2,
    fontFamily: fontFamily.LatoBold,
  },
});
