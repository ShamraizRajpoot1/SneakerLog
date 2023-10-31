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
import React,{useState} from 'react';
import EventsView from '../../../components/EventsView';
import {AppStyles} from '../../../services/utilities/AppStyles';
import Header from '../../../components/Header';
import { responsiveHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import SearchBar from '../../../components/SearchBar';

const Events = ({navigation}) => {
  const [events, setEvents] = useState('');
  const EventsDetail = (selectedItem) => {
    navigation.navigate('EventsDetail', { selectedItem }); 
  };
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
               
               <SearchBar Text={"Search Events"} onChangeText={setEvents} value={events}  />
               
            <EventsView filter={events} onPress={EventsDetail}/>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default Events;

const styles = StyleSheet.create({
    

});
