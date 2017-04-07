import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  FlatList,
  
} from 'react-native';
import AssetListItem from './assetListItem';
import styles from './styles';

class Assets extends Component {
  constructor(props) {
    super(props);
    
    console.log("e.g. asset: " + JSON.stringify(this.props.assets[0]));
    this.state={
      assets: this.props.assets,
      accessToken: this.props.accessToken
    }
  }
  
  render() {
    return (
      <View>
        <Text style={styles.heading}>Assets</Text> 
        <Text>First asset: {this.state.assets[0].dnaCode} </Text>
       {/* <FlatList data={this.state.assets} renderItem={this.renderItem}/> */}
       {this.state.assets.map((asset) => {
         return <AssetListItem asset={asset} key={asset._id} />;
       })}
      </View>
    )
  }
}
export default Assets;