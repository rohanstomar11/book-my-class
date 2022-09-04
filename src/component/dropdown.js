import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {COLORS} from '../assets/color';
import {FONTS} from '../assets/fontFamily';

export default function CustomDropDown({item, setfloorValue}) {
  const [value, setValue] = useState(item[0]);

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
      value={value}
      onChange={items => {
        setValue(items.value);
        setfloorValue(items.value);
      }}
    />
  );
}

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
