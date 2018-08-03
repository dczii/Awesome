import React from 'react';
import { AppRegistry, Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      age: '',
      country: '',
      view: true,
    };
  }

  setView = (val) => {
    let newValue = val ? false : true
    this.setState({view: newValue})
  }

  render() {
    return (
      <View style={styles.container}>
        <Image 
          style={{}}
          source={{uri: 'https://dczii.github.io/images/logo.png'}} style={{width: 100, height: 40}} />
        {this.state.view ? 
          <View style={{width: 200, textAlign: 'left'}}>
            <TextInput
              style={{height: 40}}
              placeholder='Whole Name'
              onChangeText={(name) => this.setState({name})} />
            <TextInput
              style={{height: 40}}
              placeholder='Address'
              onChangeText={(address) => this.setState({address})} />
            <TextInput
              style={{height: 40}}
              placeholder='Age'
              onChangeText={(age) => this.setState({age})} />
            <TextInput
              style={{height: 40}}
              placeholder='Country'
              onChangeText={(country) => this.setState({country})} />
          </View>
        : 
          <View style={{width: 200, textAlign: 'left', fontSize: 16}}>
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
