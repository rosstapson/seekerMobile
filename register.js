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

      // new fields
      companyName: '',
      telephone: '',
      contactPerson: '',
      address: {
        line1: '',
        line2: '',
        line3: '',
        state: '',
        country: ''
    },

      errors: []
    };
  }
  
  redirect (routeName) {
    this.props.navigator.push({routeName});
  }
  async onRegisterPressed() {
    console.log("username: " + this.state.username);
    try {
      let response = await fetch('https://seekerdnasecure.co.za:3002/users', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({                                
                                  username: this.state.username,
                                  email: this.state.email,
                                  password: this.state.password
                                
                              })
                            });
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
          //Handle success
          
          this.redirect('registrationComplete');
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

        // new fields
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