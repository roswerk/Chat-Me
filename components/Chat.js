import React from "react";
import { View, StyleSheet, Platform, KeyboardAvoidingView, Button, Text } from "react-native";

// Import GiftedChat library 
import { GiftedChat, Bubble } from "react-native-gifted-chat";

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
    }

  // Initialize Firebase
  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    }
  // firebase.analytics();

  }


  addMessage(){
    const message = this.state.messages[0];

    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || null,
      createdAt: message.createdAt,
      user: message.user,
    })
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
      });
    });

    this.setState({
      messages,
    });

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
  })
}



  componentDidMount(){
    // Listen for updates in  collection using Firestore’s onSnapshot() function.
    this.referenceChatMessages = firebase
    .firestore()
    .collection("messages");

    this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate);

    this.setState({
      messages: [{
        _id: 1,
        text: `Welcome ${this.props.route.params.name}, we were waiting you`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {_id: 2,
        text: `${this.props.route.params.name} has entered the chatroom`,
        createdAt: new Date(),
        system: true,
      },
    ],
    })
  }

  // Stop receiving updates about a collection
  componentWillUnmount() {
    this.unsubscribe();
 }


// Function that appends the last message to the message state annd returns all messages
  onSend(messages = []){
  this.setState(previousState => ({
    messages: GiftedChat.append(previousState.messages, messages),
  }))
  }

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
// Appends last sent messages to the current message state and displays all the messages
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
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
    // backgroundColor: `${props.route.params.chatBg}`
  }
})

// backgroundColor: backgroundColor