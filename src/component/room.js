import {TouchableOpacity, Text, StyleSheet, View, Modal} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FONTS} from '../assets/fontFamily';
import {COLORS} from '../assets/color';
import Icon from 'react-native-vector-icons/AntDesign';
import {getDate} from '../utility/helper';
import {TIMEDATA} from '../utility/constants';
import database from '@react-native-firebase/database';

export default function ClassRoom({
  classroomnum,
  booked = false,
  select,
  disabled = false,
  bookedModal,
  date,
  time,
  floor,
}) {
  const [selected, setSelected] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [details, setDetails] = useState({});

  useEffect(() => {
    const subscribe = database()
      .ref(
        `/bookings/${date.getFullYear()}/${(
          parseInt(date.getMonth(), 10) + 1
        ).toString()}/${date.getDate()}/${floor}/${time}/${classroomnum}`,
      )
      .on('value', snapshot => {
        setDetails(snapshot.val());
      });

    return () => {
      database()
        .ref(
          `/bookings/${date.getFullYear()}/${(
            parseInt(date.getMonth(), 10) + 1
          ).toString()}/${date.getDate()}/${floor}/${time}/${classroomnum}`,
        )
        .off('value', subscribe);
    };
  }, [floor, date, time, classroomnum]);

  const BookedModalCard = () => {
    return (
      <View style={styles.createdView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.first}>
                <View style={styles.circle}>
                  <Text style={styles.circleText}>{classroomnum}</Text>
                </View>
                <View style={styles.titleContainer}>
                  <View>
                    <Text style={styles.titleText}>{details?.title}</Text>
                  </View>
                  <View>
                    <Text style={styles.facultyText}>{details?.faculty}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.second}>
                <Text style={styles.modalText}>{details?.description}</Text>
              </View>
              <View style={styles.third}>
                <Text style={styles.dateText}>{getDate(date)}</Text>
                <Text style={styles.timeText}>{TIMEDATA[time]?.label}</Text>
              </View>
              <TouchableOpacity
                style={styles.close}
                onPress={() => setModalVisible(false)}>
                <Icon
                  name="closecircle"
                  size={30}
                  color={COLORS.hint}
                  style={styles.user}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.classContainer,
        {
          backgroundColor: booked
            ? COLORS.red95
            : selected
            ? COLORS.green95
            : COLORS.white,
        },
      ]}
      activeOpacity={0.75}
      onPress={() => {
        if (booked) {
          setModalVisible(true);
        } else {
          setSelected(!selected);
          select(classroomnum);
        }
      }}>
      <BookedModalCard />
      <Text
        style={[
          styles.roomNumText,
          selected ? styles.selected : styles.notSelected,
          {
            color: booked
              ? COLORS.white
              : selected
              ? COLORS.white
              : COLORS.text,
          },
        ]}>
        {classroomnum}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  createdView: {
    width: '100%',
  },
  classContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: '2%',
    marginVertical: '3%',
    elevation: 16,
    width: 60,
    height: 60,
  },
  roomNumText: {
    color: COLORS.text,
    fontFamily: FONTS.Regular,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 2,
    borderColor: 'red',
  },
  modalText: {
    marginTop: '5%',
    color: COLORS.text,
    fontSize: 20,
    fontFamily: FONTS.Regular,
  },
  first: {
    flexDirection: 'row',
  },
  circle: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  circleText: {
    color: COLORS.white,
    fontFamily: FONTS.Bold,
    fontSize: 28,
  },
  titleContainer: {
    justifyContent: 'center',
    marginHorizontal: 20,
    width: '75%',
  },
  titleText: {
    fontFamily: FONTS.Bold,
    color: COLORS.red,
    fontSize: 24,
  },
  facultyText: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: COLORS.text,
    fontStyle: 'italic',
    letterSpacing: 1,
  },
  third: {
    alignItems: 'flex-end',
  },
  dateText: {
    color: COLORS.red,
    fontFamily: FONTS.SemiBold,
    fontSize: 18,
  },
  timeText: {
    color: COLORS.red,
    fontFamily: FONTS.Medium,
  },
  flexEnd: {alignItems: 'flex-end'},
  close: {
    position: 'absolute',
    right: '3%',
    top: '5%',
  },
  selected: {
    fontSize: 16,
    fontFamily: FONTS.Bold,
  },
  notSelected: {
    fontSize: 15,
    fontFamily: FONTS.Medium,
  },
});
