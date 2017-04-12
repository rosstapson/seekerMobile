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
      accessToken: this.props.accessToken,
      navigator: this.props.navigator
    }
  }
  onLeftButtonPressed() {
    this.props.navigator.pop();
  }
  onRightButtonPressed() {
    alert("Home Button Pressed")
  }
  render() {
    return (
      <ScrollView>
        <NavBar 
          title={"Assets"} 
          leftButtonTitle={"Back"} 
          onLeftButtonPressed={this.onLeftButtonPressed.bind(this)}
          rightButtonTitle={"Home"}
          onRightButtonPressed={this.onRightButtonPressed.bind(this)}
         />        
        
       {/* <FlatList data={this.state.assets} renderItem={this.renderItem}/> */}
       {this.state.assets.map((asset) => {
         return <AssetListItem asset={asset} key={asset._id} />;
       })}
      </ScrollView>
    )
  }
}
export default Assets;