import React, {Component} from 'react';
import {Text, View} from 'react-native';

import styles from '../styles';

export default class Button extends Component {
  render() {
    let bgColor, textWeight, textColor
    if(this.props.red){
      bgColor = "red"
      textColor = "white"
    } else {
      bgColor = "#cecece"
      textWeight = "bold"
      textColor = "black"
    }
    return (
       <View style = {[styles.navButton, {backgroundColor: bgColor}]} > 
        
        <Text style = {[styles.navButtonText, {fontWeight: textWeight, color: textColor}]}> {this.props.text} </Text>
      </View >
      )
    }
  }