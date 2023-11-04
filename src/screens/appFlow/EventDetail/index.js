import {
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  View,
  Linking,
} from 'react-native';
import React from 'react';
import {AppStyles} from '../../../services/utilities/AppStyles';
import Header from '../../../components/Header';
import {Colors} from '../../../services/utilities/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {fontFamily} from '../../../services/utilities/Fonts';
import moment from 'moment';

const EventsDetail = ({navigation, route}) => {
  const selectedItem = route && route.params ? route.params.selectedItem : null;
  const back = () => {
    navigation.goBack();
  };
  const formatDate = (date) => {
    return moment(date).format('MM-DD-YYYY');
  };

  const date = selectedItem && selectedItem.date ? formatDate(selectedItem.date.toDate()) : '';
  const formatDateTime = (dateTime) => {
    return moment(dateTime).format('MM-DD-YYYY h:mm A');
  };

  const formattedStartDate = selectedItem && selectedItem.startTime ? formatDateTime(selectedItem.startTime.toDate()) : '';
  const formattedEndDate = selectedItem && selectedItem.endTime ? formatDateTime(selectedItem.endTime.toDate()) : '';


  const openMap = () => {
    const address = selectedItem && selectedItem.location ? selectedItem.location : '';
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
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
            <Text
              style={[
                AppStyles.fvrtText,
                {
                  marginLeft: responsiveWidth(5),
                  marginTop: responsiveHeight(1.5),
                },
              ]}>
             {selectedItem.name}
            </Text>
            <Image style={styles.Image} source={{uri: selectedItem.image}} />
            <View style={styles.detailContainer}>
              <Text style={[styles.heading, {marginTop: responsiveHeight(2)}]}>
                DATE AND TIME
              </Text>
              <Text style={styles.datetext}>{date}</Text>
              <Text style={styles.datetext}>
                Start Time {formattedStartDate}
              </Text>
              <Text style={styles.datetext}>
                End Time {formattedEndDate}
              </Text>
              <TouchableOpacity>
                <Text
                  style={[
                    AppStyles.fvrtText,
                    {color: Colors.forgot, marginTop: responsiveWidth(1)},
                  ]}>
                  Add to Calendar
                </Text>
              </TouchableOpacity>
              <Text style={styles.heading}>LOCATION</Text>
              <Text style={styles.datetext}>
                {selectedItem.location}
              </Text>
              <TouchableOpacity onPress={openMap}>
                <Text
                  style={[
                    AppStyles.fvrtText,
                    {color: Colors.forgot, marginTop: responsiveWidth(1)},
                  ]}>
                  View Map
                </Text>
              </TouchableOpacity>
              <Text style={styles.heading}>ABOUT THIS EVENT</Text>
              <Text
                style={[styles.datetext, {marginBottom: responsiveHeight(3)}]}>
               {selectedItem.about}
              </Text>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default EventsDetail;

const styles = StyleSheet.create({
  Image: {
    width: responsiveWidth(100),
    height: responsiveHeight(23),
    resizeMode: 'cover',
  },
  detailContainer: {
    width: responsiveWidth(90),
    paddingHorizontal: responsiveWidth(4),
    borderWidth: responsiveWidth(0.1),
    alignSelf: 'center',
    marginVertical: responsiveWidth(5),
    borderColor: Colors.border1,
    borderRadius: responsiveWidth(2),
  },
  heading: {
    fontFamily: fontFamily.LatoBold,
    fontSize: responsiveFontSize(1.6),
    color: Colors.blackText,
  },
  datetext: {
    fontFamily: fontFamily.LatoRegular,
    fontSize: responsiveHeight(1.5),
    marginTop: responsiveWidth(1),
  },
});
