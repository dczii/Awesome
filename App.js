import React from 'react';
import {Platform} from 'react-native';
import _ from 'lodash';
import { AppRegistry, CameraRoll, Button, StyleSheet, Text, TextInput, View, Image, ScrollView } from 'react-native';

const majorVersionIOS = parseInt(Platform.Version, 10);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      age: '',
      country: '',
      view: true,
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
        {this.state.view ? 
          <View style={{width: 200}}>
            <TextInput
              style={{height: 40}}
              placeholder='Whole Name'
              onChangeText={(name) => this.setState({name})} 
              value={this.state.name} />
            <TextInput
              style={{height: 40}}
              placeholder='Address'
              onChangeText={(address) => this.setState({address})} 
              value={this.state.address} />
            <TextInput
              style={{height: 40}}
              placeholder='Age'
              onChangeText={(age) => this.setState({age})} 
              value={this.state.age} />
            <TextInput
              style={{height: 40}}
              placeholder='Country'
              onChangeText={(country) => this.setState({country})} 
              value={this.state.country} />
          </View>
        : 
          <View style={{width: 200, fontSize: 16}}>
            <Text>Name: {this.state.name}</Text>
            <Text>Address: {this.state.address}</Text>
            <Text>Age: {this.state.age}</Text>
            <Text>Country: {this.state.country}</Text>
          </View>
        }
        

        {this.state.view ? 
          <Button
            onPress={() => {this.setState({view: false})}}
            title='Submit'
            color="#841584" />
        :
          <Button
            onPress={() => {this.setState({view: true})}}
            title='Edit'
            color="#841584" />
        }

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
