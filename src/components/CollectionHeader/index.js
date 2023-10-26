import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { appIcons } from '../../services/utilities/Assets';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import {AppStyles} from '../../services/utilities/AppStyles'
import { Colors } from '../../services/utilities/Colors';
import { fontSize } from '../../services/utilities/Fonts';

const CollectionHeader = (props) => {

    const row = {
        ...AppStyles.row2,
        borderBottomWidth: responsiveWidth(0.2),
        width: '100%',
        marginHorizontal: 0,
        marginTop: 0,
        height: responsiveHeight(8),
        alignItems: 'center'
      };
  return (
    <View style={row}>
    <TouchableOpacity 
      style={[styles.textContainer, {width: responsiveWidth(17)}]}>
      <Image
        style={{width: scale(25), height: scale(25),marginLeft:responsiveWidth(5)}}
        source={appIcons.star}
      />
    </TouchableOpacity>
    <View
      style={[styles.textContainer, {width: responsiveWidth(60)}]}>
      <Text style={[styles.text]}>{props.name}</Text>
    </View>
    <View
      style={[styles.textContainer, {width: responsiveWidth(17)}]}>
      <TouchableOpacity onPress={props.onPress}>
        <Image
          style={{width: scale(20), height: scale(25), marginRight:responsiveWidth(5)}}
          source={appIcons.download}
        />
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default CollectionHeader

const styles = StyleSheet.create({
    textContainer: {
        alignItems: 'center',
      },
      text: {
        color: Colors.blackText,
        fontSize: fontSize.h3,
      },
    
})