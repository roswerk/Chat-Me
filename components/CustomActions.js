import React, { Component} from "react";
import {TouchableOpacity, StyleSheet, Text, View} from "react-native";

// PropTypes ensures that a component use the correct data type and 
// passes the right data, and that components use the right type of props, 
// and that receiving components receive the right type of props
import PropTypes from "prop-types";

// Expo hardward manipulation APIs
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

// Import Firebase
import firebase from "firebase";

export default class CustomActions extends Component{


// ====================== Start of CustomAction Functions  

// Send a Image from Library 
imagePicker = async() => {

  const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

try{
  if(status === "granted"){
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "All",
    }).catch((error) => console.log(error));

    if(!result.cancelled){
      // This is for DB
      const imageUrl = await this.uploadImageFetch(result.uri);
      this.props.onSend({image: result.uri})
    }
  }
}
catch(error){
  console.log(error.message)
}
}


// Open's camara and send a picture 
takePhoto = async() => {

  const {status} = await Permissions.askAsync(Permissions.CAMERA);

try{
  if(status === "granted"){
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: "All",
    }).catch((error) => console.log(error));

    if(!result.cancelled){
      const imageUrl = await this.uploadImageFetch(result.uri);
      this.props.onSend({image: result.uri})
    }
  }
}
catch(error){
  console.log(error.message)
}
}


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


// ====================== End of CustomAction Functions  

// Uploading images to Firebase storage
uploadImageFetch = async (uri) => {

// Creates our own XMLHttpRequest
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function (){
      resolve(xhr.response);
    };
    xhr.onerror = function (e){
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });


  const imageNameBefore = uri.split("/");
  const imageName = imageNameBefore[imageNameBefore.length -1];

// Creates a reference to the storage and use PUT to store the content 
// retrieved from the Ajax request
  const ref = firebase.storage().ref().child(`images/${imageName}`);
  const snapshot = await ref.put(blob);

// Closes the connection
  blob.close();

  return await snapshot.ref.getDownloadURL();
}






// CustomActions Functions grouped on a wrapper
    onActionPress = () => {
    const options = ["Chose from Library", "Take Picture", "Send Location", "Cancel"];
    const cancelButtonIndex = options.length -1;
    this.context.actionSheet().showActionSheetWithOptions({
      options,
      cancelButtonIndex,
    },
    async (buttonIndex) => {
      switch (buttonIndex){
        case 0: 
        console.log("User wants to send image from library");
        return this.imagePicker();

        case 1: 
        console.log("User wants to take a picture");
        return this.takePhoto();

        case 2: 
        console.log("User wants to send his location");
        return this.getLocation();
      }
    },
    );
  };





  render(){
    return( 
      
    <TouchableOpacity
    style={[styles.container]}
    onPress={this.onActionPress}
    accessible={true}
    accessibilityLabel="Sending Options"
    accessibilityHint="Lets you choose to send a image or your location"
    >
    
      <View 
      style={[styles.wrapper, this.props.wrapperStyle]}>

      <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
      </ View>
      </ TouchableOpacity>
    );   
  }

}


const styles = StyleSheet.create({
  container:{
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10
  },
  wrapper:{
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1
  },
  iconText:{
    color: '#b2b2b2',
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "transparent",
    textAlign: "center"
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};