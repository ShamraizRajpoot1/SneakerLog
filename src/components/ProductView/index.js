
  import React, { useState, useEffect } from 'react';
  import { View, Text, Image, FlatList, StyleSheet, ScrollView } from 'react-native';
  import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
  import { appImages } from '../../services/utilities/Assets';
  import { fontFamily, fontSize } from '../../services/utilities/Fonts';
  import { Colors } from '../../services/utilities/Colors';
  import { scale } from 'react-native-size-matters';
  import firestore from '@react-native-firebase/firestore';
  import moment from 'moment';

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const ProductView = (props) => {
    const [releaseDate, setReleaseDate] = useState([]);
    useEffect(() => {
      const fetchEventsData = async () => {
        try {
          const snapshot = await firestore().collection('ReleaseDate').get();
          const eventsData = [];
          snapshot.forEach(doc => {
            eventsData.push({id: doc.id, ...doc.data()});
          });
          setReleaseDate(eventsData);
        } catch (error) {
          console.error('Error fetching Events data: ', error);
        }
      };
      fetchEventsData();
    }, []);
   
    const displayedData = props.sliceSize ? releaseDate.slice(0, props.sliceSize) : releaseDate;
    if (props.vertical) {
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          horizontal={false} 
          numColumns={2} 
          scrollEnabled={false}
          data={displayedData}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => {
            const formatDate = (dateTime) => {
              return moment(dateTime).format('DD');
            };
            const formatMonth = (dateTime) => {
              return moment(dateTime).format('MM');
            };
          
            const Day =  formatDate(item.date.toDate()) ;
            const Month = formatMonth(item.date.toDate());
          
    
            return (
              <View
                style={{
                  marginLeft: responsiveWidth(6.5),
                  marginBottom: 2,
                  marginRight:
                    index + 1 === releaseDate.length
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
                            {monthNames[Month]}
                      </Text>
                      <Text
                        style={[
                          styles.datetext,
                          {
                            color: Colors.forgot,
                            fontFamily: fontFamily.DinBold,
                          },
                        ]}>
                        {Day}
                      </Text>
                    </View>
                    <Image
                      resizeMode="contain"
                      source={{uri: item.image}}
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
        data={releaseDate}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => {
          const formatDate = (dateTime) => {
            return moment(dateTime).format('DD');
          };
          const formatMonth = (dateTime) => {
            return moment(dateTime).format('MM');
          };
          const Day =  formatDate(item.date.toDate()) ;
          const Month =  formatMonth(item.date.toDate()) ;
  
          return (
            <View
              style={{
                marginLeft: responsiveWidth(5),
                marginBottom: 2,
                marginRight:
                  index + 1 === releaseDate.length
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
                     {monthNames[Month]}
                    </Text>
                    <Text
                      style={[
                        styles.datetext,
                        {
                          color: Colors.forgot,
                          fontFamily: fontFamily.DinBold,
                        },
                      ]}>
                      {Day}
                    </Text>
                  </View>
                  <Image
                    resizeMode="contain"
                    source={{uri: item.image}}
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
      backgroundColor: Colors.searchBackground,
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