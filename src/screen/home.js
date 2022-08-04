import React from 'react';
import {StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import {COLORS} from '../assets/color';
import Header from '../component/header';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
});

export default HomeScreen;
