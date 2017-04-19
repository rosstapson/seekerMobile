import React, {Component} from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

import IconButton from './iconButton.js';
import styles from '../styles'

export default class NavBar extends Component {
  constructor(props){
    super(props);
    this.state={
      title: this.props.title,
      onLeftButtonPressed: this.props.onLeftButtonPressed,
      leftButtonTitle: this.props.leftButtonTitle,
      onRightButtonPressed: this.props.onRightButtonPressed,
      rightButtonTitle: this.props.rightButtonTitle
    }
  }
  render() {
    return (
      <View style={styles.navbar}>
        <View style={{flex: 1}}>
          {this.state.leftButtonTitle && <Button title={this.state.leftButtonTitle} onPress={this.state.onLeftButtonPressed} /> }
        </View>
        <View style={{flex: 4}}>
          <Text style={styles.heading}>{this.state.title}</Text>
        </View>
        <View style={{flex: 1}}>
        {this.state.rightButtonTitle && <Button title={this.state.rightButtonTitle} onPress={this.state.onRightButtonPressed} /> }
        </View>
      </View>
    )
  }
}