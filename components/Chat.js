import React from "react";
import { View, StyleSheet, Platform, KeyboardAvoidingView, Button, Text } from "react-native";

// Local Storage on React Native
import AsyncStorage from "@react-native-async-storage/async-storage";

// Importing NetInfo a package that helps checking if a user is online/offline.
// Returns an object with a boolean property called isConnnected 
import NetInfo from "@react-native-community/netinfo";

// Import GiftedChat library 
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
// Import MapView 
import MapView from "react-native-maps";

// Importing Firebase 
const firebase = require("firebase");
require("firebase/firestore");

  // The web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAQWTab2CjGlRZO2S24gZWWmvpZmMA6xLs",
    authDomain: "testingfirebase2021.firebaseapp.com",
    projectId: "testingfirebase2021",
    storageBucket: "testingfirebase2021.appspot.com",
    messagingSenderId: "204180526729",
    appId: "1:204180526729:web:e0c2400b33ae7c08fb9858",
    measurementId: "G-H4SPVCC54N"
  };

export default class Chat extends React.Component{

  constructor(){
    super();
  
    this.state = {
      messages: [],
      uid: 0,
      isConnected: false

    }

  // Initialize Firebase
  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    }

  this.referenceChatMessages = firebase.firestore().collection("messages");
  }
  

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
        location: data.location || null,
      });
    });
    this.setState({
      messages,
    })
  }

   // Add messages to the state and DB
 addMessages(){
  // Appends message info to the messages state
  const message = this.state.messages[0];

  // Adds message information to the firestore DB
  this.referenceChatMessages.add({
    _id: message._id,
    text: message.text || null,
    createdAt: message.createdAt,
    user: message.user,
    location: message.location || null, 
  })
}

/*
This is the approach used for Firestore DB
  componentDidMount(){

    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async(user) => {

      if(!user){
        await firebase.auth().signInAnonymously();
      }
      // update user state with currently active user data
      this.setState({
        uid: user.uid,
        messages: [],
        user:{
          _id: user.uid,
          name: user.name,
          avatar: "https://placeimg.com/139/139/any"
        },
      });

      this.unsubscribe = this.referenceChatMessages
      .orderBy("createdAt", "desc")
      .onSnapshot(this.onCollectionUpdate);
    })


    // Listen for updates in  collection using Firestore’s onSnapshot() function.
    this.referenceChatMessages = firebase
    .firestore()
    .collection("messages");

    this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate);
  }

*/

// This is the approach used for Firestore DB

// Stop receiving updates about a collection
//   componentWillUnmount() {
//     this.unsubscribe();
//     this.authUnsubscribe();
//  }






// This approach is for AsyncStorage. 
//It saves the messages in the Apps client storage

async saveMessages(){
  try{
   await AsyncStorage.setItem("messages", JSON.stringify(this.state.messages)); 
   console.log(this.state.messages)
  } catch(error){
   console.log(error.message)
  }
}

// This function is for AsyncStorage testing. 
//It retrieves the messages
async getMessages(){
  let messages = "";

  try{
  messages = await AsyncStorage.getItem("messages") || []
  this.setState({
    messages: JSON.parse(messages)
  });
  } catch(error){
    console.log(error.message)
  };
};


// This function is for AsyncStorage testing. 
//It removes the messages. Only for dev purposes

async deleteMessages(){
try{
  await AsyncStorage.removeItem("messages");
  this.setState({
    messages: []
  })
} catch(error){
  console.log(error.message)
}
};


componentDidMount(){

  NetInfo.fetch().then(connection => {

    if(connection.isConnected){
      console.log("Online Mount");

    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async(user) => {

      if(!user){
        await firebase.auth().signInAnonymously();
      }
      // update user state with currently active user data
      this.setState({
        uid: user.uid,
        messages: [],
        user:{
          _id: user.uid,
          name: user.name,
          avatar: "https://placeimg.com/139/139/any"
        },
        isConnected: true
      });

      this.unsubscribe = this.referenceChatMessages
      .orderBy("createdAt", "desc")
      .onSnapshot(this.onCollectionUpdate);
    })


    // Listen for updates in  collection using Firestore’s onSnapshot() function.
    this.referenceChatMessages = firebase
    .firestore()
    .collection("messages");

    this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate);
    }
    else{
      console.log("Offline Mount");
      this.getMessages();
    }
  })
}

// This approach is for AsyncStorage. 
//It removes the messages. Only for dev purposes
  componentWillUnmount() {
    NetInfo.fetch().then(connection => {
      
      if(connection.isConnected){
        console.log("Online Umount");
// Stop receiving updates about a collection
    this.unsubscribe();
    this.authUnsubscribe();
      }
      
      else{
        console.log("Offline Umount");
// Deletes messages saved on local storage

// Not needed atm
  // this.deleteMessages();
}
 })
};


// Function that appends the last message to the message state annd returns all messages
  onSend(messages = []){
  this.setState(previousState => ({
    messages: GiftedChat.append(previousState.messages, messages),
  }),
  () => {
    // addMessages includes messages to DB and messages state
    this.addMessages();
    // saveMessages saves the messages in the AsyncStore
    this.saveMessages();
  },);
  };






// RenderBubble inherits the props from Bubble and changes the wrapperStyle + 
// textStyle of the Bubble element on the GiftedChat component
  renderBubble(props){
    return(
      <Bubble
// Inherit props
      {...props}
// Change chats bubble by modifying the wrapperStyle background color
      wrapperStyle={{
        // Left bubble
        left:{
          backgroundColor: "#610480"
         },
// Right bubble
        right:{
          backgroundColor: "#610480"
        }
      }}
// Text style of the bubble
      textStyle={{
        left:{
          color: "white",
          fontWeight: "bold",
          fontStyle: "italic"
        },
        right:{
          color: "white"
        }
      }}
      />
    )
  }

  // Render the inputToolbar when the user is online
  renderInputToolbar(props){
    if (this.state.isConnected == false){
      
    } else{
      return(
        <InputToolbar
        {...props}
        />
      );
    }
  }
  

  renderCustomView(props){
    const {currentMessage} = props;

    if(currentMessage.location){
      return(
        <MapView
        style={styles.customView}
        region={{
          latitude: currentMessage.location.latitude,
          longitude: currentMessage.location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.421
        }}
        />
      )
    }
    return null
  }




  render(){
    let {backgroundColor} = this.props.route.params;
    let {name} = this.props.route.params;
    this.props.navigation.setOptions({title: name});

    return(
      <View /*style={styles.mainChat} */
      style={
        {flex:1, 
        backgroundColor: `${backgroundColor}`}
      }
      >
        <GiftedChat 
// Renders custom bubble
        renderBubble={this.renderBubble.bind(this)}
// Renders state messages
        messages={this.state.messages}
// Disables rendering of input field when user is offline
        renderInputToolbar={this.renderInputToolbar.bind(this)}        
// Appends last sent messages to the current message state and displays all the messages
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
        renderCustomView={this.renderCustomView}
        />

{/* JSX conditional expression that checks if the device OS is android, if yes, sets 
keyboard behavior to height preventing the keyboard to obstruct the input field. 
Else, does nothing */}
        {Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  mainChat: {
    flex:1, 
  },
  customView:{
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3
  }
});