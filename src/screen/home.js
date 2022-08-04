import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../component/header';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FBFE',
    paddingTop: 0,
  },
});

export default HomeScreen;
