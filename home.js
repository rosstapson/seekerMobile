import React, { Component } from 'react';
import {
  Text,
  View,
  Navigator,
  AsyncStorage
} from 'react-native';

import styles from './styles';
import constants from './constants'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: "",
      showProgress: false,
      accessToken: "",
    }
  }
  componentWillMount() {
    this.getToken();
  }
  async getToken() {
    try {
      let accessToken = await AsyncStorage.getItem(constants.ACCESS_TOKEN);
      if(!accessToken) {
          this.redirect('login');
      } else {
          this.setState({accessToken: accessToken});
      }
    } catch(error) {
        console.log("Something went wrong");
        this.redirect('login');
    }
  }
  redirect(routeName){
    this.props.navigator.push({
      name: routeName,
      passProps: {
        accessToken: this.state.accessToken
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Home</Text>
        
      </View>
    );
  }
}
export default Home;