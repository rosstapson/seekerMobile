import React, {Component} from 'react';
import {Text, View, TouchableHighlight, TouchableOpacity, Image, PermissionsAndroid} from 'react-native';

import styles from './styles';
import constants from './constants';

class AssetListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      asset: this.props.asset,
      onDetailPress: this.props.onDetailPress,
      onThumbnailPress: this.props.onThumbnailPress,
      // onCameraPress: this.props.onCameraPress,
      imagesAreAvailable: this.props.asset.imageUrls[0],
      navigator: this.props.navigator
    }
    //console.log(constants.IMG_API + this.state.asset.imageUrls[0]);
  }
  handleUploadImage(path) {
    console.log("uploading image: " + path);
  };

  async onCameraPress() {
   
    try {
      // scrap this bit and use requestMultiple, and then parse the result by using JSON.stringify
      const currentPerms = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (!currentPerms) {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
        'title': 'SeekerDNA Permissions',
        'message': 'SeekerDNA needs your permission to access your extrnal storage.'
        });
      }
      else {
        console.log("current permissions: " + currentPerms)
      }
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        'title': 'SeekerDNA Permission',
        'message': 'SeekerDNA needs your permission to access your camera.'
      });    
      
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        
        this
          .props
          .navigator
          .push({
            name: "myCamera",
            props: {
              accessToken: this.state.accessToken,
              navigator: this.state.navigator,
              handleUploadImage: this.handleUploadImage
            }
          });
      } else {
        
        Alert("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
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
            this
              .state
              .onThumbnailPress(this.props.asset.assetCode)
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
            onPress={this
            .onCameraPress
            .bind(this)}>
            <Image
              source={require('./icons/ic_camera.png')}
              style={{
              width: 60,
              height: 60
            }}/>
          </TouchableOpacity>
}

        </View>
      </View>
    )
  }
}
export default AssetListItem;