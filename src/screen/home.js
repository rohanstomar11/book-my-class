import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  ActivityIndicator,
} from 'react-native';
import {COLORS} from '../assets/color';
import Header from '../component/header';
import ClassRoom from '../component/room';
import firestore from '@react-native-firebase/firestore';
import SingleButton from '../component/singlebutton';

const HomeScreen = ({navigation}) => {
  const [roomCount, setRoomCount] = useState(0);
  const [floor, setFloor] = useState([]);
  const [selected, setSelected] = useState();
  const [isLoading, setisLoading] = useState(false);
  const bookedRoom = ['011', '022'];

  useEffect(() => {
    setisLoading(true);
    firestore()
      .collection('floors')
      .doc('0')
      .get()
      .then(
        response => {
          setRoomCount(response._data?.room_count);
          for (let i = 1; i <= response._data?.room_count; i++) {
            if (Object.keys(floor).length < roomCount) {
              if (i < 10) {
                let item = '00' + i.toString();
                setFloor(floor => [...floor, item]);
              } else {
                let item = '0' + i.toString();
                setFloor(floor => [...floor, item]);
              }
            }
          }
          setisLoading(false);
        },
        error => {
          setisLoading(false);
          console.error(error);
        },
      );
  }, [roomCount]);

  const selectingRoom = room => {
    if (selected === room) {
      setSelected();
    } else {
      setSelected(room);
    }
  };

  const checkInfo = room => {
    console.log('check info clicked' + room);
  };

  const bookRoom = room => {
    console.log('book room' + room);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      {isLoading && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={60} color={COLORS.primary} />
        </View>
      )}
      {!isLoading && (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: '5%',
          }}>
          {floor.map((item, index) => {
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
        </View>
      )}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          marginBottom: 20,
          minHeight: 54,
        }}>
        <View style={{flex: 1, marginHorizontal: 16}}>
          <SingleButton
            text={'Check Info'}
            disabled={selected ? false : true}
            onPress={checkInfo}
          />
        </View>
        <View style={{flex: 1, marginRight: 16}}>
          <SingleButton
            text={'Book Now'}
            color={COLORS.green}
            disabled={selected ? false : true}
            onPress={bookRoom}
          />
        </View>
      </View>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
});

export default HomeScreen;
