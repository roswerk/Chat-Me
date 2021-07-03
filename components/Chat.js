import React from "react";
import { View, StyleSheet, Platform, KeyboardAvoidingView, Button, Text } from "react-native";

// Import GiftedChat library 
import { GiftedChat, Bubble } from "react-native-gifted-chat";

export default class Chat extends React.Component{

  constructor(){
    super();
  
    this.state = {
      messages: [],
    }
  }

  componentDidMount(){
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

// Function that appends the last message to the message state annd returns all messages
  onSend(messages = []){
  this.setState(previousState => ({
    messages: GiftedChat.append(previousState.messages, messages),
  }))
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