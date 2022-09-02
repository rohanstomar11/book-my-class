import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {COLORS} from '../assets/color';
import Lottie from 'lottie-react-native';
import {FONTS} from '../assets/fontFamily';

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
    }, 1750);
    return () => clearTimeout(timer);
  };

  return (
    <View style={styles.container}>
      <Lottie source={require('../assets/lottie/booking.json')} autoPlay loop />
      <Text style={styles.heading}>Book My Class</Text>
      <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  heading: {
    color: COLORS.primary,
    fontSize: 40,
    fontFamily: FONTS.Bold,
    marginTop: '60%',
  },
});

export default SplashScreen;
