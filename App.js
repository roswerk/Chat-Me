// Import Basic React package
import React from 'react';

// Importing expo's StatusBar gives you a component and imperative interface to control the app status bar to change 
// its text color, background color, hide it, make it translucent or opaque, and apply animations to any of these changes.
import { StatusBar } from 'expo-status-bar';

// Importing react-native package components
import { StyleSheet, Text, View } from 'react-native';

// Importing custom components
import Start from "./components/Start";
import Chat from "./components/Chat";

// Importing react-native-navigation package components -- This is a external package, not integrated with React-Native
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import react native gesture handler
import "react-native-gesture-handler"


// Create the navigator
const Stack = createStackNavigator(); 


export default function App() {
  return (
<NavigationContainer>
  {/* -initialRouteName is the first screen the app loads */}
  <Stack.Navigator initialRouteName="Start">

    <Stack.Screen 
      name="Start"
      component={Start}
      options={{headerShown: false}}
    />

    <Stack.Screen 
      name="Chat"
      component={Chat}
    />

  </Stack.Navigator>
</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
