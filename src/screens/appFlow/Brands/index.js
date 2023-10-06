import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import BrandView from '../../../components/BrandView'
import Header from '../../../components/Header'
import { AppStyles } from '../../../services/utilities/AppStyles'
import { fontFamily } from '../../../services/utilities/Fonts'
import { responsiveHeight } from 'react-native-responsive-dimensions'

const Brands = ({navigation}) => {
    const back = () => {
        navigation.goBack();
      };
  return (
   <><Header Image={true} onPress={back}/>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
        <TouchableWithoutFeedback>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={[AppStyles.contentContainer]}
            keyboardShouldPersistTaps="handled">
                
      <BrandView vertical={true}/>
      </ScrollView>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  )
}

export default Brands

const styles = StyleSheet.create({})