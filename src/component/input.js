import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../assets/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {FONTS} from '../assets/fontFamily';

const Input = ({
  state,
  setState,
  icon = 'user-o',
  iconSize = 24,
  placeholder = '',
  keyboard = 'default',
  multiline = false,
  hide = false,
  top = 0,
  extra = false,
}) => {
  const [key, setKey] = useState(hide);
  const showPassword = () => {
    setKey(!key);
  };
  return (
    <View
      style={[
        styles.container,
        {
          borderColor: state === '' ? COLORS.hint : COLORS.primary,
          marginTop: top,
        },
      ]}>
      <Icon
        name={icon}
        size={iconSize}
        style={(styles.negMargin, extra ? {marginLeft: '1%'} : {})}
        color={state === '' ? COLORS.hint : COLORS.primary}
      />
      <TextInput
        style={[styles.input, multiline ? styles.multiline : {}]}
        keyboardType={keyboard}
        multiline={multiline}
        placeholder={placeholder}
        placeholderTextColor={COLORS.hint}
        onChangeText={text => {
          setState(text);
        }}
        secureTextEntry={key}
        selectionColor={state === '' ? COLORS.hint : COLORS.primary}
      />
      {hide && state !== '' && (
        <TouchableOpacity style={styles.eye} onPress={() => showPassword()}>
          <Icon5
            name={key ? 'eye-slash' : 'eye'}
            color={COLORS.primary}
            size={22}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '4%',
    paddingTop: '1%',
    borderWidth: 1,
    borderRadius: 12,
  },
  input: {
    width: '100%',
    marginLeft: '4%',
    fontSize: 14,
    fontFamily: FONTS.Medium,
    color: COLORS.primary,
  },
  negMargin: {
    marginTop: '-2%',
  },
  eye: {
    position: 'absolute',
    right: 12,
  },
  multiline: {
    minHeight: 40,
    maxHeight: 80,
  },
});

export default Input;
