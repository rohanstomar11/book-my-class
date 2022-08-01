import React from 'react';
import {
  Button,
  ScrollView,
  TextInput,
  View,
  Image,
  StyleSheet,
  Text,
} from 'react-native';

const CustomInput = placeholder => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEFEFE',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {},
});

export default CustomInput;
