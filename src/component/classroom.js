import { TouchableOpacity,Text,StyleSheet, View } from "react-native";
import React, { useState } from 'react';

export default function ClassRoom({ classroomnum }) {
  const [selected,setSelected]= useState(false);
  
    return(
      <TouchableOpacity style={[styles.classContainer,{backgroundColor: selected ? '#000' : '#FFF'}]} 
      activeOpacity={0.2} 
      onPress={()=>{
        setSelected(!selected);
        console.log('Booked');
      }}>
      <Text style={styles.roomNumText}>
        { classroomnum }
      </Text>
      </TouchableOpacity> 
      
    );
}

const styles = StyleSheet.create({

  classContainer:{
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