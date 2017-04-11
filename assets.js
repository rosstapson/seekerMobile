import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  
} from 'react-native';
import AssetListItem from './assetListItem';
import NavBar from './components/navbar';
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
      <ScrollView>
        <NavBar title={"Assets"} backRoute={"home"} />        
        
       {/* <FlatList data={this.state.assets} renderItem={this.renderItem}/> */}
       {this.state.assets.map((asset) => {
         return <AssetListItem asset={asset} key={asset._id} />;
       })}
      </ScrollView>
    )
  }
}
export default Assets;