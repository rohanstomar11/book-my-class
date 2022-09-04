import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {FONTS} from '../assets/fontFamily';
import {COLORS} from '../assets/color';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomDropDown from './dropdown';
import {Dropdown} from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import {TIMEDATA, FLOORVALUE} from '../utility/constants';
import {getDate} from '../utility/helper';

export default function Header({
  navigation,
  setfloorValue,
  setTimeSlot,
  selectDate,
}) {
  const [time, setTime] = useState(TIMEDATA[0]);
  const [isFocus, setIsFocus] = useState(false);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

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

        <CustomDropDown item={FLOORVALUE} setfloorValue={setfloorValue} />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Icon
            name="setting"
            size={40}
            color={COLORS.white}
            style={styles.user}
          />

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            statusBarTranslucent={true}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={{flex: 1}}
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
                  <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Dropdown
          style={styles.timeDropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={TIMEDATA}
          maxHeight={300}
          labelField="label"
          valueField="value"
          value={time}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setTimeSlot(item.value);
            setTime(item);
            setIsFocus(false);
          }}
        />

        <View style={styles.dateContainer}>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            activeOpacity={0.85}
            style={styles.dateinput}>
            <Text style={styles.datetext}>{getDate(date)}</Text>
          </TouchableOpacity>

          <DatePicker
            modal
            open={open}
            date={date}
            mode={'date'}
            onConfirm={item => {
              setDate(item);
              selectDate(item);
              setOpen(false);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
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
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    marginTop: '25%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 16,
    elevation: 16,
    borderWidth: 1,
    borderColor: COLORS.primary,
    width: '95%',
    height: '8%',
    alignItems: 'center',
  },
  logoutText: {
    fontFamily: FONTS.Bold,
    fontSize: 18,
    color: COLORS.primary,
    letterSpacing: 0.7,
  },
  placeholderStyle: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: FONTS.SemiBold,
    paddingLeft: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: FONTS.SemiBold,
    paddingLeft: 10,
  },
  timeDropdown: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginRight: '1%',
    borderRadius: 4,
  },
  dateinput: {
    backgroundColor: COLORS.white,
    color: COLORS.text,
    width: '100%',
    padding: 2,
    borderRadius: 4,
    height: '100%',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: '1%',
    height: '100%',
  },
  user: {
    marginRight: '2%',
  },
  datetext: {
    fontSize: 16,
    alignSelf: 'center',
    color: COLORS.primary,
    fontFamily: FONTS.SemiBold,
    marginTop: '2%',
  },
});
