import React, { useState } from 'react';
import { Text, View, useWindowDimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import GroundFloor from './Groundfloor';
import FirstFloor from './firstfloor'; 
import SecondFloor from './secondfloor';
import ThirdFloor from './thirdfloor';
import FouthFloor from './fourthfloor';
import FifthFloor from './fifthfloor';
import Header from '../component/header';

const renderScene = SceneMap({
  ground: GroundFloor,
  first: FirstFloor,
  second: SecondFloor,
  third: ThirdFloor,
  forth: FouthFloor,
  fifth: FifthFloor,
});

export default function HomeScreen({ navigation }) {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'ground', title: 'G Floor' },
    { key: 'first', title: '1st Floor' },
    { key: 'second', title: '2nd Floor' },
    { key: 'third', title: '3rd Floor' },
    { key: 'forth', title: '4th Floor' },
    { key: 'fifth', title: '5th Floor' },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
    />
  );

  return (
    <>
      <View style={styles.container}>
        <Header navigation={navigation} />
      </View>
      <TabView
        swipeEnabled={false}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
    paddingTop: 30,
  },
  tabbar: {
    backgroundColor: '#3f51b5',
  },
  tab: {
    width: 120,
  },
  indicator: {
    backgroundColor: '#ffffff',
  },
  label: {
    fontWeight: '400',
  },
});
