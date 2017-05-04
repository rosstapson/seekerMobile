import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  AsyncStorage,
  Alert
} from 'react-native';

import styles from './styles';
import constants from './constants';

class AssetListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      asset: this.props.asset,
      onDetailPress: this.props.onDetailPress,
      // onCameraPress: this.props.onCameraPress,
      imagesAreAvailable: this.props.asset.imageUrls[0],
      navigator: this.props.navigator,
      accessToken: this.props.accessToken
    }

    //console.log(constants.IMG_API + this.state.asset.imageUrls[0]);
  }
  
  async checkPermissions() {
    
      const currentPerms = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      console.log("current permissions: " + currentPerms);
      if (!currentPerms) {
        let granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE],
          {
            'title': 'Дайте разрешение камеры самым срочным тов',
            'message': 'Вам нужно разрешение для камеры, чтобы делать фотографии, самые срочные'
          }
        );
        console.log(granted);
        let allPermsGranted = true;
        Object.keys(granted).forEach(function(key) {
          console.log(key, granted[key]);
          if (granted[key] !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log(key + " : " + granted[key]);
            throw new Error("Required permissions have not been granted: " +key);
          }
        });
      }
  }
  async onThumbnailPress(asset) {
    try {
      await this.checkPermissions();      
    this
      .props
      .navigator
      .push({
        name: 'imageGallery',
        props: {
          accessToken: this.state.accessToken,
          asset: asset
        }
      });
      }
    catch(err) {
      Alert.alert("Permissions Error", err.message);      
    }
  }
  render() {
    return (
      <View style={styles.assetSmall}>
        <View style={styles.assetSmallTextBox}>
          <TouchableOpacity
            onPress={() => {
            this
              .state
              .onDetailPress(this.props.asset.assetCode)
          }}>
            <Text>
              <Text style={styles.textBold}>Dna:
              </Text>{this.props.asset.dnaCode}</Text>
            <Text>
              <Text style={styles.textBold}>Asset:
              </Text>{this.props.asset.assetCode}</Text>
            <Text>
              <Text style={styles.textBold}>Description:
              </Text>{this.props.asset.description}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.assetSmallThumbnail}>
          {this.state.imagesAreAvailable && <TouchableOpacity
            onPress={() => {
            this.onThumbnailPress(this.state.asset)
          }}>
            <Image
              source={{
              uri: constants.IMG_API + this.state.asset.imageUrls[0]
            }}
              style={{
              width: 100,
              height: 100
            }}/>
          </TouchableOpacity>
}
          {!this.state.imagesAreAvailable && <TouchableOpacity
            onPress={() => {
            this.onThumbnailPress(this.state.asset)
          }}>
            <Image
              source={require('./icons/ic_add_image.png')}
              style={{
              width: 100,
              height: 100
            }}/>
          </TouchableOpacity>
}

        </View>
      </View>
    )
  }
}
export default AssetListItem;