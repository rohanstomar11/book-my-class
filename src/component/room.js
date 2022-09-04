import {TouchableOpacity, Text, StyleSheet, View, Modal} from 'react-native';
import React, {useState} from 'react';
import {FONTS} from '../assets/fontFamily';
import {COLORS} from '../assets/color';
import Icon from 'react-native-vector-icons/AntDesign';

export default function ClassRoom({
  classroomnum,
  booked = false,
  select,
  disabled = false,
  bookedModal,
}) {
  const [selected, setSelected] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

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
              <View style={styles.flexEnd}>
                <TouchableOpacity
                  style={styles.op9}
                  onPress={() => setModalVisible(false)}>
                  <Icon
                    name="closecircle"
                    size={30}
                    color={COLORS.red95}
                    style={styles.user}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.first}>
                <TouchableOpacity style={styles.circle}>
                  <Text style={styles.circleText}>341</Text>
                </TouchableOpacity>
                <View style={styles.titleConatainer}>
                  <View style={styles.flexEnd}>
                    <Text style={styles.titleText}>APP DEVELOPEMENT</Text>
                  </View>
                  <View style={styles.flexEnd}>
                    <Text>Bhagyashree Dhakulkar</Text>
                  </View>
                </View>
              </View>
              <View style={styles.second}>
                <Text style={styles.modalText}>
                  This lecture is scheduled for android developement.Please come
                  fast.
                </Text>
              </View>
              <View style={styles.third}>
                <Text style={styles.timeText}>02/09/22</Text>
                <Text style={styles.timeText}>01:00PM - 02:00PM</Text>
              </View>
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
    marginTop: 10,
    textAlign: 'justify',
    color: 'black',
    fontSize: 20,
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
    fontFamily: FONTS.Medium,
    fontSize: 28,
  },
  titleConatainer: {
    justifyContent: 'center',
    marginHorizontal: 20,
    width: '75%',
  },
  titleText: {
    fontFamily: FONTS.Bold,
    color: COLORS.red,
    fontSize: 20,
    alignItems: 'flex-end',
  },
  third: {
    alignItems: 'flex-end',
  },
  timeText: {
    color: COLORS.red,
    fontFamily: FONTS.Medium,
  },
  flexEnd: {alignItems: 'flex-end'},
  op9: {activeOpacity: 0.9},
  selected: {
    fontSize: 16,
    fontFamily: FONTS.Bold,
  },
  notSelected: {
    fontSize: 15,
    fontFamily: FONTS.Medium,
  },
});
