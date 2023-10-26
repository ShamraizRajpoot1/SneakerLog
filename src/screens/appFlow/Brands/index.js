import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import BrandView from '../../../components/BrandView'
import Header from '../../../components/Header'
import { AppStyles } from '../../../services/utilities/AppStyles'
import { Colors } from '../../../services/utilities/Colors'

const Brands = ({navigation}) => {
    const back = () => {
        navigation.goBack();
      };
  return (
   <><Header Image={true} onPress={back}/>
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor:Colors.background}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
        <TouchableWithoutFeedback>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={[AppStyles.contentContainer]}
            keyboardShouldPersistTaps="handled">
                
      <BrandView vertical={true} back={back}/>
      </ScrollView>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  )
}

export default Brands

const styles = StyleSheet.create({})