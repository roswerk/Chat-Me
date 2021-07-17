import { styleSheets } from "min-document";
import React from "react";
import { Component} from "react";
import {TouchableOpacity, StyleSheet, Text, View} from "react-native";
import * as Location from "expo-location";
export default class CustomActions extends Component{
// Send user locations 
getLocation = async () => {

try{
  let {status} = await Permissions.askAsync(Permissions.LOCATION);

  if(status === "granted"){
    const result = await Location.getCurrentPositionAsync({})
    .catch((error) => console.log(error))

    const longitude = JSON.stringify(result.coords.longitude);
    const latitude = JSON.stringify(result.coords.latitude);

    if(result){
      this.props.onSend({
        location: {
          longitude: result.coords.longitude,
          latitude: result.coords.latitude,
        },
      });
    }
  }
} catch(error){
  console.log(error.message)
  }
}
  render(){
    return( 
    <TouchableOpacity
    style={[styles.container]}
    >
    );   
}
const styles = StyleSheet.create({
  container:{
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10
  },
});
