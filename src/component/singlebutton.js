import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {FONTS} from '../assets/fontFamily';
import {COLORS} from '../assets/color';

const SingleButton = ({onPress, color, text, disabled = false}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled}
      onPress={item => {
        onPress(item);
      }}
      style={[
        styles.container,
        {backgroundColor: color || COLORS.primary},
        disabled ? {opacity: 0.7} : {opacity: 1},
      ]}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '3%',
    flexDirection: 'row',
    height: '100%',
  },
  text: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: FONTS.Bold,
    letterSpacing: 2,
  },
});

export default SingleButton;
