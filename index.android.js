/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/*jshint esversion: 6 */
import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Navigator} from 'react-native';

import Register from './register';
import Login from './login';
import Root from './root';
import Home from './home';
import RegistrationComplete from './registrationComplete';
import Assets from './assets';
// import Scratch from './scratch';
import styles from './styles';

export default class seekerMobile extends Component {
  renderScene(route, navigator) {
    if (route.name == 'root') {
      return <Root navigator={navigator}/>
    }
    if (route.name == 'register') {
      return <Register navigator={navigator}/>
    }
    if (route.name == 'login') {
      return <Login navigator={navigator}/>
    }
    if (route.name == 'home') {
      return <Home navigator={navigator}/>
    }
    if (route.name == 'registrationComplete') {
      return <RegistrationComplete navigator={navigator}/>
    }
    if (route.name == 'assets') {
      return <Assets navigator={navigator} />
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={{
          name: "root"
          //name: "registrationComplete"
        }}
          renderScene={this
          .renderScene
          .bind(this)}
          //navigationBar={< Navigator.NavigationBar routeMapper = {{ LeftButton: (route, navigator, index, navState) => { return (<Text>Cancel</Text>); }, RightButton: (route, navigator, index, navState) => { return (<Text>Done</Text>); }, Title: (route, navigator, index, navState) => { return (<Text>Awesome Nav Bar</Text>); }, }}style = {{backgroundColor: 'blue'}}/>}
          />
      </View>
    );
  }
}

AppRegistry.registerComponent('seekerMobile', () => seekerMobile);
