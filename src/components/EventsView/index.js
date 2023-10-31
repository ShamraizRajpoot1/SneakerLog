import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import firestore from '@react-native-firebase/firestore';
const EventsView = props => {
  const [events, setEvents] = useState('');
  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const snapshot = await firestore().collection('Events').get();
        const eventsData = [];
        snapshot.forEach(doc => {
          eventsData.push({id: doc.id, ...doc.data()});
        });
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching Events data: ', error);
      }
    };
    fetchEventsData();
  }, []);
  let displayedEvents = [];
  if (props.sliceSize && Array.isArray(events)) {
    displayedEvents = events.slice(0, props.sliceSize);
  } else if (Array.isArray(events)) {
    displayedEvents = events;
  }
  
  let filteredData = [];
  if (Array.isArray(displayedEvents)) {
    filteredData = props.filter
      ? displayedEvents.filter(
          item =>
            item.name &&
            item.name.toLowerCase().includes(props.filter.toLowerCase())
        )
      : displayedEvents;
  }
  
  return (
    <FlatList
      showsScrollIndicator={false}
      data={filteredData}
      scrollEnabled={false}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            style={{width: responsiveWidth(100)}}
            onPress={() => props.onPress(item)}>
            <Image source={{uri: item.image}} style={styles.eventimage} />
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default EventsView;
const styles = StyleSheet.create({
  eventimage: {
    height: responsiveHeight(20),
    width: responsiveWidth(90),
    borderRadius: responsiveScreenWidth(3),
    marginBottom: responsiveWidth(3),
    alignSelf: 'center',
  },
});
