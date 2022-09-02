import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Text,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {FONTS} from '../assets/fontFamily';
import {COLORS} from '../assets/color';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomDropDown from './dropdown';
import {Dropdown} from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';

const data = [
  {label: 'Floor 0', value: '0'},
  {label: 'Floor 1', value: '1'},
  {label: 'Floor 2', value: '2'},
  {label: 'Floor 3', value: '3'},
  {label: 'Floor 4', value: '4'},
  {label: 'Floor 5', value: '5'},
];

const timeData = [
  {label: '10:00am- 11:00am', value: '1'},
  {label: '11:00am- 12:00pm', value: '2'},
  {label: '1:00pm- 2:00pm', value: '3'},
  {label: '2:00pm- 3:00pm', value: '4'},
  {label: '3:00pm- 4:00pm', value: '5'},
];

export default function Header({navigation, setfloorValue}) {
  const [value, setValue] = useState(0);
  const [time, setTime] = useState(0);
  const [isFocus, setIsFocus] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const [currentData, setcurrentData] = useState('');
  useEffect(() => {
    var date = new Date().getDate(); // current data
    var month = new Date().getMonth() + 1; //current month
    var year = new Date().getFullYear(); // current year
    setcurrentData(date + '/' + month + '/' + year);
  }, []);

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

        <CustomDropDown item={data} setfloorValue={setfloorValue} />
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

      <View style={{flexDirection: 'row'}}>
        <Dropdown
          style={styles.timeDropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={timeData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Time Slot"
          time={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setTime(item.value);
            setIsFocus(false);
          }}
        />

        <DatePicker
          modal
          open={open}
          date={date}
          mode={'date'}
          onConfirm={() => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <View style={styles.dateContainer}>
          <Icon
            name="calendar"
            size={34}
            color={COLORS.white}
            style={styles.user}
            onPress={() => setOpen(true)}
          />
          <TouchableOpacity style={styles.dateinput}>
            <Text style={styles.datetext}>{currentData}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootcontainer: {
    flexDirection: 'column',
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    width: '100%',
  },
  firstcont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userImg: {
    height: 55,
    width: 55,
    borderRadius: 25,
    borderColor: COLORS.white,
    borderWidth: 0,
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
    margin: 10,
    height: 30,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    backgroundColor: COLORS.white,
    width: '55%',
    borderRadius: 4,
  },
  dateinput: {
    backgroundColor: COLORS.white,
    color: COLORS.text,
    width: '50%',
    height: 28,
    borderRadius: 2.5,
    justifyContent: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    marginRight: 3,
  },
  datetext: {
    paddingLeft: 10,
    fontSize: 13,
    color: COLORS.primary,
    fontFamily: FONTS.SemiBold,
  },
});
