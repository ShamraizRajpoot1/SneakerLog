import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
} from 'react-native';
import React,{useEffect} from 'react';
import Header from '../../../components/Header';
import {AppStyles} from '../../../services/utilities/AppStyles';
import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
import {
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../../services/utilities/Colors';

const SizeGuide = ({navigation}) => {
  const data = [
    {
      value1: 3.5,
      value2: 2.5,
      value3: 35.5,
      value4: 22.5,
      value5: 5,
    },
    {
      value1: 4,
      value2: 3,
      value3: 36,
      value4: 23,
      value5: 5.5,
    },
    {
      value1: 4.5,
      value2: 3.5,
      value3: 36.5,
      value4: 23.5,
      value5: 6,
    },
    {
      value1: 5,
      value2: 4,
      value3: 37.5,
      value4: 23.5,
      value5: 6.5,
    },
    {
      value1: 5.5,
      value2: 4.5,
      value3: 38,
      value4: 24,
      value5: 7,
    },
    {
      value1: 6,
      value2: 5.5,
      value3: 38.5,
      value4: 24,
      value5: 7.5,
    },
    {
      value1: 6.5,
      value2: 6,
      value3: 39,
      value4: 24.5,
      value5: 8,
    },
    {
      value1: 7,
      value2: 6,
      value3: 40,
      value4: 25,
      value5: 8.5,
    },
    {
      value1: 7.5,
      value2: 6.5,
      value3: 40.5,
      value4: 25.5,
      value5: 9,
    },
    {
      value1: 8,
      value2: 7,
      value3: 41,
      value4: 26,
      value5: 9.5,
    },
    {
      value1: 8.5,
      value2: 7.5,
      value3: 42,
      value4: 26.5,
      value5: 10,
    },
    {
      value1: 9,
      value2: 8,
      value3: 42.5,
      value4: 27,
      value5: 10.5,
    },
    {
      value1: 9.5,
      value2: 8.5,
      value3: 43,
      value4: 27.5,
      value5: 11,
    },
    {
      value1: 10,
      value2: 9,
      value3: 44,
      value4: 28,
      value5: 11.5,
    },
    {
      value1: 10.5,
      value2: 9.5,
      value3: 44.5,
      value4: 28.5,
      value5: 12,
    },
    {
      value1: 11,
      value2: 10,
      value3: 45,
      value4: 29,
      value5: 12.5,
    },
    {
      value1: 11.5,
      value2: 10.5,
      value3: 45.5,
      value4: 29.5,
      value5: 13,
    },
    {
      value1: 12,
      value2: 11,
      value3: 46,
      value4: 30,
      value5: 13.5,
    },
    {
      value1: 12.5,
      value2: 11.5,
      value3: 47,
      value4: 30.5,
      value5: 14,
    },
    {
      value1: 13,
      value2: 12,
      value3: 48,
      value4: 31,
      value5: 14.5,
    },
    {
      value1: 13.5,
      value2: 12.5,
      value3: 48,
      value4: 31.5,
      value5: 15,
    },
    {
      value1: 14,
      value2: 13,
      value3: 48.5,
      value4: 32,
      value5: 15.5,
    },
    {
      value1: 15,
      value2: 14,
      value3: 49.5,
      value4: 33,
      value5: 16,
    },
    {
      value1: 16,
      value2: 15,
      value3: 50.5,
      value4: 34,
      value5: 16.5,
    },
    {
      value1: 17,
      value2: 16,
      value3: 51.5,
      value4: 35,
      value5: 17,
    },
    {
      value1: 18,
      value2: 17,
      value3: 52.5,
      value4: 36,
      value5: 17.5,
    },
  ];
  const back = () => {
    navigation.goBack();
  };
  const nametext = {
    ...AppStyles.labelStyle,
    fontSize: fontSize.lebal,
  };
  useEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
    return()=>{
        navigation.getParent().setOptions({ tabBarStyle: {
            height: responsiveScreenHeight(7),
              display: 'flex',
              backgroundColor: Colors.barBackground
            } })
    }
});

  return (
    <>
      <Header Image={true} onPress={back}/>
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
            <View style={styles.contentContainer}>
              <Text style={nametext}>Size Guide</Text>
              <Text
                style={[
                  AppStyles.labelStyle,
                  {
                    fontSize: fontSize.usernameText,
                    marginTop: responsiveScreenHeight(2),
                    color: Colors.username,
                  },
                ]}>
                Use the chart and measuring guide below to determine the sneaker
                size
              </Text>
              <View style={styles.guideContainer}>
                <View style={styles.titleContainer}>
                  <View style={styles.lebalContainer}>
                    <Text style={[nametext, {color: '#FFF'}]}>US</Text>
                  </View>
                  <View style={styles.lebalContainer}>
                    <Text style={[nametext, {color: '#FFF'}]}>UK</Text>
                  </View>
                  <View style={styles.lebalContainer}>
                    <Text style={[nametext, {color: '#FFF'}]}>EU</Text>
                  </View>
                  <View style={styles.lebalContainer}>
                    <Text style={[nametext, {color: '#FFF'}]}>cm</Text>
                  </View>
                  <View style={styles.lebalContainer}>
                    <Text style={[nametext, {color: '#FFF'}]}>WM</Text>
                  </View>
                </View>
                <FlatList
                  scrollEnabled={false}
                  data={data}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <View
                      style={[
                        styles.rowContainer,
                        {
                          backgroundColor:
                            index % 2 === 0
                              ? Colors.fieldBackground
                              : Colors.background2,
                          borderBottomLeftRadius:
                            index === data.length - 1
                              ? responsiveWidth(1.9)
                              : 0,
                          borderBottomRightRadius:
                            index === data.length - 1
                              ? responsiveWidth(1.9)
                              : 0,
                          borderBottomWidth: index === data.length - 1 ? 0 : 1,
                        },
                      ]}>
                      <View style={styles.textContainer}>
                        <Text style={styles.cellText}>{item.value1}</Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.cellText}>{item.value2}</Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.cellText}>{item.value3}</Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.cellText}>{item.value4}</Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.cellText}>{item.value5}</Text>
                      </View>
                    </View>
                  )}
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default SizeGuide;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: responsiveScreenWidth(5),
    paddingTop: responsiveScreenHeight(3),
  },
  guideContainer: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    backgroundColor: Colors.fieldBackground,
    marginBottom: 10,
    borderWidth: responsiveWidth(0.3),
    borderColor: Colors.border1,
    borderRadius: responsiveWidth(2),
    marginTop: responsiveHeight(3),
  },
  titleContainer: {
    width: responsiveWidth(89.8),
    backgroundColor: Colors.backgroud1,
    height: responsiveHeight(6),
    borderTopLeftRadius: responsiveWidth(1.9),
    borderTopRightRadius: responsiveWidth(1.9),
    flexDirection: 'row',
  },
  lebalContainer: {
    width: responsiveWidth(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
    borderBottomWidth: 1,
    borderBottomColor: Colors.border1,
  },
  cellText: {
    fontSize: fontSize.fieldText,
    fontFamily: fontFamily.LatoBold,
    color:Colors.text2
  },
  textContainer:{
    width: responsiveWidth(18), 
    height: responsiveHeight(6),
    alignItems:'center',
    justifyContent:'center',
    borderRightWidth: 1,
    borderColor: Colors.border1,
  }
});
