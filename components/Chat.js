import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default class Chat extends React.Component{
  render(){
    let {name} = this.props.route.params;
    let {backgroundColor} = this.props.route.params;
    this.props.navigation.setOptions({title: name});

    return(
      <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: backgroundColor}}>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainChat: {
    flex:1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  }
})