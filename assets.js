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
      username: this.props.username,
      navigator: this.props.navigator
    }
  }
  onLeftButtonPressed() {
    this.props.navigator.pop();
  }
  onRightButtonPressed() {
    alert("Home Button Pressed")
  }
  onDetailPress(asset) {
    this.props.navigator.push({
      name: "viewAsset",
      props: {
        accessToken: this.state.accessToken,
        username: this.state.username,
        asset: asset,
        navigator: this.props.navigator
      }
    });
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
        
       {this.state.assets.map((asset) => {
         return <AssetListItem 
          asset={asset} 
          key={asset._id} 
          navigator={this.state.navigator}
          accessToken={this.state.accessToken}
          onDetailPress={this.onDetailPress.bind(this)}
          
          />;
       })}
      </ScrollView>
    )
  }
}
export default Assets;