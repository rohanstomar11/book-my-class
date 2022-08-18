import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity,Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {COLORS} from '../assets/color';
import {FONTS} from '../assets/fontFamily';

export default function CustomDropDown({item}) {
  const [value, setValue] = useState(0);
  const [isFocus, setIsFocus] = useState(false);


  return (
    <Dropdown
      style={styles.dateDropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      data={item}
      maxHeight={300}
      labelField="label"
      valueField="value"
      // labelField={labelField}
      // valueField={valueField}
      // placeholder={value}
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        setValue(item.value);
        setIsFocus(false);
      }}
    />
  );
};

const styles = StyleSheet.create({
  dateDropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    backgroundColor: COLORS.white,
    width: '60%',
    borderRadius: 5,
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  placeholderStyle: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: FONTS.SemiBold,
    paddingLeft: 10,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: FONTS.SemiBold,
    paddingLeft: 10,
  },
});
