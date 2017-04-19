import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image
} from 'react-native';

import styles from './styles';
import constants from './constants';

class AssetListItem extends Component {
  constructor(props) {
    super(props);
    
    this.state={
      asset: this.props.asset,
      onDetailPress: this.props.onDetailPress,
      onThumbnailPress: this.props.onThumbnailPress,
      // onCameraPress: this.props.onCameraPress,
      imagesAreAvailable: this.props.asset.imageUrls[0]
    }
    console.log(constants.IMG_API + this.state.asset.imageUrls[0]);
  }
  onCameraPress() {
    alert("onCameraPress: " + this.props.asset.dnaCode)
  }
  render() {
    return(
      <View style={styles.assetSmall}>
        <View style={styles.assetSmallTextBox}>
          <TouchableOpacity onPress={() => {this.state.onDetailPress(this.props.asset.assetCode)}}>
            <Text><Text style={styles.textBold}>Dna: </Text>{this.props.asset.dnaCode}</Text>
            <Text><Text style={styles.textBold}>Asset: </Text>{this.props.asset.assetCode}</Text>
            <Text><Text style={styles.textBold}>Description: </Text>{this.props.asset.description}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.assetSmallThumbnail}>        
          {this.state.imagesAreAvailable &&
            <TouchableOpacity onPress={() => {this.state.onThumbnailPress(this.props.asset.assetCode)}}>
              <Image             
                source={{uri: constants.IMG_API + this.state.asset.imageUrls[0]}}            
                style={{width: 100, height: 100}}            
              />
            </TouchableOpacity>
          }
          {!this.state.imagesAreAvailable &&
            <TouchableOpacity onPress={this.onCameraPress.bind(this)}>
              <Image             
                source={require('./icons/ic_camera.png')}        
                style={{width: 60, height: 60}}            
              />               
            </TouchableOpacity>
          }
          
        </View>
      </View>
    )
  }
}
export default AssetListItem;