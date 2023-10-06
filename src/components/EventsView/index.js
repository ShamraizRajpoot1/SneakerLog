import React from 'react';
import { View, Image, FlatList, TouchableOpacity,StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { appImages } from '../../services/utilities/Assets';

const EventsView = props => {
  const Events = [
    {
      id: '1',
      name: 'Event 1',
      image: appImages.event1,
    },
    {
      id: '2',
      name: 'Event 2',
      image: appImages.event1,
    },
    {
      id: '3',
      name: 'Event 3',
      image: appImages.event1,
    },
    {
      id: '4',
      name: 'Event 1',
      image: appImages.event1,
    },
    {
      id: '5',
      name: 'Event 2',
      image: appImages.event1,
    },
    {
      id: '6',
      name: 'Event 3',
      image: appImages.event1,
    },
    {
      id: '7',
      name: 'Event 3',
      image: appImages.event1,
    },
  ];
  const displayedEvents = props.sliceSize ? Events.slice(0, props.sliceSize) : Events;
  return (
    <FlatList
      showsScrollIndicator={false}
      data={displayedEvents}
      scrollEnabled={false}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={{ width: responsiveWidth(100) }}
            onPress={props.onPress}
              // () =>
              // navigation.navigate('EventDetail', 
              // {
              //   EventData: item,
              // }
              // )
            

            >
            <Image
              source= {item.image} 
              style={styles.eventimage}
            />
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default EventsView;
const styles = StyleSheet.create ({
  eventimage: {
    height: responsiveHeight(20),
    width: responsiveWidth(90),
    borderRadius: responsiveHeight(2),
    marginBottom: responsiveWidth(3),
    alignSelf: 'center',
  },
});
