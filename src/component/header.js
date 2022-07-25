import * as React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';

export default function Header({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>BookMyClass</Text>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('UserProfileScreen');
        }}>
        <Image
          style={styles.userImg}
          source={require('../assets/college_logo.jpg')}
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
    backgroundColor: '#1811DE',
    paddingHorizontal: 20,
    width: '100%',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#fff',
  },
  userImg: {
    width: 60,
    height: 50,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#000000',
  },
});
