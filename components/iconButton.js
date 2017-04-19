import React, {Component} from 'react';
import {
  Text, 
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import styles from '../styles';

export default class IconButton extends Component {
  constructor(props) {
    super(props);
    this.state={
      type: this.props.type
    }
  }
  render() {
    let leftIcon = false;
    switch(this.props.type) {
      case "Left":
        leftIcon = true;
      case "Up":
        leftIcon = false;
         

    }
    return(
      <TouchableOpacity onPress={this._onPressButton} >
      {leftIcon && 
        <View style={styles.iconButton}>
          <Image source={require('../icons/ic_arrow_left.png')} />
        </View>
      }
      {!leftIcon &&
        <View style={styles.iconButton}>
          <Image
            style={{width: 50, height: 50}}
            source={require('../icons/ic_arrow_up.png')} 
          />
        </View>
      }
    </TouchableOpacity>
    )
  }
}
