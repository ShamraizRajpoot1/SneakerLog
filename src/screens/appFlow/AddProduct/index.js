import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Header from '../../../components/Header'
import { AppStyles } from '../../../services/utilities/AppStyles'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Colors } from '../../../services/utilities/Colors'
import { fontSize } from '../../../services/utilities/Fonts'
import CollectionHeader from '../../../components/CollectionHeader'
import AddSneakers from '../../../components/AddSneakers'

const AddProduct = ({navigation}) => {
    const back = () => {
        navigation.goBack();
      };
      const profile = () => {
        navigation.navigate('Profile')
      };
      const Sneakers = () => {
        navigation.navigate('SneakerStack')
      };
      const Search = () => {
        navigation.navigate('SearchSneaker')
      };
      
  return (
    <>
    <Header Image={true} onPress={back} options={true} press={profile}/>

    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
      <TouchableWithoutFeedback>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={[AppStyles.contentContainer]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
            <CollectionHeader />
            <AddSneakers onPress={Sneakers} press={Search}/>
          </ScrollView>
          </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
          </>
  )
}

export default AddProduct

const styles = StyleSheet.create({
    text: {
        color: Colors.blackText,
        fontSize: fontSize.h3,
      },
})