import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const App  = () => {

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle='light-content' />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{color: '#354354'}}>Let's Go</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
