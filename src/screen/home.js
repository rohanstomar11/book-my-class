import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../assets/color';
import Header from '../component/header';
import ClassRoom from '../component/room';
import GradientButton from '../component/gradientbutton';
import database from '@react-native-firebase/database';
import {FLOOR, TIMEDATA} from '../utility/constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import {FONTS} from '../assets/fontFamily';
import Input from '../component/input';
import Lottie from 'lottie-react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import {getDate} from '../utility/helper';

const HomeScreen = ({navigation}) => {
  const [floor, setFloor] = useState([]);
  const [selected, setSelected] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [bookedRoom, setBookedRoom] = useState([]);
  const [floorValue, setfloorValue] = useState(0);
  const [timeSlot, setTimeSlot] = useState(0);
  const [date, setDate] = useState(new Date());
  const height = Dimensions.get('screen').height;
  const [title, setTitle] = useState('');
  const [faculty, setFaculty] = useState('');
  const [description, setDescription] = useState('');

  const booking = useRef();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setisLoading(true);
    setFloor(FLOOR[floorValue]);
    const subscribe = database()
      .ref(
        `/bookings/${date.getFullYear()}/${(
          parseInt(date.getMonth(), 10) + 1
        ).toString()}/${date.getDate()}/${floorValue}/${timeSlot}`,
      )
      .on('value', snapshot => {
        setBookedRoom([]);
        snapshot.forEach(item => {
          if (!snapshot.exists()) {
            setBookedRoom([]);
          } else {
            setBookedRoom(rooms => [...rooms, item.key.toString()]);
          }
        });
      });
    setisLoading(false);

    return () =>
      database()
        .ref(
          `/bookings/${date.getFullYear()}/${(
            parseInt(date.getMonth(), 10) + 1
          ).toString()}/${date.getDate()}/${floorValue}/${timeSlot}`,
        )
        .off('value', subscribe);
  }, [floorValue, timeSlot, date]);

  const selectingRoom = room => {
    if (selected === room) {
      setSelected();
    } else {
      setSelected(room);
    }
  };

  const bookRoom = () => {
    booking.current.open();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        setfloorValue={setfloorValue}
        setTimeSlot={setTimeSlot}
        selectDate={setDate}
      />

      {isLoading && (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size={60} color={COLORS.primary} />
        </View>
      )}
      {!isLoading && (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {floor &&
            floor.map((item, index) => {
              return (
                <ClassRoom
                  classroomnum={item}
                  key={index}
                  select={selectingRoom}
                  disabled={selected === item ? false : selected ? true : false}
                  booked={bookedRoom.includes(item)}
                  date={date}
                  time={timeSlot}
                  floor={floorValue}
                />
              );
            })}
        </ScrollView>
      )}
      <View style={styles.sticky}>
        <View style={styles.btnContainer}>
          <GradientButton
            text={'BOOK ROOM'}
            onPress={bookRoom}
            disabled={selected ? false : true}
          />
        </View>
      </View>

      <RBSheet
        ref={booking}
        height={height * 0.55}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            backgroundColor: COLORS.white,
            borderWidth: 2,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            borderColor: COLORS.primary,
          },
        }}>
        <View style={styles.bookingModalContainer}>
          <View style={styles.bookingModalTextContainer}>
            <Text style={styles.bookingModalRoomNoText}>{selected}</Text>
          </View>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateText}>{getDate(date)}</Text>
            <Text style={styles.timeText}>{TIMEDATA[timeSlot]?.label}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => booking.current.close()}
            style={styles.flex}>
            <Icon
              name={'close'}
              size={30}
              style={styles.bookingModalClose}
              color={COLORS.red95}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.marginH16}>
          <Input
            state={title}
            setState={setTitle}
            placeholder={'Title'}
            top={'5%'}
            icon={'envelope-o'}
          />
          <Input
            state={faculty}
            setState={setFaculty}
            placeholder={'Faculty Name'}
            top={'5%'}
            icon={'envelope-o'}
          />
          <Input
            state={description}
            setState={setDescription}
            placeholder={'Description'}
            top={'5%'}
            icon={'envelope-o'}
            multiline={true}
          />
        </View>
        <View style={styles.bookingModalRoomBtn}>
          <GradientButton
            text={'BOOK'}
            onPress={() => {
              database()
                .ref(
                  `/bookings/${date.getFullYear()}/${(
                    parseInt(date.getMonth(), 10) + 1
                  ).toString()}/${date.getDate()}/${floorValue}/${timeSlot}/${selected}`,
                )
                .set({
                  title: title,
                  faculty: faculty,
                  description: description,
                  userID: 'admin',
                })
                .then(
                  () => {
                    setSuccess(true);
                  },
                  error => {
                    console.error(error);
                  },
                );
            }}
          />
        </View>

        {success && (
          <Lottie
            autoPlay={true}
            source={require('../assets/lottie/success.json')}
            loop={false}
            style={styles.successLottie}
            onAnimationFinish={() => {
              setSuccess(false);
              booking.current.close();
              setSelected();
            }}
          />
        )}
      </RBSheet>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  btnContainer: {
    width: '100%',
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: '10%',
  },
  activityIndicator: {
    flex: 1,
    top: '50%',
    left: '45%',
    position: 'absolute',
    zIndex: 20,
  },
  scrollView: {
    flexDirection: 'row',
    flexGrow: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: '5%',
  },
  sticky: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    marginBottom: 20,
    minHeight: 54,
  },
  bookingModalContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: '5%',
    marginLeft: '5%',
  },
  bookingModalTextContainer: {
    backgroundColor: COLORS.primary,
    height: 80,
    width: 80,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingModalRoomNoText: {
    fontFamily: FONTS.Bold,
    color: COLORS.white,
    fontSize: 30,
    letterSpacing: 2,
  },
  bookingModalRoomBtn: {
    position: 'absolute',
    bottom: 10,
    width: '90%',
    alignSelf: 'center',
  },
  marginH16: {marginHorizontal: 16},
  flex: {flex: 1},
  bookingModalClose: {
    position: 'absolute',
    right: '20%',
    top: '-15%',
    paddingVertical: 5,
    paddingHorizontal: 8,
    elevation: 16,
    borderRadius: 20,
  },
  successLottie: {position: 'absolute', backgroundColor: 'transparent'},
  dateTimeContainer: {flex: 1, justifyContent: 'center', marginLeft: '3%'},
  dateText: {
    fontFamily: FONTS.SemiBold,
    color: COLORS.primary,
    fontSize: 16,
  },
  timeText: {
    fontFamily: FONTS.Medium,
    color: COLORS.primary,
    fontSize: 14,
  },
});

export default HomeScreen;
