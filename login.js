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


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: ""
    };
  }
  async onLoginPressed() {
    console.log("oooaaaa");
    try {
      if (this.state.password == null || this.state.password == '') {
        this.setState({error: "Invalid password"});
      }
      if (this.state.username == null || this.state.username == '') {
        this.setState({error: "Invalid username"});        
      }
      
      let response = await fetch('https://seekerdnasecure.co.za:3002/sessions/create', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: this.state.username, password: this.state.password})
      });
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
        //handle success
        this.setState({error: ""});
        let accessToken = res;
        console.log("success");
        console.log(accessToken);
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
