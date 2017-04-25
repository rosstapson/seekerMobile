
import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Navigator} from 'react-native';
import { MenuContext } from 'react-native-menu';

import Register from './register';
import Login from './login';
import Root from './root';
import Home from './home';
import RegistrationComplete from './registrationComplete';
import Assets from './assets';
import MyCamera from './components/myCamera';
import PicPreview from './components/picPreview';
import ImageGallery from './imageGallery.js';
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
      console.log("routing assets");
      return <Assets navigator={navigator}  {... route.props} />
    }
    if (route.name == 'myCamera') {
      console.log("routing myCamera");
      return <MyCamera navigator={navigator}  {... route.props} />
    }
    if (route.name == 'picPreview') {
      console.log("routing picPreview");
      return <PicPreview navigator={navigator} {...route.props} />
    }
    if(route.name == 'imageGallery') {
      console.log("routing image gallery");
      return <ImageGallery navigator={navigator} {...route.props} />
    }
  }
  render() {
    return (
      <MenuContext style={styles.container}>
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
      </MenuContext>
    );
  }
}

AppRegistry.registerComponent('seekerMobile', () => seekerMobile);
