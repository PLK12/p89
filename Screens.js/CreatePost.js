import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import * as Font from "expo-font";
import DropDownPicker from "react-native-dropdown-picker";



export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fontsLoaded: false,
          previewImage: "image_1",
          dropdownHeight: 40,
        };
      }
      async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }
    
      componentDidMount() {
        this._loadFontsAsync();
      }
    
      async addPost() {
        if (this.state.caption) {
         
          let postData = {
            preview_image: this.state.previewImage,
            caption: this.state.caption,
            author: firebase.auth().currentUser.displayName,
            created_on: new Date(),
            author_uid: firebase.auth().currentUser.uid,
            profile_image: this.state.profile_image,
            likes: 0
          };
          
          
          
          await firebase
            .database()
            .ref("/posts/" + (Math.random().toString(36).slice(2)))
            .set(postData)
            .then(function (snapshot) {});
            this.props.setUpdatetoTrue();
            this.props.navigation.navigate('Feed');}
          else{
            Alert.alert("Error", "All fields are required!", [{text: 'OK', onPress: () =>console.log('OK Pressed')}], {cancelable:false});
          }
    
            
    render() {
        if (this.state.fontsLoaded) {
            SplashScreen.hideAsync();
            let preview_images = {
              image_1: require("../assets/story_image_1.png"),
              image_2: require("../assets/story_image_2.png"),
              image_3: require("../assets/story_image_3.png"),
              image_4: require("../assets/story_image_4.png"),
              image_5: require("../assets/story_image_5.png"),
            };
        
            return (
                <View style={styles.container}>
                  <SafeAreaView style={styles.droidSafeArea} />
                  <View style={styles.appTitle}>
                    <View style={styles.appIcon}>
                      <Image
                        source={require("../assets/logo.png")}
                        style={styles.iconImage}
                      ></Image>
                    </View>
                    <View style={styles.appTitleTextContainer}>
                      <Text style={styles.appTitleText}>New Post</Text>
                    </View>
                  </View>
                  <View style={styles.fieldsContainer}>
                    <ScrollView>
                    <Image
                      source={preview_images[this.state.previewImage]}
                      style={styles.previewImage}
                    ></Image>
                    <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                    <DropDownPicker
                        items={[
                          { label: "Image 1", value: "image_1" },
                          { label: "Image 2", value: "image_2" },
                          { label: "Image 3", value: "image_3" },
                          { label: "Image 4", value: "image_4" },
                          { label: "Image 5", value: "image_5" },
                        ]}
                        defaultValue={this.state.previewImage}
                        containerStyle={{
                            height: 40,
                            borderRadius: 20,
                            marginBottom: 10,
                        }}                        
                        onOpen={() => {
                          this.setState({ dropdownHeight: 170 });
                        }}
                        onClose={() => {
                          this.setState({ dropdownHeight: 40 });
                        }}
                        style={{
                          backgroundColor: "transparent",
                        }}
                        itemStyle = {{ justifyContent: 'flex-start'}}
                       dropDownStyle = {{backgroundColor: '#2a2a2a'}}
                       labelStyle = {{color: 'white'}}
                       arrowStyle = {{color: 'white'}}
                       onChangeItem= {item => this.setState({previewImage: item.value})}

                      />
                    </View>
                    <TextInput 
                        style = {styles.inputFont}
                        onChangeText= {(title) => this.setState({title})}
                        placeholder = {"Caption"}
                        placeholderTextColor = "white"
                        numberofLines= {100}
                      />
                     <View style={styles.submitButton}>
                      <Button
                      onPress={() => this.addStory()}
                      title="Submit"
                      color="#841584"
                />
              </View>
                      
                      </ScrollView>
                  </View>
                  <View style={{ flex: 0.08 }} />
                </View>
              );
            }
          }
        
                <Text>CreatePost</Text>


        
    
