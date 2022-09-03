import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {FONTS} from '../assets/fontFamily';
import {COLORS} from '../assets/color';

const GradientButton = ({onPress, colors, text, disabled = false}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => {
        onPress();
      }}
      disabled={disabled}
      style={[styles.container, disabled ? {opacity: 0.5} : {}]}>
      <LinearGradient
        style={styles.gradientContainer}
        colors={colors || [COLORS.primary, COLORS.secondary]}
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
    color: COLORS.white,
    fontSize: 20,
    fontFamily: FONTS.Bold,
    letterSpacing: 2,
  },
});

export default GradientButton;
