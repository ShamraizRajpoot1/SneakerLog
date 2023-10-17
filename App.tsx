import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Navigation from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AuthProvider from './src/navigation/AuthProvider';

const App = () => {
  return (
    <SafeAreaProvider>
       <AuthProvider>
      <Navigation />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
});
