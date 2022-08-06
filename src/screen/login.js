import React, {useState} from 'react';
import {
  ScrollView,
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
import Input from '../component/input';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    if (email === '') {
      return;
    }
    if (password === '') {
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
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
        <View style={styles.inputContainer}>
          <Input
            state={email}
            setState={setEmail}
            placeholder={'Email'}
            keyboard={'email-address'}
            top={'5%'}
            icon={'envelope-o'}
          />
          <Input
            state={password}
            setState={setPassword}
            placeholder={'Password'}
            top={'5%'}
            icon={'lock'}
            iconSize={32}
            hide={true}
            extra={true}
          />
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </View>
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
  inputContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: '5%',
  },
  forgotText: {
    color: COLORS.text,
    marginTop: '5%',
    fontFamily: FONTS.Regular,
    alignSelf: 'center',
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
