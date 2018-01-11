/*jshint esversion: 6 */
import React, { Component } from 'react';
import {  
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  Text,
  View,
  Image
} from 'react-native';

import styles from './styles';
import constants from './constants'

class Root extends Component {
  constructor(props) {
    super(props);
    //console.log("constructor")
    this.state = {
      isLoggedIn: true
    }
  }
  componentDidMount() {
    this.getToken();
  }
  navigate(routeName) {
    this.props.navigator.push({
      name: routeName
    });
  }

  async getToken() {
    try {      
      let accessToken = await AsyncStorage.getItem(constants.ACCESS_TOKEN);
      if(!accessToken) {
          this.setState({isLoggedIn: false})
      } else {
          this.verifyToken(accessToken)
      }
    } catch(error) {
        console.log("Something went wrong");
    }
  }
  //If token is verified we will redirect the user to the home page
  async verifyToken(token) {
    let accessToken = token

    try {
      let response = await fetch('https://seekerdnasecure.co.za:3002/token', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id_token: token})
      });
      
      if (response.status >= 200 && response.status < 300) {
        
        //console.log("succhess");
        this.navigate('home');
      } else {
        this.setState({isLoggedIn: false});
          //Handle error
          
      }
    } catch(error) {
        this.setState({isLoggedIn: false});
    }
  }
  render() {
    if (this.state.isLoggedIn === true) {
return (
      <View style={styles.container}>
        <Image 
        source={require('./img/logo.png')}
        style={styles.logo}
        />        
      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <Image 
        source={require('./img/logo.png')}
        style={styles.logo}
        />
        
        <TouchableHighlight onPress={ this.navigate.bind(this, 'login') } style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={ this.navigate.bind(this,'register') } style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableHighlight>
      </View>
    );
  }
    
  }
}

export default Root
