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
import { responsiveHeight, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import { appIcons } from '../../../services/utilities/Assets';
import { Colors } from '../../../services/utilities/Colors';
import SearchBar from '../../../components/SearchBar';

const Events = ({navigation}) => {
  const EventsDetail = () =>{
    navigation.navigate('EventsDetail')
  }
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
                <Text style={[AppStyles.fvrtText,{marginLeft:responsiveScreenWidth(5), marginBottom: responsiveHeight(-2)}]}>UPCOMING EVENTS</Text>
               
               <SearchBar Text={"Search Events"}/>
               
                {/* <View style={styles.search}>
                <Image source={appIcons.searchEvents} />
                <TextInput
          style={AppStyles.input}
          placeholder="Search Events"
          placeholderTextColor={Colors.fieldText}
          keyboardType= 'default'
        />
                </View> */}
            <EventsView onPress={EventsDetail}/>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default Events;

const styles = StyleSheet.create({
    

});
