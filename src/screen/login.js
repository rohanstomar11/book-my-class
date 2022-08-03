import React, {useState} from 'react';
import {
  ScrollView,
  TextInput,
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-vector-icons/Icon';
import logo from '../assets/logo.png';
import auth from '@react-native-firebase/auth'

const Login = ({navigation}) => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState('');

  const submit = () => {
    if (userName === '' && password === '') {
      auth()
        .signInWithEmailAndPassword(userName, password)
        .then(() => {
          console.log('User account created & signed in!');
          Alert.alert(`Redirecting to Home page...`);
          navigation.navigate('HomeScreen');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
          console.error(error);
        });
    } else {
      Alert.alert('Username and password is not correct');
    }
  };





//   const signUp = async (userName,password) => {
//     if(!userName || !password){
//       Alert.alert('Error', 'Please enter all fileds' )
//     }

//     try {
//       await auth().signInWithEmailAndPassword(userName, password);
//       console.log('User account created & signed in!');
//       Alert.alert(`Redirecting to Home page...`);
//       navigation.navigate('HomeScreen');
//     } catch (err) {
//       return Alert.alert(err.code, err.message);
//     }
// }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.logocontent}>Book My Class</Text>

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
      <Text>Forgot Password ? </Text>

      <TouchableOpacity style={styles.btn} onPress={() => submit()}>
        <Text style={styles.btntext}>Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    background: '#F9FBFE',
    padding: 15,
    flexGrow: 1,
  },

  logocontent: {
    fontWeight: '700',
    fontSize: 32,
    color: '#354354',
    paddingBottom: 10,
  },
  logo: {
    height: '45%',
    width: '60%',
    maxHeight: 300,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#FEFEFE',
    width: '95%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  btn: {
    width: '100%',
    height: 45,
    marginTop: 50,
    borderRadius: 12,
    backgroundColor: '#355EEC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btntext: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 20,
    color: 'white',
  },
});

export default Login;
