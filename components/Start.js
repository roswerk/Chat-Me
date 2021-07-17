import React from "react";
import { View, Text, Button, TextInput, ImageBackground, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView} from "react-native";

export default class Start extends React.Component{

constructor(props){
  super(props);
  this.state = {
    name: "", 
    chatBg: "white"}
}


  render(){
    return(
      <View style={styles.container}>
{/* Background image */}
        <ImageBackground 
        source={require ("../resources/ChatMe-bg.png")}
        style={styles.imgBackg}
        >
{/* Title */}
        <Text style={styles.title}>ChatMe</Text>
{/* White container box */}
        <View style={styles.boxContainer}>
{/* Elements container */}
        <View style={styles.elementsContainer}>

{/* Parent view to add incon into a textInput element */}
          <View style={styles.iconInputElement}>
          <Image
          source={require("../resources/icon.png")}
          style={styles.icon} />
{/* Input container */}
        <TextInput
        style={styles.textInput}
        placeholderMargin={20}
        onChangeText={(name) => this.setState({name})}
        placeholder="Your Name"
        />
        </View>

{/* Choose background and buttons container */}
      <View>
        <Text style={styles.chooseText}>Choose a background color:</Text>

        <View style={styles.chooseButtons}>
{/* Buttons with colors, set to change this.state with own color */}
          <TouchableOpacity 
          style={styles.color1}
          onPress={() => {this.setState({chatBg: "#090C08"})}}
          accessibility={true}
          accessibilityLabel="Background color Black"
          accessibilityHint="Lets you change the chat room background color to black"
          accessibilityRole="Button"
          />

          <TouchableOpacity 
          style={styles.color2}
          onPress={()=> {this.setState({chatBg: "#474056"})}}
          accessibility={true}
          accessibilityLabel="Background color grey"
          accessibilityHint="Lets you change the chat room background color to grey"
          accessibilityRole="Button"
          />

          <TouchableOpacity 
          style={styles.color3}
          onPress={() => {this.setState({chatBg: "#8A95A5"})}}
          accessibility={true}
          accessibilityLabel="Background color light grey"
          accessibilityHint="Lets you change the chat room background color to light grey"
          accessibilityRole="Button"
          />

          <TouchableOpacity 
          style={styles.color4}
          onPress={()=>{this.setState({chatBg: "#B9C6AE"})}}
          accessibility={true}
          accessibilityLabel="Background color light green"
          accessibilityHint="Lets you change the chat room background color to light green"
          accessibilityRole="Button"
          />
          
          <TouchableOpacity 
          style={styles.color5}
          onPress={()=>{this.setState({chatBg: "#e7e7e7"})}}
          accessibility={true}
          accessibilityLabel="Background color light white"
          accessibilityHint="Lets you change the chat room background color to light white"
          accessibilityRole="Button"
          />

          <TouchableOpacity 
          style={styles.noColor}
          onPress={()=>{this.setState({chatBg: "#FFFFFF"})}}
          accessibility={true}
          accessibilityLabel="Background color light green"
          accessibilityHint="Lets you change the chat room background color to light green"
          accessibilityRole="Button"
          >

          <Text style={styles.noColorText}>No Color</Text>
          </TouchableOpacity>
        </View>
      </View>

{/* Start Chatting button, who takes you to the Chat component and passes name and chatBg props set in this.state */}
      <TouchableOpacity onPress={() => {this.props.navigation.navigate("Chat", {name: this.state.name, backgroundColor: this.state.chatBg} )}} 
      style={styles.chatButton}
      accessible={true}
      accessibilityLabel="Start Chatting"
      accessibilityHint="Redirects you to the chat room"
      accessibilityRole="Button"
      >
        <Text style={styles.buttonText}>Start Chatting</Text>
      </TouchableOpacity>
        </View>
      </View>

</ImageBackground>
{Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  imgBackg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },

  title: {
    flex: 1,
    flexDirection: "row",
    fontSize: 45, 
    fontWeight: "600", 
    color: "#FFFFFF",
    alignSelf: "center",
    marginVertical: 70
  },

  boxContainer:{
    flex: 1.3,
    height: "100%",
    width: "88%",
    backgroundColor: "white",
    alignSelf: "center",
    marginBottom: "8%",
  },

// Start of the your name elements
// Your name container
  iconInputElement:{
    borderColor: "grey",
    borderWidth: 2,
    flex: 1,
    flexDirection: "row",
    paddingTop: "7%",
    paddingBottom: "7%",
    // Out of requirement style
    borderRadius: 5
  },

  icon:{
    height: 20,
    width: 20,
    marginLeft: "5%",
    alignSelf: "center"
  },

  textInput:{
    alignSelf: "center",
    marginLeft: "5%",
    height: 20,
    fontSize: 16
  },

// End of the your name elements

  elementsContainer: {
    padding: 20
  }, 

  chooseText:{
    marginTop: "10%",
    fontSize: 16, 
    fontWeight: "300", 
    color: "#757083", 
    opacity: 1
  },

// Color Buttons container  
  chooseButtons:{
    flex: 1,
    flexDirection: "row",
    margin: "2%",
    marginBottom: "10%",
    alignSelf: "center"
  },

// Color Buttons 

  color1: {
    height: 37,
    width: 37,
    backgroundColor: "#090C08",
    borderRadius: 20,
    margin: "2%"
  },
  color2: {
    height: 37,
    width: 37,
    backgroundColor: "#474056",
    borderRadius: 20,
    margin: "2%"
  },
  color3: {
    height: 37,
    width: 37,
    backgroundColor: "#8A95A5",
    borderRadius: 20,
    margin: "2%"
  },
  color4: {
    height: 37,
    width: 37,
    backgroundColor: "#B9C6AE",
    borderRadius: 20,
    margin: "2%"
  },
  color5: {
    height: 37,
    width: 37,
    backgroundColor: "#e7e7e7",
    borderRadius: 20,
    margin: "2%",
  },
  noColor: {
    height: 37,
    width: 37,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    margin: "2%",
  },
  noColorText: {
    color: "black", 
    textAlign: "center",
  },

// End of Color Buttons 

  chatButton:{
    width: "100%",
    backgroundColor: "#757083",
    marginTop: "15%",
    height: "25%",
    alignSelf: "center",
    // Out of requirement style
    borderRadius: 5
  },

  buttonText:{
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "6%"
  }
});