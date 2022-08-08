import React, {useEffect, useState} from 'react';
import {StyleSheet, StatusBar, SafeAreaView, View, Text} from 'react-native';
import {COLORS} from '../assets/color';
import Header from '../component/header';
import ClassRoom from '../component/room';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({navigation}) => {
  const [roomCount, setRoomCount] = useState(0);
  const [floor, setFloor] = useState([]);

  useEffect(() => {
    firestore()
      .collection('floors')
      .doc('0')
      .get()
      .then(
        response => {
          setRoomCount(response._data?.room_count);
        },
        error => {
          console.error(error);
        },
      );
    for (let i = 1; i <= 25; i++) {
      if (Object.keys(floor).length <= roomCount) {
        if (i < 10) {
          let item = '00' + i.toString();
          setFloor(floor => [...floor, item]);
        } else {
          let item = '0' + i.toString();
          setFloor(floor => [...floor, item]);
        }
      }
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginTop: '5%',
        }}>
        {floor.map((item, index) => {
          return <ClassRoom classroomnum={item} key={item} />;
        })}
      </View>
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
