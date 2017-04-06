import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight 

} from 'react-native';

import styles from './styles';

class Assets extends Component {
  constructor(props) {
    super(props);
    this.state={
      assets: this.props.assets,
      accessToken: this.props.accessToken
    }
  }
  render() {
    return (
      <View>
        <Text style={styles.heading}>Assets</Text> 
        <Text>Token: {this.state.accessToken}</Text>      
      </View>
    )
  }
}
export default Assets;