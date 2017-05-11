import React, { Component } from 'react';
import {
  Alert,
  Text,
  View,
  Image,
  TouchableHighlight,
  Navigator,
  AsyncStorage
} from 'react-native';
import Api from './api';
import styles from './styles';
import constants from './constants';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: "",
      showProgress: false,
      accessToken: "",
      navigator: this.props.navigator
    }
  }
  componentWillMount() {
    this.getToken();
  }
  async userAccount() {
    let token = this.state.accessToken;
    let username = await AsyncStorage.getItem(constants.USERNAME);
    let user = await Api.getUser(username, token);
    this.props.navigator.push({
      name: "account",
      props: {
        accessToken: this.state.accessToken,        
        navigator: this.props.navigator,
        user: user
      }
    })
  }
  logout() {
    this.deleteToken();    
  }
  async viewAssets() {
     let token = this.state.accessToken;
     let username = await AsyncStorage.getItem(constants.USERNAME);
     let assets = await Api.getAssetsForUser(username, token);     
     this.props.navigator.push({
      name: "assets",
      props: {
        accessToken: this.state.accessToken,
        assets: assets,
        navigator: this.props.navigator,
        username: username
      }
    });
    
  }
  async captureAsset() {
    let token = this.state.accessToken;
     let username = await AsyncStorage.getItem(constants.USERNAME);    
     this.props.navigator.push({
      name: "capture",
      props: {
        accessToken: this.state.accessToken,
        username: username,        
        navigator: this.props.navigator
      }
    });
  }
  
  async deleteToken() {
    try {
      await AsyncStorage.removeItem(constants.ACCESS_LEVEL);
      await AsyncStorage.removeItem(constants.ACCESS_TOKEN);
      await AsyncStorage.removeItem(constants.USERNAME);
      this.redirect("root");
    }
    catch (error) {
      console.log("deleteToken says eeeerrrp.");
    }
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
      props: {
        accessToken: this.state.accessToken
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
      <Image 
        source={require('./img/logo.png')}
        style={styles.logo}
        />
        
        <TouchableHighlight onPress={this.viewAssets.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>View Assets</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.captureAsset.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>Capture Asset</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.userAccount.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>Account</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.logout.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
export default Home;