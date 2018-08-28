import React from 'react';
import {Platform} from 'react-native';
import _ from 'lodash';
import { ActivityIndicator, AppRegistry, CameraRoll, Button, StyleSheet, Text, TextInput, View, Image, ScrollView } from 'react-native';
import * as firebase from 'firebase';
import { Input } from './components/Input'
import { Buttons } from './components/Buttons'

const majorVersionIOS = parseInt(Platform.Version, 10);

export default class App extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyAh06Ejw0P931fdgy0AClDQfmnX5v0nFhQ",
      authDomain: "awesome-f2402.firebaseapp.com",
      databaseURL: "https://awesome-f2402.firebaseio.com",
      projectId: "awesome-f2402",
      storageBucket: "awesome-f2402.appspot.com",
      messagingSenderId: "227664281747"
    };

    if(firebase.initializeApp(config)){
      console.log('firebase init')
    }
  }

  renderCurrentState() {
    if(this.state.authenticating) {
      console.log('trying')
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
          console.log('signin')
          console.log('default app user ->', user);
          // If you need to do anything with the user, do it here
          // The user will be logged in automatically by the 
          // `onAuthStateChanged` listener we set up in App.js earlier
        })
        .catch((error) => {
          const { code, message } = error;
          console.log(code)
        });

      return (
        <View style={styles.container}>
          <Text>You have successfully Logged in using your firebase account.</Text>
          <Buttons onPress={() => this.onSignOut()}>Log Out</Buttons>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text>ios v{majorVersionIOS}</Text>
        <Image 
          style={{}}
          source={{uri: 'https://dczii.github.io/images/logo.png'}} style={{width: 100, height: 40}} />

        <Input 
          label='Email'
          placeHolder='Enter Email'
          onChangeText={email => this.setState({email: email})}
          value={this.state.email}
          />

        <Input 
          label='Password'
          placeHolder='Enter Password'
          secureTextEntry
          onChangeText={pw => this.setState({password: pw})}
          value={this.state.password}
          />
        <Buttons onPress={() => this.onPressSignIn()}>Login</Buttons>
      </View>
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      photos: {},
      email: '',
      password: '',
      authenticating: false, 
    };
  }


  onPressSignIn = () => {
    this.setState({ authenticating: true, email: '', password: '' });
  }

  onSignOut = () => {
    this.setState({ authenticating: false });

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('signing out');
    }).catch(function(error) {
    });
  }

  _handleButtonPress = () => {
    CameraRoll.getPhotos({
       first: 20,
       assetType: 'Photos',
     })
     .then(r => {
       this.setState({ photos: r.edges });
     })
     .catch((err) => {
        //Error Loading Images
     });
 };

  render() {
    return (
      <View style={styles.container}>
          
          {this.renderCurrentState()}

          {!_.isEmpty(this.state.photos) ? 
            <Button
              onPress={() => {this.setState({ photos: {} })}}
              title='Clear Images'
              color="#841584" />
          :
            <Button 
              onPress={this._handleButtonPress}
              title='Load Images'
              color="#841584" />
          }
        {!_.isEmpty(this.state.photos) ? 
         <ScrollView>
            {_.map(this.state.photos, (p, i) => {
              return (
                 <Image
                   key={i}
                   style={{
                     width: 300,
                     height: 100,
                   }}
                   source={{ uri: p.node.image.uri }}
                 />
               );
           })

           }
          </ScrollView>
          : ''}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
