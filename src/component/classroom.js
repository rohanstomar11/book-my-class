import { TouchableOpacity,Text,StyleSheet, View } from "react-native";
import React, { useState } from 'react';

export default function ClassRoom({ classroomnum }) {
  const [bgColor,setBgColor]= useState('white');
  
  const changeColor = () => {
    if ( bgColor === 'white' ){
      setBgColor('green');
    }else{
      setBgColor('white');
    }
  };
  
    return(
      <TouchableOpacity style={[styles.classContainer,{backgroundColor:'${bgColor}'}]} 
      activeOpacity={0.2} 
      onPress={()=>{
        changeColor();
        console.log('Booked')
      }}>
      <Text style={styles.roomNumText}>
        { classroomnum }
      </Text>
      </TouchableOpacity> 
      
    );
}

const styles = StyleSheet.create({

  classContainer:{
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    width:60,
    height:45,
    padding:10,
    borderRadius:4,
    borderWidth:2,
    borderColor:'#C4C4C8',
    margin:4,
    
    
  },
  roomNumText:{
    fontSize:15,
    color:'black',
    fontWeight:'700'
  },

  
})