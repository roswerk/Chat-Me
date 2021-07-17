# Chat-Me
This is a basic Chat-App built with React-Native and Expo. The chat's UI is created with GiftedChat and functionalities where created using Expo's hardward manipulation API's such as: 

- expo-permissions
- expo-location
- expo-image-picker

## Get Started

### Setting up the app

To develop and test native apps with [React Native](https://reactnative.dev/), Facebook recommends using [Expo](https://docs.expo.io/get-started/installation/).

Expo is an open-source platform for making universal native apps that run on Android, iOS, and the web. There are two tools that you need to develop apps with Expo: a command line app called [Expo CLI](https://docs.expo.io/workflow/expo-cli/) to initialize and serve your project and a mobile client app called [Expo Go](https://docs.expo.io/guides/sharing-preview-releases/#expo-go) to open it on iOS and Android. To install Expo CLI on your computer, you need to have previously installed [Node.js](https://nodejs.org/) (LTS release).

```
npm install --global expo-cli
```

If you want to test the app on a mobile device, you must also install the Expo Go application on the mobile device.

- [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) (Android Lollipop and greater)
- [OS App Store](https://itunes.com/apps/exponent) (iOS 11 and greater)

### Dependencies installation

Install all dependencies listed in package.json in the local node_modules folder with the following npm command:

```
npm install
```

### Configuration

Once you have the project on your computer, and you have installed Expo CLI and all the dependencies, you can start using (and modifying) the project.

In order to use the cloud storage, you need to have a [Firebase](https://firebase.google.com/) account and create a new project for the app. Once inside the new project created, you must enable authentication with at least the anonymous option activated, so that users can use the app. To do this, you must go to the "Authentication" option in the Firebase main menu.

To save the messages sent by users, you must create a collection in Cloud Firestore. To do this, you must go to the "Firestore Database" option in the Firebase main menu.

Finally, you must go to the project configuration, and in the "General" tab you will find the SDK Configuration. You must copy the configuration code of your Firebase service into the "Chat" component of the app. The configuration code in both Firebase and the app looks like this:

```
  var firebaseConfig = {
    apiKey: "AIzaSyAQWTab2CjGlRZO2S24gZWWmvpZmMA6xLs",
    authDomain: "testingfirebase2021.firebaseapp.com",
    projectId: "testingfirebase2021",
    storageBucket: "testingfirebase2021.appspot.com",
    messagingSenderId: "204180526729",
    appId: "1:204180526729:web:e0c2400b33ae7c08fb9858",
    measurementId: "G-H4SPVCC54N"
  };
// Initialize Firebase
if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    }
```

### Run it

To run the app, you can use the following commands:

```
expo start
```
```
npm start
```

Expo will start automatically and will give you several options to run, including the option to launch the app in a virtualized operating system that you have open at that moment (for example, with [Android Studio](https://developer.android.com/)).

<br>

## Key Features

● A page where users can enter their name and choose a background color for the chat screen
before joining the chat.

●  A page displaying the conversation, as well as an input field and submit button.

● The chat must provide users with two additional communication features: sending images
and location data.

● Data gets stored online and offline.

## User Stories

● As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my
friends and family.

● As a user, I want to be able to send messages to my friends and family members to exchange
the latest news.

● As a user, I want to send images to my friends to show them what I’m currently doing.

● As a user, I want to share my location with my friends to show them where I am.

● As a user, I want to be able to read my messages offline so I can reread conversations at any
time.

● As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface.

## Design for:
<p>
<img src="https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white">
<img src="https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white">
</p>

### Packages used:

- React-Native
- React-Navigation/Native
- React-Native-gifted-chat
- Expo-permissions
- Expo-location
- Expo-image-picker
