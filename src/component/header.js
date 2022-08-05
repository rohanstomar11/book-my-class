import * as React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {FONTS} from '../assets/fontFamily';
import {COLORS} from '../assets/color';
import  Icon from 'react-native-vector-icons/FontAwesome';

export default function Header({navigation}) {
  return (
    <View style={styles.rootcontainer}>
      

      <View style={styles.firstcont}>
        <TouchableOpacity activeOpacity={0.7}>
      <Image
            style={styles.userImg}
            source={require('../assets/images/logo.png')}
            resizeMode={'cover'}
          />
          </TouchableOpacity>
      <TouchableOpacity style={styles.floorcontainer} activeOpacity={0.8}>

          <Text style={styles.floortext}>Floor</Text>
          <Icon name='chevron-down' size={15} color = {COLORS.primary} style={styles.arrow}/>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            auth()
              .signOut()
              .then(
                () => {
                  navigation.replace('LoginScreen');
                },
                error => {
                  console.error(error);
                },
              );
          }}>
          <Icon name='user-circle' size={50} color = {COLORS.white} style={styles.user}/>
        </TouchableOpacity>

       
      </View>

{/* 
      <View style={styles.secondcont}>
        <TouchableOpacity style={styles.Datecontainer} activeOpacity={0.8}>
          <Text style={styles.floortext}>Date</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Datecontainer} activeOpacity={0.8}>
          <Text style={styles.floortext}>Time</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  rootcontainer: {
    flexDirection:'column',
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    width: '100%',
  },
  firstcont:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingBottom:5
  },
  secondcont:{
    flexDirection:'row',
    paddingVertical:5,
    justifyContent:'space-between'
  },
  
  userImg: {
   height:50,
   width:50,
   borderRadius:25,
   borderColor:COLORS.white,
   borderWidth:1
    
  },
  arrow:{
    marginRight:20
  },
 
  floorcontainer: {
    backgroundColor: COLORS.white,
    maxHeight:50,
    width: '60%',
    borderRadius: 9,
    alignItems: 'center',
    marginRight:0,
    marginTop:10,
    justifyContent:'space-between',
    flexDirection:'row',
    borderWidth:1
  
  },
  floortext: {
    color: COLORS.primary,
    fontSize: 18,
    fontFamily: FONTS.SemiBold,
    letterSpacing:0.5,
    marginLeft:20
  },
  Datecontainer: {
    backgroundColor: COLORS.white,
    minWidth:'45%',
    maxHeight:30,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center'
  },
});
