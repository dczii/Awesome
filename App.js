import React from 'react';
import {Platform} from 'react-native';
import _ from 'lodash';
import { AppRegistry, CameraRoll, Button, StyleSheet, Text, TextInput, View, Image, ScrollView } from 'react-native';

const majorVersionIOS = parseInt(Platform.Version, 10);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: {},
    };
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
        <Text>{majorVersionIOS}</Text>
        <Image 
          style={{}}
          source={{uri: 'https://dczii.github.io/images/logo.png'}} style={{width: 100, height: 40}} />
        
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
