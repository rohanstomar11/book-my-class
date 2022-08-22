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
import {Dropdown} from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import {Button} from 'react-native';
import SingleButton from './singlebutton';

const data = [
  {label: 'Floor 0', value: '1'},
  {label: 'Floor 1', value: '1'},
  {label: 'Floor 2', value: '2'},
  {label: 'Floor 3', value: '3'},
  {label: 'Floor 4', value: '4'},
  {label: 'Floor 5', value: '5'},
];

// const timeData = [
//   {label: '10:00am- 11:00am', value: '1'},
//   {label: '11:00am- 12:00pm', value: '2'},
//   {label: '1:00pm- 2:00pm', value: '3'},
//   {label: '2:00pm- 3:00pm', value: '4'},
//   {label: '3:00pm- 4:00pm', value: '5'},
// ];

export default function Header({navigation}) {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [test, setText] = useState('Empty');
  const [open, setOpen] = useState(false);

  const [currentData, setcurrentData] = useState('')
  useEffect (() => {
    var date = new Date().getDate()// current data
    var month = new Date().getMonth() + 1 //current month 
    var year = new Date().getFullYear()// current year
    setcurrentData(
      date + '/' + month + '/' + year 
    )
  }, [])

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');

  // const [currentData, setcurrentData] = useState('')
  // useEffect (() => {
  //   var date = new Date().gatedate()// current data
  //   var month = new Date().getMonth() + 1 //current month 
  //   var year = new Date().getFullYear()// current year
  //   setcurrentData(
  //     date + '/' + month + '/' + year 
  //   )
  // }, [])
    // let tempDate = new Date(currentDate);
    // let  fDate = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
  };


  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
//   const getCurrentDate=()=>{
 
//     var date = new Date().getDate();
//     var month = new Date().getMonth() + 1;
//     var year = new Date().getFullYear();

//     //Alert.alert(date + '-' + month + '-' + year);
//     // You can turn it in to your desired format
//     return date + '-' + month + '-' + year;//format: d-m-y;
// };


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

        <Dropdown
          style={styles.floorDropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Floor"
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
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

      {/* <View style={styles.secondcont}>
        <TouchableOpacity
          style={styles.Datecontainer}
          placeholder="Select Date"
          onPress={() => showMode('date')}>
          <Text>Select Date</Text>
        </TouchableOpacity>
      </View> */}

      {/* {show && (
        <DatePicker
          testID="datePicker"
          value={date}
          mode={mode}
          displaye="default"
          onChange={onChange}
        />
      )} */}

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
      {/* <Button title="Open" onPress={() => setOpen(true)} /> */}
      <DatePicker
        modal
        open={open}
        date={date}
        mode={'date'}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
     
     <View style = {styles.dateContainer}>
      <Icon
            name="calendar"
            size={34}
            color={COLORS.white}
            style={styles.user}
            onPress={() => setOpen(true)}
          />
          <TouchableOpacity style = {styles.dateinput} >

            <Text style = {styles.datetext}>
             {currentData}
              </Text>
              
          </TouchableOpacity>
          {/* <Text >
            {currentData}
          </Text> */}
    </View>
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
  // Datecontainer: {
  //   backgroundColor: COLORS.white,
  //   minWidth: '45%',
  //   maxHeight: 30,
  //   borderRadius: 10,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  floorDropdown: {
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
  dateinput: {
    backgroundColor: COLORS.white,
    color: COLORS.text,
    width: '29%',
    height: 28,
    borderRadius: 2.5,
    justifyContent: 'center', 
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems:'center',
  },
  user: {
    marginRight: 3,
  },
  datetext: {
    paddingLeft: 10,
    fontSize: 13,
    color: COLORS.primary,
    fontFamily: FONTS.SemiBold,
    //: 'center',
  }
});
