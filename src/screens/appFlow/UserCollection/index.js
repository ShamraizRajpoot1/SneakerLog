import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React from 'react'
import { AppStyles } from '../../../services/utilities/AppStyles'
import Header from '../../../components/Header'
import { Colors } from '../../../services/utilities/Colors'
import { appImages } from '../../../services/utilities/Assets'
import { responsiveHeight, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import { fontFamily, fontSize } from '../../../services/utilities/Fonts'
import CollectionHeader from '../../../components/CollectionHeader'

const UserCollection = ({navigation}) => {
    const profile = () => {
        navigation.navigate('Profile');
      };
      const back = () => {
        navigation.goBack();
      };
  return (
    <>
      <Header options={true} Image={true} onPress={back} press={profile} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
        <TouchableWithoutFeedback>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={[AppStyles.contentContainer]}
            keyboardShouldPersistTaps="handled">
                 <View style={styles.profileContainer}>
                    <View style={{flexDirection:'row',height:'100%', alignItems:'center'}}>
              <Image style={styles.image} source={appImages.member1} />
              <View style={{marginLeft: responsiveWidth(5),}}>
              <Text style={[styles.name]}>name</Text>
              <Text style={[styles.additionalText,{marginTop:responsiveScreenHeight(0.5)}]}>Additional</Text>
              </View>
              </View>
              <TouchableOpacity style={styles.followContainer}>
                <Text
                  style={[
                    AppStyles.userHorizontalText,
                    {color: Colors.forgot, marginTop: 0},
                  ]}>
                  Follow
                </Text>
              </TouchableOpacity>
            </View>
            <CollectionHeader />
            <View
                style={[
                  styles.collectionContainer,
                  {height: responsiveScreenHeight(35), alignItems:'center', justifyContent:'center'},
                ]}>
                    <Text style={styles.emptyText}>No Sneaker</Text>
                </View>
            </ScrollView>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
                </>
  )
}

export default UserCollection

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection:'row', 
        padding:'4%',

         borderBottomWidth: responsiveScreenWidth(0.1),
      },
      image: {
        borderRadius: scale(100),
        height: scale(70),
        width: scale(70),
      },
      name: {
        marginTop: responsiveHeight(0.5),
        fontFamily: fontFamily.LatoHeavy,
        textAlignVertical: 'center',
        marginHorizontal: 2.5,
        color: Colors.blackText,
        fontSize: fontSize.usernameText,
      },
      additionalText: {
        fontSize: fontSize.userName,
        fontFamily: fontFamily.LatoMedium,
        color: Colors.username,
      },
      followContainer: {
        marginTop: responsiveHeight(1),
        width: responsiveWidth(19),
        height: responsiveHeight(3.5),
        borderWidth: scale(1),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.barBackground,
      },
      collectionContainer: {
        borderWidth: responsiveScreenWidth(0.5),
        marginTop: responsiveHeight(2),
        width: '90%',
        alignSelf: 'center',
        borderRadius: scale(6),
        borderColor: Colors.border1,
      },
      emptyText: {
        fontSize: fontSize.h2,
        fontFamily: fontFamily.LatoBold,
        color: Colors.blackText,
      },
})