import React, {Component} from 'react';
import {
  AppRegistry,
  ScrollView,
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
    this.props.navigator.push({name: routeName, token: ''});
  }
  async onRegisterPressed() {
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
                                  password: this.state.password,
                                  companyName: this.state.companyName,
                                  telephone: this.state.telephone,
                                  contactPerson: this.state.contactPerson,
                                  address: this.state.address                                
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
      <ScrollView>
        <Text style={styles.heading}>Register  </Text>
        <Text style={styles.label}>Username <Text style={styles.required}> *</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(val) => this.setState({username: val})}/>
        <Text style={styles.label}>Email <Text style={styles.required}> *</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(val) => this.setState({email: val})}/>
        <Text style={styles.label}>Password <Text style={styles.required}> *</Text></Text>
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
          <Text style={styles.label}>Company Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Company Name"
          onChangeText={(val) => this.setState({companyName: val})}
          />
          <Text style={styles.label}>Telephone</Text>
        <TextInput
          style={styles.input}
          placeholder="Telephone"
          onChangeText={(val) => this.setState({telephone: val})}
          />
          <Text style={styles.label}>Contact Person</Text>
        <TextInput
          style={styles.input}
          placeholder="Contact Person"
          onChangeText={(val) => this.setState({contactPerson: val})}
          />
          <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          onChangeText={(val) => this.setState({address: {...this.state.address, line1: val}})}
          />
        <TextInput
          style={styles.input}
          placeholder="Address"
          onChangeText={(val) => this.setState({address: {...this.state.address, line2: val}})}
          />
        <TextInput
          style={styles.input}
          placeholder="Address"
          onChangeText={(val) => this.setState({address: {...this.state.address, line3: val}})}
          />
        <TextInput
          style={styles.input}
          placeholder="State"
          onChangeText={(val) => this.setState({address: {...this.state.address, state: val}})}
          />
        <TextInput
          style={styles.input}
          placeholder="Country"
          onChangeText={(val) => this.setState({address: {...this.state.address, country: val}})}
          />

        <TouchableHighlight
          style={styles.button}
          onPress={this.onRegisterPressed.bind(this)} >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
        
        <Errors errors={this.state.errors} />
        </ScrollView>
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