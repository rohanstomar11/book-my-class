import * as React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {FONTS} from '../assets/fontFamily';
import {COLORS} from '../assets/color';

export default function Header({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Book My Class</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          auth()
            .signOut()
            .then(
              () => {
                navigation.replace('LoginScreen');
              },
              error => {
                console.error(error);
              },
            );
        }}>
        <Image
          style={styles.userImg}
          source={require('../assets/images/logo.png')}
          resizeMode={'cover'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    width: '100%',
  },
  headerText: {
    fontSize: 18,
    fontFamily: FONTS.Bold,
    letterSpacing: 1,
    color: COLORS.white,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.background,
  },
});
