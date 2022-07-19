import * as React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

export default function ThirdFloor() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>FirstFloor</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#01B8A4',
  },
});
