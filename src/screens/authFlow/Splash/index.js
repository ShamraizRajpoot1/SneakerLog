import { ImageBackground, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appImages } from '../../../services/utilities/Assets';

const Splash = ({ navigation }) => {
  useEffect(() => {
    const delay = 2000; 
    const timeout = setTimeout(async () => {
      const data = await AsyncStorage.getItem('Token');
      if (data) {
        navigation.navigate('App');
      } else {
        console.log('data: ', data);
        navigation.navigate('Auth');
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, []); 

  return (
    <ImageBackground source={appImages.splash} style={{ flex: 1 }}>
      
    </ImageBackground>
  );
};

export default Splash;
