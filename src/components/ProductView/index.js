
  import React, { useState } from 'react';
  import { View, Text, Image, FlatList, StyleSheet, ScrollView } from 'react-native';
  import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
  import { appImages } from '../../services/utilities/Assets';
  import { fontFamily, fontSize } from '../../services/utilities/Fonts';
  import { Colors } from '../../services/utilities/Colors';
  import { scale } from 'react-native-size-matters';
  
  const monthNames = [
    'Jan', 'Febr', 'Mar', 'Apr', 'May', 'Jun',
    'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const ProductView = (props) => {
    const [Releasedata] = useState([
      {
        name: 'Converse Aeon Active CX',
        releaseDate: '2023-04-12',
        image: appImages.product1 ,
      },
      {
        name: 'Air Jordon 2 x Union Rattan',
        releaseDate: '2023-04-15',
        image: appImages.product2,
      },
      {
        name: 'Air Jordon 2 x Grey Fog',
        releaseDate: '2023-04-15',
        image: appImages.product3,
      },
      {
        name: 'Converse Aeon Active C',
        releaseDate: '2023-04-12', 
        image: appImages.product1 ,
      },
      {
        name: 'Air Jordon 2 x Union',
        releaseDate: '2023-04-15',
        image: appImages.product2,
      },
      {
        name: 'Air Jordon 2 x Gre',
        releaseDate: '2023-04-15',
        image: appImages.product3,
      },
      {
        name: 'Converse Aeon Activeu C',
        releaseDate: '2023-04-12', 
        image: appImages.product1 ,
      },
      {
        name: 'Air Jordon 2 x Unions',
        releaseDate: '2023-04-15',
        image: appImages.product2,
      },
      {
        name: 'Air Jordon 2 x Greys',
        releaseDate: '2023-04-15',
        image: appImages.product3,
      },
      {
        name: 'Converse Aeon Active Cv',
        releaseDate: '2023-04-12', 
        image: appImages.product1 ,
      },
      {
        name: 'Air Jordon 2 x Union 5',
        releaseDate: '2023-04-15',
        image: appImages.product2,
      },
      {
        name: 'Air Jordon 2 x Grey 0',
        releaseDate: '2023-04-15',
        image: appImages.product3,
      },
      {
        name: 'Air Jordon 2 x Grey 05',
        releaseDate: '2023-04-15',
        image: appImages.product3,
      },
    ]);
    const displayedData = props.sliceSize ? Releasedata.slice(0, props.sliceSize) : Releasedata;
    if (props.vertical) {
      return (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={false} 
          numColumns={2} 
          scrollEnabled={false}
          data={displayedData}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => {
            const releaseDate = new Date(item.releaseDate);
    
            return (
              <View
                style={{
                  marginLeft: responsiveWidth(6.5),
                  marginBottom: 2,
                  marginRight:
                    index + 1 === Releasedata.length
                      ? responsiveWidth(5)
                      : 0,
                }}>
                <View style={[styles.cardview2]}>
                  <View style={{ flexDirection: 'row' }}>
                    <View
                      style={{
                        alignItems: 'center',
                        marginTop: responsiveHeight(1),
                      }}>
                      <Text
                        style={[
                          styles.datetext,
                          { fontFamily: fontFamily.DinBold },
                        ]}>
                        {monthNames[releaseDate.getMonth()]}
                      </Text>
                      <Text
                        style={[
                          styles.datetext,
                          {
                            color: Colors.forgot,
                            fontFamily: fontFamily.DinBold,
                          },
                        ]}>
                        {releaseDate.getDate()}
                      </Text>
                    </View>
                    <Image
                      resizeMode="contain"
                      source={item.image}
                      style={styles.productimage}
                    />
                  </View>
                  <View
                    style={{
                      borderTopWidth: responsiveWidth(0.2),
                      borderColor: Colors.border1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={[
                        styles.text,
                        {
                          alignSelf: 'center',
                          top: responsiveHeight(1.25),
                        },
                      ]}>
                      {item.name}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      );
    };
  
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={Releasedata}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => {
          const releaseDate = new Date(item.releaseDate);
  
          return (
            <View
              style={{
                marginLeft: responsiveWidth(5),
                marginBottom: 2,
                marginRight:
                  index + 1 === Releasedata.length
                    ? responsiveWidth(5)
                    : 0,
              }}>
              <View style={[styles.cardview2]}>
                <View style={{ flexDirection: 'row' }}>
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: responsiveHeight(1),
                    }}>
                    <Text
                      style={[
                        styles.datetext,
                        { fontFamily: fontFamily.DinBold },
                      ]}>
                      {monthNames[releaseDate.getMonth()]}
                    </Text>
                    <Text
                      style={[
                        styles.datetext,
                        {
                          color: Colors.forgot,
                          fontFamily: fontFamily.DinBold,
                        },
                      ]}>
                      {releaseDate.getDate()}
                    </Text>
                  </View>
                  <Image
                    resizeMode="contain"
                    source={item.image}
                    style={styles.productimage}
                  />
                </View>
                <View
                  style={{
                    borderTopWidth: responsiveWidth(0.2),
                    borderColor: Colors.border1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={[
                      styles.text,
                      {
                        alignSelf: 'center',
                        top: responsiveHeight(1.25),
                      },
                    ]}>
                    {item.name}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    );
  };
  
  export default ProductView;
  
  const styles = StyleSheet.create({
    cardview2: {
      height: responsiveHeight(15),
      width: responsiveWidth(40),
      backgroundColor: Colors.fieldBackground,
      borderWidth: scale(1),
      borderColor: Colors.border1,
      borderRadius: scale(7),
      marginBottom: responsiveWidth(3),
    },
    productimage: {
      height: responsiveHeight(10),
      width: responsiveWidth(25),
      alignSelf: 'center',
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