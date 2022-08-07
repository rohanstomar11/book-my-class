import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import { FONTS } from '../assets/fontFamily';
import { COLORS } from '../assets/color';

export default function ClassRoom({classroomnum, booked = false}) {
  const [selected, setSelected] = useState(false);

  return (
    <TouchableOpacity
      style={[
        styles.classContainer,
        {backgroundColor: booked ? COLORS.red95 : selected ? COLORS.green95 : COLORS.grey},
        {width : selected ? 75 : 70},
        {height : selected ? 55 :50 }
        
      ]}
      activeOpacity={0.75}
      onPress={() => {
        setSelected(!selected);
        console.log('Booked');
      }}
      disabled={booked}>

      <Text style={[styles.roomNumText ,
      {fontFamily : selected ? FONTS.Bold : FONTS.Regular},
      {fontSize :  selected ? 16 : 15 },
      {color: booked ? COLORS.white :'black'}] }>{classroomnum}
      
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  classContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 50,
    padding: 10,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#C4C4C8',
    margin: 5,
  },
  roomNumText: {
    
    color: 'black',
    fontFamily:FONTS.Regular
  },
});
