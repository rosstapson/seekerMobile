/*jshint esversion: 6 */
import React, { Component } from 'react';
import {  
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  Text,
  View
} from 'react-native';

import styles from './styles';
import constants from './constants'

class Root extends Component {

  componentWillMount() {
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
          console.log("Token not set");
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
      let res = await response.json();
      if (response.status >= 200 && response.status < 300) {
        
        console.log("succhess");
        this.navigate('home');
      } else {
          //Handle error
          console.log("failure in a hebrew accent");
          let error = res;
          throw error;
      }
    } catch(error) {
        console.log("error response: " + error);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Friend </Text>
        <TouchableHighlight onPress={ this.navigate.bind(this,'register') } style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={ this.navigate.bind(this, 'login') } style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Root
