import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { appIcons } from '../../services/utilities/Assets'
import { AppStyles } from '../../services/utilities/AppStyles'
import { fontFamily, fontSize } from '../../services/utilities/Fonts'
import { Colors } from '../../services/utilities/Colors'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'

const AddSneakers =props=> {
  return (
    <View>
    <View
              style={[
                AppStyles.addCollection,
                {marginTop: responsiveHeight(3), height: responsiveHeight(20)},
              ]}>
              <TouchableOpacity onPress={props.press}>
                <Image
                  style={{width: scale(25), height: scale(25)}}
                  source={appIcons.searchSneakers}
                />
              </TouchableOpacity>
              <Text style={styles.camtext}>SEARCH SNEAKERS</Text>
            </View>
            <View
              style={[
                AppStyles.addCollection,
                {marginTop: responsiveHeight(3), height: responsiveHeight(20)},
              ]}>
              <TouchableOpacity onPress={props.onPress}>
                <Image
                  style={{width: scale(40), height: scale(35)}}
                  source={appIcons.barcodeInfrared}
                />
              </TouchableOpacity>
              <Text style={styles.camtext}>ADD SNEAKERS</Text>
            </View>
            </View>
  )
}

export default AddSneakers

const styles = StyleSheet.create({
  camtext: {
    fontSize: fontSize.lebal,
    color: Colors.forgot,
    marginTop: responsiveHeight(1),
    fontFamily: fontFamily.LatoBold,
  },
})