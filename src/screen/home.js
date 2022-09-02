import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  ActivityIndicator,
  Modal,
  Text,
  ScrollView,
} from 'react-native';
import {COLORS} from '../assets/color';
import Header from '../component/header';
import ClassRoom from '../component/room';
import firestore from '@react-native-firebase/firestore';
import GradientButton from '../component/gradientbutton';
import database from '@react-native-firebase/database';

const HomeScreen = ({navigation}) => {
  const [roomCount, setRoomCount] = useState(0);
  const [floor, setFloor] = useState([]);
  const [selected, setSelected] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [bookedRoom, setBookedRoom] = useState([]);
  const [floorValue, setfloorValue] = useState(0);
  const [max, setmax] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const reference = database()
    .ref('/bookings/2022/7/2/0/1')
    .on('value', snapshot => {
      setBookedRoom(rooms => [...rooms, snapshot.val().roomId.toString()]);
    });

  useEffect(() => {
    setisLoading(true);
    firestore()
      .collection('floors')
      .doc(floorValue.toString())
      .get()
      .then(
        response => {
          if (max === true) {
            setFloor([]);
          }
          setRoomCount(response._data?.room_count);
          for (let i = 1; i <= response._data?.room_count; i++) {
            if (Object.keys(floor).length < roomCount) {
              if (i < 10) {
                let item = floorValue.toString() + '0' + i.toString();
                setFloor(floor => [...floor, item]);
              } else {
                let item = floorValue.toString() + i.toString();
                setFloor(floor => [...floor, item]);
                if (Object.keys(floor).length === roomCount - 1) {
                  setmax(true);
                }
              }
            } else {
              setmax(true);
            }
          }
          setisLoading(false);
        },
        error => {
          setisLoading(false);
          console.error(error);
        },
      );
  }, [roomCount, floorValue]);

  const selectingRoom = room => {
    if (selected === room) {
      setSelected();
    } else {
      setSelected(room);
    }
  };

  const bookRoom = room => {
    console.log('book room' + room);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} setfloorValue={setfloorValue} />

      <View style={styles.CreatedView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                This Lecure will be conducted by Prof.Bhagyashree Dhakulkar
                Subj:{' '}
              </Text>
            </View>
          </View>
        </Modal>
      </View>

      {isLoading && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={60} color={COLORS.primary} />
        </View>
      )}
      {!isLoading && (
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            flexGrow: 1,
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
        </ScrollView>
      )}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          marginBottom: 20,
          minHeight: 54,
        }}>
        <View style={styles.btnContainer}>
          <GradientButton text={'BOOK ROOM'} onPress={bookRoom} />
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
  imagecontainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingBottom: 30,
    paddingTop: 30,
    paddingLeft: 100,
    paddingRight: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  button: {
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    marginBottom: 20,
  },
  btnContainer: {
    width: '100%',
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: '10%',
  },
  buttonOpen: {
    backgroundColor: COLORS.secondary,
    marginTop: 50,
    marginLeft: 30,
    marginRight: 30,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  modalText: {
    marginBottom: 30,
    textAlign: 'justify',
    color: 'black',
    fontSize: 20,
  },
});

export default HomeScreen;
