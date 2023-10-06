import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { scale } from 'react-native-size-matters';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import { appIcons, appImages } from '../../services/utilities/Assets';
import { Colors } from '../../services/utilities/Colors';

const Header = (props) => {
  const optionimage = {
    ...styles.headerback,
    height: scale(25),
    width: scale(25),
    borderRadius: scale(100),
    padding: 0,
    marginRight: responsiveScreenWidth(5),
  };

  return (
    <View style={styles.header}>
        <View style={{width:'15%'}}>
      {props.Image && (
        <TouchableOpacity
          style={{ marginLeft: responsiveScreenWidth(4) }}
          onPress={props.onPress}
        >
          <Image style={styles.headerback} source={appIcons.back} />
        </TouchableOpacity>
      )}</View>

      {props.Image || props.options ? (
        <View style={styles.headerWithImage}>
          <Image style={styles.logo} source={appImages.logo} />
        </View>
      ) : (
        <View style={styles.headerWithoutImage}>
          <Image style={styles.logo} source={appImages.logo} />
        </View>
      )}
<View style={{width:'15%'}}>
      {props.options && (
        <TouchableOpacity
          style={{ marginLeft: responsiveScreenWidth(5) }}
          onPress={props.press}
        >
          <Image style={optionimage} source={appIcons.profile} />
        </TouchableOpacity>
      )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: responsiveScreenHeight(7.5),
    backgroundColor: Colors.backgroud1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  headerWithImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerWithoutImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  headerback: {
    height: scale(25),
    width: scale(22),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: scale(140),
    height: scale(25),
    alignSelf: 'center', 
  },
});
