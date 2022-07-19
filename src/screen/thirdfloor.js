import * as React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import Zoomable from '../component/zoomable';

export default function ThirdFloor() {
  return (
    <View style={styles.container}>
      <Zoomable/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffaf0',
  },
});

