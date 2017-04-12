import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';

import styles from './styles';
import constants from './constants';

class AssetListItem extends Component {
  constructor(props) {
    super(props);
    this.state={
      asset: this.props.asset
    }
    console.log(constants.IMG_API + this.state.asset.imageUrls[0]);
  }
  render() {
    return(
      <View style={styles.assetSmall}>
        <View style={styles.assetSmallTextBox}>
          <Text><Text style={styles.textBold}>Dna: </Text>{this.props.asset.dnaCode}</Text>
          <Text><Text style={styles.textBold}>Asset: </Text>{this.props.asset.assetCode}</Text>
          <Text><Text style={styles.textBold}>Description: </Text>{this.props.asset.description}</Text>
        </View>
        <View style={styles.assetSmallThumbnail}>
          <Image             
            source={{uri: constants.IMG_API + this.state.asset.imageUrls[0]}}
            
            style={{width: 100, height: 100}}
            
          />
        </View>
      </View>
    )
  }
}
export default AssetListItem;