import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Text,
  Touchable
} from "react-native";

import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fontsLoaded: false,
      userSignedIn: false
    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  signIn = async (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.replace("Dashboard");
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  render() {
    if (this.state.fontsLoaded) {
      return <AppLoading/>;
    }
    else{

      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Button title="sign in with google" onPress={() => this.signInWithGoogleAsync()}></Button>
        </View>
        <View style={styles.container}>
            <SafeAreaView style={styles.droidSafeArea} />

            <Text style={styles.appTitleText}>Spectagram</Text>
            <Image source={appIcon} style={styles.appIcon} /></Image>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.signinWithGoogleAsync}>
                <Image source={require("../assets/google_icon.png")}
                  style={styles.googleIcon}></Image>
                <Text style={styles.googleText}> Sign in with Google</Text>
              </TouchableOpacity>
            </View>
        </View
            <View style={styles.cloudContainer}>
              <Image source={require('../assets/cloud.png')} style={styles.cloudImage}></Image>
            </View>
        
            }
            );

toggleSwitch() {
  const previous_state = this.state.isEnabled;
  const theme = !this.state.isEnabled ? "dark" : "light";
  var updates = {};
  updates[
    "/users/" + firebase.auth().currentUser.uid + "/current_theme"
  ] = theme;
  firebase
    .database()
    .ref()
    .update(updates);
  this.setState({ isEnabled: !previous_state, light_theme: previous_state });
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c",
    alignItems: "center",
    justifyContent: "center"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appIcon: {
    width: RFValue(200),
    height: RFValue(200),
    resizeMode: "contain",
    marginBottom: RFValue(20)
  },
  appTitleText: {
    color: "white",
    textAlign: "center",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
    marginBottom: RFValue(20)
  },
  textinput: {
    width: RFValue(250),
    height: RFValue(50),
    padding: RFValue(10),
    borderColor: "#FFFFFF",
    borderWidth: RFValue(4),
    borderRadius: RFValue(10),
    fontSize: RFValue(20),
    color: "#FFFFFF",
    backgroundColor: "#15193c",
    fontFamily: "Bubblegum-Sans"
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: RFValue(30),
    backgroundColor: "white",
    marginBottom: RFValue(20)
  },
  buttonText: {
    fontSize: RFValue(24),
    color: "#15193c",
    fontFamily: "Bubblegum-Sans"
  },
  buttonTextNewUser: {
    fontSize: RFValue(12),
    color: "#FFFFFF",
    fontFamily: "Bubblegum-Sans",
    textDecorationLine: 'underline'
  }
});

