import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  ActivityIndicator,
  Alert
  
} from 'react-native';

import AssetListItem from './assetListItem';
import NavBar from './components/navbar';
import ViewAsset from './components/viewAsset';
import UpdateAsset from './components/updateAsset';
import styles from './styles';
import Api from './api';

class Assets extends Component {
  constructor(props) {
    super(props);
    
    this.state={
      assets: this.props.assets,
      assetInQuestion: false,
      accessToken: this.props.accessToken,
      username: this.props.username,
      navigator: this.props.navigator,
      showViewAsset: false,
      showUpdateAsset: false,
      showAssetList: true,
      navTitle: "Assets",
      pendingUpdateAsset: false,
     
    }
  }
  onLeftButtonPressed() {
    if (this.state.showAssetList) {
      this.props.navigator.pop();
    }
    else if (this.state.showViewAsset) {
      this.showAssetList();
    }
    else if (this.state.showUpdateAsset) {
      this.showViewAsset(this.state.assetInQuestion);
    }
    
  }
  onRightButtonPressed() {
    this.state.navigator.pop();
  }
  showAssetList() {
    this.setState({
      showAssetList: true,
      showUpdateAsset: false,
      showViewAsset: false,
      assetInQuestion: false
    })
  }
  showUpdateAsset(asset) {
    this.setState({
      assetInQuestion: asset,
      showViewAsset: false,
      showUpdateAsset: true,
      showAssetList: false,
      navTitle: "Edit Asset"
    }) 
  }
  showViewAsset(asset) {
    this.setState({
      assetInQuestion: asset,
      showViewAsset: true,
      showUpdateAsset: false,
      showAssetList: false,
      navTitle: "Asset Details"
    }) 
  }
  showUpdatePending(pending) {
    this.setState({
      pendingUpdateAsset: pending,
      showUpdateAsset: !pending
    });
  }
  
  // for update button press - the above is separated out for back button nav
  
  onEditPressed(asset) {
    this.showUpdateAsset(asset);
  }
  onDetailPress(asset) {
    this.showViewAsset(asset);
  }
  async handleUpdateClicked(asset) {
        try {
            this.showUpdatePending(true);
            let result = await Api.updateAssetForUser(asset, this.state.username, this.state.accessToken);
            this.setState({
              assets: result,
              pendingUpdateAsset: false,
              showUpdateAsset: false,
              showAssetList:true
            });            
            Alert.alert("Update Complete", "Asset " + asset.dnaCode + " updated.");
        }
        catch(error) {
            Alert.alert("Update Failed", error.message);
        }
  }
  render() {
    return (
      <ScrollView>
        <NavBar 
          title={this.state.navTitle} 
          leftButtonTitle={"Back"} 
          onLeftButtonPressed={this.onLeftButtonPressed.bind(this)}
          rightButtonTitle={"Home"}
          onRightButtonPressed={this.onRightButtonPressed.bind(this)}
         />        
        {this.state.pendingUpdateAsset &&
            <ActivityIndicator 
            size="large"
            color="blue"
          />
        }
       {this.state.showAssetList &&
         this.state.assets.map((asset) => {
         return <AssetListItem 
          asset={asset} 
          key={asset._id} 
          navigator={this.state.navigator}
          accessToken={this.state.accessToken}
          onDetailPress={this.onDetailPress.bind(this)}          
          />;
       })}
       {this.state.showViewAsset &&
         <ViewAsset asset={this.state.assetInQuestion}
         onEditPressed={this.onEditPressed.bind(this)}
         />
       }
       {this.state.showUpdateAsset &&
          <UpdateAsset asset={this.state.assetInQuestion} 
          handleUpdateClicked={this.handleUpdateClicked.bind(this)}
          />
       }
      </ScrollView>
    )
  }
}
export default Assets;