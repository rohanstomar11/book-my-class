import {StyleSheet, Text, ScrollView, StatusBar, Image} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    timeoutHelper(() => {
      const unsubscribe = auth().onAuthStateChanged(user => {
        if (user) {
          navigation.replace('HomeScreen');
        } else {
          navigation.replace('LoginScreen');
        }
        unsubscribe();
      });
    });
  });

  const timeoutHelper = action => {
    const timer = setTimeout(() => {
      action();
    }, 1500);
    return () => clearTimeout(timer);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <Image source={require('../assets/images/logo.png')} />
      <Text style={styles.heading}>Book My Class</Text>
      <StatusBar backgroundColor={'#F0F0F0'} barStyle="dark-content" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F9FBFE',
  },
  heading: {
    color: '#2d6cdf',
    fontSize: 40,
    fontWeight: '800',
  },
});

export default SplashScreen;
