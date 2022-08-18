import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {FONTS} from '../assets/fontFamily';
import {COLORS} from '../assets/color';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomDropDown from './dropdown';



const data = [
  {label: 'Floor 0', value: '1'},
  {label: 'Floor 1', value: '1'},
  {label: 'Floor 2', value: '2'},
  {label: 'Floor 3', value: '3'},
  {label: 'Floor 4', value: '4'},
  {label: 'Floor 5', value: '5'},
];


export default function Header({navigation}) {

  return (
    <View style={styles.rootcontainer}>
      <View style={styles.firstcont}>
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            style={styles.userImg}
            source={require('../assets/images/logo.png')}
            resizeMode={'cover'}
          />
        </TouchableOpacity>

        <CustomDropDown item={data}/>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            auth()
              .signOut()
              .then(
                () => {
                  navigation.replace('LoginScreen');
                },
                error => {
                  console.error(error);
                },
              );
          }}>
          <Icon
            name="setting"
            size={45}
            color={COLORS.white}
            style={styles.user}
          />
        </TouchableOpacity>
      </View>


      {/* <Dropdown
        style={styles.timeDropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={timeData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Time Slot"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  rootcontainer: {
    flexDirection: 'column',
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    width: '100%',
  },
  firstcont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  secondcont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  userImg: {
    height: 55,
    width: 55,
    borderRadius: 25,
    borderColor: COLORS.white,
    borderWidth: 0,
  },

  floorcontainer: {
    backgroundColor: COLORS.white,
    width: '60%',
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  floortext: {
    color: COLORS.primary,
    fontSize: 18,
    fontFamily: FONTS.SemiBold,
    letterSpacing: 0.5,
    marginLeft: 20,
  },
  Datecontainer: {
    backgroundColor: COLORS.white,
    minWidth: '45%',
    maxHeight: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
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

  timeDropdown: {
    margin: 16,
    height: 30,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    backgroundColor: COLORS.white,
    width: '50%',
    borderRadius: 5,
  },
});
