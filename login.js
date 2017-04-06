/*jshint esversion: 6 */
import React, {Component} from 'react';
import {
  TextInput, 
  TouchableHighlight,
  AsyncStorage, 
  Text, 
  View,
  Image
} from 'react-native';

import styles from './styles';
import constants from './constants';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: ""
    };
  }
  redirect (routeName) {
    console.log("login.js redirecting to: " + routeName);
    this.props.navigator.push({
      name: routeName
    });
  }
  async storeToken(accessToken) {
    try {
      await AsyncStorage.setItem(constants.ACCESS_TOKEN, accessToken);
      this.getToken();
    } catch (error) {
      console.log("feck: " + error);
    }
  }
  
   async getToken() {
    try {
      let accessToken = await AsyncStorage.getItem(constants.ACCESS_TOKEN);
      console.log("token is: " + accessToken);
    } catch (error) {
      console.log("feck2: " + error);
    }
  }
  async storeUsername(username) {
    try {
      await AsyncStorage.setItem(constants.USERNAME, username);
      this.getUsername();
    } catch (error) {
      console.log("feck3: " + error);
    }
  }
  
   async getUsername() {
    try {
      let username = await AsyncStorage.getItem(constants.USERNAME);
      console.log("username is: " + username);
      return username;
    } catch (error) {
      console.log("feck4: " + error);
    }
  }
  async storeAccessLevel(accessLevel) {
    try {
      await AsyncStorage.setItem(constants.ACCESS_LEVEL, String(accessLevel));
      console.log("here");
      this.getAccessLevel();
    } catch (error) {
      console.log("feck5: " + error);
    }
  }
  async getAccessLevel() {
    try {
      let accessLevel = await AsyncStorage.getItem(constants.ACCESS_LEVEL);
      console.log("access level is: " + accessLevel);
      console.log("and now here.")
      return accessLevel;
    } catch (error) {
      console.log("feck6: " +  error);
    }
  }
  
  async onLoginPressed() {
    console.log("oooaaaa");
    try {
      if (this.state.password == null || this.state.password == '') {
        this.setState({error: "Invalid password"});
        return;
      }
      if (this.state.username == null || this.state.username == '') {
        this.setState({error: "Invalid username"});
        return;       
      }
      
      let response = await fetch('https://seekerdnasecure.co.za:3002/sessions/create', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: this.state.username, password: this.state.password})
      });
      let res = await response.json();
      if (response.status >= 200 && response.status < 300) {
        //handle success
        this.setState({error: ""});
        let accessToken = res.id_token;
        await this.storeToken(accessToken);
        await this.storeUsername(res.username);
        await this.storeAccessLevel(res.accessLevel);
        this.redirect('home');
        
        
      } else {
        console.log("feck. " + res);
        let error = res;
        throw error;
      }
    } catch (error) {
      this.setState({error: error});
      console.log("error: " + error);
    }
  }
  render() {
    
    return (
      <View style={styles.container}>
        <Image 
        source={require('./img/logo.png')}
        style={styles.logo}
        />
        <Text style={styles.heading}>
          Login
        </Text>
        <TextInput
          onChangeText={(text) => this.setState({username: text})}
          style={styles.input}
          placeholder="Username"></TextInput>
        <TextInput
          onChangeText={(text) => this.setState({password: text})}
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}></TextInput>
        <TouchableHighlight 
          onPress={this.onLoginPressed.bind(this)}        
          style={styles.button}
        >
          <Text
            style={styles.buttonText}
          >
          Submit
          </Text>
        </TouchableHighlight>
        <Text style={styles.error}>
          {this.state.error}
        </Text>
      </View>
    )
  }
}
export default Login;
