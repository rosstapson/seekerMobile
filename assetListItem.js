import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import styles from './styles';

class AssetListItem extends Component {
  constructor(props) {
    super(props);
    this.state={
      asset: this.props.asset
    }
  }
  render() {
    return(
      <View style={styles.assetSmall}>
        <View style={styles.assetSmallTextBox}>
          <Text><Text style={styles.textBold}>Dna: </Text>{this.props.asset.dnaCode}</Text>
          <Text><Text style={styles.textBold}>Asset: </Text>{this.props.asset.assetCode}</Text>
        </View>
        <View style={styles.assetSmallThumbnail}><Text> Image Placeholder</Text></View>
      </View>
    )
  }
}
export default AssetListItem;