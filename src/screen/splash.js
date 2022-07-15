import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';

const SplashScreen = ({navigation}) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      overScrollMode={'never'}>
      <Text style={styles.heading}>Splash Screen</Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => {navigation.goBack()}}>
          <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    color: '#3036D6',
    fontSize: 40,
    fontWeight: '800',
  },
  button: {
    backgroundColor: '#3036D6',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 12,
    justifyContent: 'center',
    alignItems:'center'
  },
  buttonText: {
    color: '#F0FEFE',
    fontSize: 20,
    fontWeight: '600',
  }
});

export default SplashScreen;
