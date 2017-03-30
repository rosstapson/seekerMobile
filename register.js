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
  redirect (routeName) {
    this.props.navigator.push({routeName});
  }
  async onRegisterPressed() {
    this.setState({showProgress: true})
    try {
      let response = await fetch('https://seekerdnasecure.co.za:3002/users', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                user:{
                                  name: this.state.name,
                                  email: this.state.email,
                                  password: this.state.password,
                                  password_confirmation: this.state.password_confirmation,
                                }
                              })
                            });
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
          //Handle success
          let accessToken = res;
          console.log(accessToken);
          //On success we will store the access_token in the AsyncStorage
          this.storeToken(accessToken);
          this.redirect('home');
      } else {
          //Handle error
          let error = res;
          throw error;
      }
    } catch(errors) {
      //errors are in JSON form so we must parse them first.
      console.log(errors);
      let formErrors = JSON.parse(errors);
      console.log(formErrors);   
      let errorsArray = [];
      
       for(var key in formErrors) {                 
             errorsArray.push(`${key} ${formErrors[key]}`);         
       }
      console.log(errorsArray);
      this.setState({errors: errorsArray})
      this.setState({showProgress: false});
    }
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
          onPress={this.onRegisterPressed.bind(this)} >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
        <Errors errors={this.state.errors} />
      </View>
    );
  }
}
const Errors = (props) => {
  return(
    <View>
      {props.errors.map((error, i) => <Text key={i} style={styles.error} >{error}</Text>)}
    </View>
  );
}

export default Register;