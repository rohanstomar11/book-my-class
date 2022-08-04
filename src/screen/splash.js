import {StyleSheet, Text, View, StatusBar, Image} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {COLORS} from '../assets/color';

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
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} />
      <Text style={styles.heading}>Book My Class</Text>
      <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.background,
  },
  heading: {
    color: COLORS.primary,
    fontSize: 40,
    fontWeight: '800',
  },
});

export default SplashScreen;
