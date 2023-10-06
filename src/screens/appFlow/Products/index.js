import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    ScrollView,
    Image,
    TextInput
  } from 'react-native';
  import React from 'react';
  import EventsView from '../../../components/EventsView';
  import {AppStyles} from '../../../services/utilities/AppStyles';
  import Header from '../../../components/Header';
  import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
  import { scale } from 'react-native-size-matters';
  import { appIcons } from '../../../services/utilities/Assets';
  import { Colors } from '../../../services/utilities/Colors';
import ProductView from '../../../components/ProductView';
  
  const Products = ({navigation}) => {
    const back = () => {
      navigation.goBack();
    };
    return (
      <>
        <Header Image={true} options={true} onPress={back} />
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
          <TouchableWithoutFeedback>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={[AppStyles.contentContainer]}
            keyboardShouldPersistTaps="handled">
                  <Text style={[AppStyles.fvrtText,{marginLeft:responsiveScreenWidth(5)}]}>RELEASE DATES</Text>
                  
              <ProductView vertical={true} />
              </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </>
    );
  };
  
  export default Products;
  
  const styles = StyleSheet.create({
  });
  