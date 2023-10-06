import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { appImages } from '../../services/utilities/Assets';
import { fontFamily, fontSize } from '../../services/utilities/Fonts';
import { Colors } from '../../services/utilities/Colors';
import { scale } from 'react-native-size-matters';
import { AppStyles } from '../../services/utilities/AppStyles';

const BrandView = (props) => {
  const [Releasedata] = useState([
    {
      name: 'Converse Aeon Active CX',
      releaseDate: '2023-04-12',
      image: appImages.brand1,
    },
    {
      name: 'Converse Aeon Active C',
      releaseDate: '2023-04-12',
      image: appImages.brand2,
    },
    {
        name: 'Converse Aeon Active ',
        releaseDate: '2023-04-12',
        image: appImages.brand3,
      },
      {
        name: 'Converse Aeon Active 5',
        releaseDate: '2023-04-12',
        image: appImages.brand4,
      },
      {
        name: 'Converse Aeon Active 4',
        releaseDate: '2023-04-12',
        image: appImages.brand5,
      },
      {
        name: 'Converse Aeon Active CX5',
        releaseDate: '2023-04-12',
        image: appImages.brand6,
      },
      {
        name: 'Converse Aeon Active C7X',
        releaseDate: '2023-04-12',
        image: appImages.brand7,
      },
      {
        name: 'Converse Aeon Active 54',
        releaseDate: '2023-04-12',
        image: appImages.brand8,
      },
      {
        name: 'Converse Aeon Active CXh',
        releaseDate: '2023-04-12',
        image: appImages.brand9,
      },
      {
        name: 'Converse Aeon Active CX4',
        releaseDate: '2023-04-12',
        image: appImages.brand10,
      },
      {
        name: 'Converse Aeon Active ChX',
        releaseDate: '2023-04-12',
        image: appImages.brand11,
      },
      {
        name: 'Converse Aeon Active CfX',
        releaseDate: '2023-04-12',
        image: appImages.brand12,
      },
      {
        name: 'Converse Aeon Active CgX',
        releaseDate: '2023-04-12',
        image: appImages.brand13,
      },
      {
        name: 'Converse Aeon Active CjX',
        releaseDate: '2023-04-12',
        image: appImages.brand14,
      },
      {
        name: 'Converse Aeon Active CXs',
        releaseDate: '2023-04-12',
        image: appImages.brand15,
      },
      {
        name: 'Converse Aeon Active CXdf',
        releaseDate: '2023-04-12',
        image: appImages.brand16,
      },
      {
        name: 'Converse Aeon Active CXf',
        releaseDate: '2023-04-12',
        image: appImages.brand17,
      },
      {
        name: 'Converse Aeon Active CXfd',
        releaseDate: '2023-04-12',
        image: appImages.brand18,
      },

  ]);

  const [selectedItems, setSelectedItems] = useState([]);

  const displayedData = props.sliceSize ? Releasedata.slice(0, props.sliceSize) : Releasedata;

  const handleItemPress = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[AppStyles.row2, { marginTop: responsiveWidth(1) }]}>
        <Text style={AppStyles.fvrtText}>SNEAKER BRANDS</Text>
        <TouchableOpacity>
          <Text
            style={[
              AppStyles.forgot,
              {
                fontFamily: fontFamily.LatoBold,
                color: selectedItems.length > 0 ? Colors.forgot : 'gray',
              },
            ]}
            disabled={selectedItems.length === 0}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        numColumns={2}
        scrollEnabled={false}
        data={displayedData}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => {
          const isSelected = selectedItems.includes(item);

          return (
            <TouchableOpacity
              style={[
                styles.itemContainer,
                { borderColor: isSelected ? 'red' : Colors.border1 },
              ]}
              onPress={() => handleItemPress(item)}
            >
              <View style={[styles.cardview2, { alignItems: 'center', justifyContent: 'center' }]}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Image resizeMode="contain" source={item.image} style={styles.productimage} />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default BrandView;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: responsiveWidth(1.5),
    marginTop: responsiveWidth(1),
  },
  itemContainer: {
    marginLeft: responsiveWidth(3.5),
    marginBottom: responsiveHeight(2),
    borderWidth: scale(1),
    borderRadius: scale(5),
   
  },
  cardview2: {
    width:responsiveWidth(43),
    height: responsiveWidth(30),
    backgroundColor: Colors.fieldBackground,
    borderRadius: scale(5),
  },
  productimage: {
    resizeMode: 'center',
  },
  datetext: {
    marginLeft: responsiveWidth(3),
    fontSize: fontSize.lebal,
    fontFamily: fontFamily.LatoBold,
    color: Colors.blackText,
  },
  text: {
    fontSize: fontSize.productName,
    fontFamily: fontFamily.LatoBold,
    textAlignVertical: 'center',
    color: Colors.blackText,
  },
});
