import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  ActivityIndicator,
  ImageBackground,
  Modal,
  Text,
  Pressable,
  Alert,
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
  const [floorValue, setfloorValue] = useState(0);
  const [max, setmax] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
            if (Object.keys(floor).length <= roomCount) {
              if (i < 10) {
                let item = floorValue.toString() + '0' + i.toString();
                setFloor(floor => [...floor, item]);
              } else {
                // let item = '0' + i.toString();
                let item = floorValue.toString() + i.toString();
                setFloor(floor => [...floor, item]);
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

  const checkInfo = room => {
    console.log('check info clicked' + room);
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
            onPress={() => setModalVisible(true)}
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
