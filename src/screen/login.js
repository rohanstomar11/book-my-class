import React, {useState} from 'react';
import {
  ScrollView,
  TextInput,
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import GradientButton from '../component/gradientbutton';
import {FONTS} from '../assets/fontFamily';
import {COLORS} from '../assets/color';

const Login = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    if (userName === '') {
      return;
    }
    if (password === '') {
      return;
    }
    auth()
      .signInWithEmailAndPassword(userName, password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.replace('HomeScreen');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        overScrollMode={'never'}
        contentContainerStyle={styles.container}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
        <Text style={styles.title}>Book My Class</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={'grey'}
          autoCapitalize="none"
          value={userName}
          onChangeText={actualdata => setUserName(actualdata)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={'grey'}
          secureTextEntry={true}
          value={password}
          onChangeText={actualdata => setPassword(actualdata)}
        />
        <Text style={styles.forgotText}>Forgot Password?</Text>
        <View style={styles.btnContainer}>
          <GradientButton text={'LOGIN'} onPress={submit} />
        </View>
      </ScrollView>
      <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    background: COLORS.background,
  },
  container: {
    alignItems: 'center',
    flexGrow: 1,
    background: COLORS.background,
  },
  logo: {
    marginTop: '20%',
  },
  title: {
    fontSize: 32,
    color: COLORS.primary,
    marginTop: '10%',
    fontFamily: FONTS.Bold,
  },
  input: {
    backgroundColor: COLORS.white,
    width: '90%',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: '5%',
  },
  forgotText: {
    color: COLORS.text,
    marginTop: '5%',
    fontFamily: FONTS.Regular,
  },
  btnContainer: {
    width: '100%',
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: '10%',
  },
});

export default Login;
