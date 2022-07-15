import { StyleSheet, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

const HomeScreen = ({navigation}) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Home Screen</Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => {navigation.navigate('SplashScreen')}}>
          <Text style={styles.buttonText}>Click Here</Text>
          <Icon name='arrowright' size={24} color={'#F0F0F0'} />
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
    marginRight: 10,
  }
});

export default HomeScreen;
