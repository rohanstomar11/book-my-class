import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/color';
import Icon from 'react-native-vector-icons/FontAwesome';

const Input = () => {
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '3%'
      }}>
      <Icon name="user-o" size={25} color={COLORS.primary} />
      <TextInput
        style={{width: '100%'}}
        placeholder="Email"
        placeholderTextColor={COLORS.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Input;
