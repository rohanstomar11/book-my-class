import { StyleSheet, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

const SplashScreen = ({navigation}) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Splash Screen</Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => {navigation.goBack()}}>
        <Icon name='arrowleft' size={24} color={'#F0F0F0'} />
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      <StatusBar
        backgroundColor={'#F0F0F0'}
        barStyle="dark-content"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F0F0F0'
  },
  heading: {
    color: '#3036D6',
    fontSize: 40,
    fontWeight: '800',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#3036D6',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 12,
  },
  buttonText: {
    color: '#F0F0F0',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
  }
});

export default SplashScreen;
