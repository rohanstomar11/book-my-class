import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screen/home';
import Splash from './src/screen/splash';
import Login from './src/screen/login';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={Splash} />
          <Stack.Screen name="LoginScreen" component={Login} />
          <Stack.Screen name="HomeScreen" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar barStyle="light-content" />
    </SafeAreaView>
  );
};

export default App;
