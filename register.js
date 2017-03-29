import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Text,
  View,
  Alert
} from 'react-native';

import styles from './styles';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      password: '',
      password_confirmation: '',
      errors: []
    };
  }
  async onRegisteredPress() {
    let user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    };

    let config = {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }
    return fetch("https://seekerdnasecure.co.za:3002/users", config).then((response) => {
      if (!response.ok) {
        response
          .json()
          .then((json) => {
            throw new Error(json.errorMessage);
          })
      }
      response
        .json()
        .then((json) => {
          Alert.alert('Holy Moly', json.id_token, [
            {
              text: 'OK',
              //onPress: () => console.log('OK Pressed')
            }
          ], {cancelable: true})
        });

    }).catch((errors) => {
      Alert.alert('Error', errors.message, [
        {
          text: 'OK',
          //onPress: () => console.log('OK Pressed')
        }
      ], {cancelable: true})
    });
  }

  render() {

    return (
      <View>
        <Text style={styles.heading}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(val) => this.setState({username: val})}/>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(val) => this.setState({email: val})}/>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(val) => this.setState({password: val})}
          secureTextEntry={true}/>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          onChangeText={(val) => this.setState({password_confirmation: val})}
          secureTextEntry={true}/>
        <TouchableHighlight
          style={styles.button}
          onPress={this
          .onRegisteredPress
          .bind(this)}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Register;