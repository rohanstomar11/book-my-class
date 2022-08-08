import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {FONTS} from '../assets/fontFamily';
import {COLORS} from '../assets/color';

export default function ClassRoom({
  classroomnum,
  booked = false,
  select,
  disabled = false,
}) {
  const [selected, setSelected] = useState(false);

  return (
    <TouchableOpacity
      disabled={disabled || booked}
      style={[
        styles.classContainer,
        {
          backgroundColor: booked
            ? COLORS.red95
            : selected
            ? COLORS.green95
            : COLORS.white,
        },
      ]}
      activeOpacity={0.75}
      onPress={() => {
        setSelected(!selected);
        select(classroomnum);
      }}>
      <Text
        style={[
          styles.roomNumText,
          {fontFamily: selected ? FONTS.Bold : FONTS.Medium},
          {fontSize: selected ? 16 : 15},
          {
            color: booked
              ? COLORS.white
              : selected
              ? COLORS.white
              : COLORS.text,
          },
        ]}>
        {classroomnum}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  classContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: '2%',
    marginVertical: '3%',
    elevation: 16,
    width: 60,
    height: 60,
  },
  roomNumText: {
    color: COLORS.text,
    fontFamily: FONTS.Regular,
  },
});
