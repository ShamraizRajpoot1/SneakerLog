import {
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  View,
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
import {appImages} from '../../../services/utilities/Assets';
import {fontFamily} from '../../../services/utilities/Fonts';

const EventsDetail = ({navigation}) => {
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
            <Text
              style={[
                AppStyles.fvrtText,
                {
                  marginLeft: responsiveWidth(5),
                  marginTop: responsiveHeight(1.5),
                },
              ]}>
              UPCOMING EVENTS
            </Text>
            <Image style={styles.Image} source={appImages.event1} />
            <View style={styles.detailContainer}>
              <Text style={[styles.heading, {marginTop: responsiveHeight(2)}]}>
                DATE AND TIME
              </Text>
              <Text style={styles.datetext}>05-21-2022</Text>
              <Text style={styles.datetext}>
                Start Time 05-21-2022 10:00 pm
              </Text>
              <Text style={styles.datetext}>End Time 05-21-2022 10:00 pm</Text>
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
                Anahiem Convention Center 800 W Katella Ave Anaheim, CA 92802
              </Text>
              <TouchableOpacity>
                <Text
                  style={[
                    AppStyles.fvrtText,
                    {color: Colors.forgot, marginTop: responsiveWidth(1)},
                  ]}>
                  View Map
                </Text>
              </TouchableOpacity>
              <Text style={styles.heading}>LOCATION</Text>
              <Text style={[styles.datetext,{marginBottom: responsiveHeight(3),}]}>
                Join us May 21st & 22nd 2022 as we teleport through the metavers
                to bring Apes to the greatest Sneakers Join us May 21st & 22nd 2022 as we teleport through the metavers
                to bring Apes to the greatest Sneakers Join us May 21st & 22nd 2022 as we teleport through the metavers
                to bring Apes to the greatest Sneakers Join us May 21st & 22nd 2022 as we teleport through the metavers
                to bring Apes to the greatest Sneakers Join us May 21st & 22nd 2022 as we teleport through the metavers
                to bring Apes to the greatest SneakersJoin us May 21st & 22nd 2022 as we teleport through the metavers
                to bring Apes to the greatest SneakersJoin us May 21st & 22nd 2022 as we teleport through the metavers
                to bring Apes to the greatest Sneakers Join us May 21st & 22nd 2022 as we teleport through the metavers
                to bring Apes to the greatest Sneakers Join us May 21st & 22nd 2022 as we teleport through the metavers
                to bring Apes to the greatest Sneakers Join us May 21st & 22nd 2022 as we teleport through the metavers
                to bring Apes to the greatest Sneakers Join us May 21st & 22nd 2022 as we teleport through the metavers
                to bring Apes to the greatest Sneakers Join us May 21st & 22nd 2022 as we teleport through the metavers
                to bring Apes to the greatest Sneakers
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
