/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Register from './register';
import styles from './styles';

export default class seekerMobile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Register />
      </View>
    );
  }
}



AppRegistry.registerComponent('seekerMobile', () => seekerMobile);
