import React from 'react';
import {StyleSheet, StatusBar, SafeAreaView, View} from 'react-native';
import {COLORS} from '../assets/color';
import Header from '../component/header';
import ClassRoom from '../component/room';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <View style={{flexDirection:'row'}}>
      <ClassRoom classroomnum={'001'}/>
      <ClassRoom classroomnum={'002'} booked={true}/>
      <ClassRoom classroomnum={'003'}/>
      <ClassRoom classroomnum={'004'}/>
      
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
