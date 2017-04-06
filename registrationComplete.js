import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import styles from './styles';

class RegistrationComplete extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading} >
          Confirmation Pending
        </Text>
        <Text>Thank you for signing up with SeekerDNA! Please note that a confirmation email has been sent to the address you provided.</Text>
      </View>
    )
  }
}
export default RegistrationComplete;