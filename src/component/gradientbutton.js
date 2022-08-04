import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {FONTS} from '../assets/fontFamily';

const GradientButton = ({onPress, colors, text}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => {
        onPress();
      }}
      style={styles.container}>
      <LinearGradient
        style={styles.gradientContainer}
        colors={colors || ['#2d6cdf', '#6758d8']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text style={styles.text}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
  },
  gradientContainer: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '3%',
    flexDirection: 'row',
  },
  text: {
    color: '#FEFEFE',
    fontSize: 20,
    fontFamily: FONTS.Bold,
    letterSpacing: 2,
  },
});

export default GradientButton;
