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
          `/users/${`/bookings/${date.getFullYear()}/${(
            parseInt(date.getMonth(), 10) + 1
          ).toString()}/${date.getDate()}/${floorValue}/0`}`,
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
    console.log('Book Room: ' + selected);
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
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginTop: '5%',
            marginLeft: '5%',
          }}>
          <View
            style={{
              backgroundColor: COLORS.primary,
              paddingVertical: 20,
              paddingHorizontal: 16,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: FONTS.Bold,
                color: COLORS.white,
                fontSize: 30,
                letterSpacing: 2,
              }}>
              {selected}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center', marginLeft: '3%'}}>
            <Text
              style={{
                fontFamily: FONTS.SemiBold,
                color: COLORS.primary,
                fontSize: 16,
              }}>
              02/08/2022
            </Text>
            <Text
              style={{
                fontFamily: FONTS.Medium,
                color: COLORS.primary,
                fontSize: 14,
              }}>
              {TIMEDATA[timeSlot]?.label}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => booking.current.close()}
            style={{flex: 1}}>
            <Icon
              name={'close'}
              size={30}
              style={{
                position: 'absolute',
                right: '20%',
                top: '-15%',
                paddingVertical: 5,
                paddingHorizontal: 8,
                elevation: 16,
                borderRadius: 20,
              }}
              color={COLORS.red95}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 16}}>
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
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            width: '90%',
            alignSelf: 'center',
          }}>
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
            style={{position: 'absolute', backgroundColor: 'transparent'}}
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
});

export default HomeScreen;
