import React, {Component} from 'react';
import {
    View,
    Image,
    ScrollView,
    Text,
    AsyncStorage,
    Alert,
    Switch,
    TouchableOpacity
} from 'react-native';

import NavBar from './components/navbar';
import MyCamera from './components/myCamera';
import PicPreview from './components/picPreview';
import ImageBox from './components/imageBox';
import CameraRollView from './components/cameraRollView';
import styles from './styles';
import constants from './constants';

export default class ImageGallery extends Component {
    _cameraRollView;
    constructor(props) {
        super(props);

        this.state = {
            asset: this.props.asset,
            navigator: this.props.navigator,
            showCamera: false,
            showImages: true,
            showDeviceGallery: false,
            showPreview: false,
            previewPath: '',
            bigImages: true
        }
    }
    async handleUploadImage() {
        console.log("uploading image: " + this.state.previewPath.path + " for asset " + this.state.asset.dnaCode);
        let formData = new FormData();
        let username = await AsyncStorage.getItem("username");
        let accessToken = await AsyncStorage.getItem(constants.ACCESS_TOKEN);

        formData.append('username', username);
        formData.append('dnaCode', this.state.asset.dnaCode);

        let photo = {
            uri: this.state.previewPath.path,
            type: 'image/jpeg',
            name: 'temp.jpg'
        };
        formData.append('image', photo);

        let config = {
            method: 'post',
            headers: {
                'x-access-token': accessToken
            },
            body: formData
        }

        return fetch("https://seekerdnasecure.co.za:3002/file-upload", config)
            .then(response => response.json().then(json => ({json, response})))
            .then(({json, response}) => {
                if (!response.ok) {
                    Alert.alert("Unable to Upload Image", json.errorMessage);
                } else {
                    Alert.alert("Uploaded", "ZOMG");
                }
                this.optimisticUpdateAsset(json.imageUrl);
                this.showImages();
            });
    };
    optimisticUpdateAsset(imageUrl) {
        let tempAsset = this.state.asset;
        let tempUrls = tempAsset
            .imageUrls
            .slice();
        tempUrls.push(imageUrl);
        tempAsset.imageUrls = tempUrls;
        this.setState({asset: tempAsset});
    }

    onLeftButtonPressed() {
        this
            .state
            .navigator
            .pop();
    }
    handleMenuSelect(value) {
        switch (value) {
            case 'DeviceGallery':
                this.showDeviceGallery();
                break;
            case 'Camera':
                this.showCamera();
                break;
            default:

        }
    }
     _onSwitchChange = (value) => {
    invariant(this._cameraRollView, 'ref should be set');
    this._cameraRollView.rendererChanged();
    this.setState({ bigImages: value });
  }

  loadAsset = (asset) => {
    if (this.props.navigator) {
      this.props.navigator.push({
        title: 'Camera Roll Image',
        component: AssetScaledImageExampleView,
        backButtonTitle: 'Back',
        passProps: { asset: asset },
      });
    }
  }
    _renderImage = (asset) => {
    const imageSize = this.state.bigImages ? 150 : 75;
    const imageStyle = [styles.image, {width: imageSize, height: imageSize}];
    const {location} = asset.node;
    const locationStr = location ? JSON.stringify(location) : 'Unknown location';
    return (
      <TouchableOpacity key={asset} onPress={ this.loadAsset.bind( this, asset ) }>
        <View style={styles.row}>
          <Image
            source={asset.node.image}
            style={imageStyle}
          />
          <View style={styles.info}>
            <Text style={styles.url}>{asset.node.image.uri}</Text>
            <Text>{locationStr}</Text>
            <Text>{asset.node.group_name}</Text>
            <Text>{new Date(asset.node.timestamp).toString()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

    showPreview(path) {
        this.setState({showCamera: false, showImages: false, showDeviceGallery: false, showPreview: true, previewPath: path});
    }
    showImages() {
        this.setState({showCamera: false, showImages: true, showDeviceGallery: false, showPreview: false});
    }
    showCamera() {
        this.setState({showCamera: true, showImages: false, showDeviceGallery: false, showPreview: false});
    }
    showDeviceGallery() {
        this.setState({showCamera: false, showImages: false, showDeviceGallery: true, showPreview: false});
    }
    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    title={"Images"}
                    leftButtonTitle={"Back"}
                    onLeftButtonPressed={this
                    .onLeftButtonPressed
                    .bind(this)}
                    menu={"&#8942;"}
                    handleMenuSelect={this
                    .handleMenuSelect
                    .bind(this)}
                    menuItems={[
                    {
                        key: 1,
                        text: "Take a Photo",
                        value: "Camera"
                    }, {
                        key: 2,
                        text: "Upload from Device",
                        value: "DeviceGallery"
                    }
                ]}/> 
                {this.state.showImages && <ScrollView>
                    {this
                        .state
                        .asset
                        .imageUrls
                        .map((imageUrls, i) => {
                            return <ImageBox key={i} imageUrl={this.state.asset.imageUrls[i]}/>
                        })}
                </ScrollView>
}
                {this.state.showCamera && <MyCamera
                    showPreview={this
                    .showPreview
                    .bind(this)}
                    showImages={this
                    .showImages
                    .bind(this)}/>
}
                {this.state.showDeviceGallery && <View>
                    <Switch 
                    onValueChange={this._onSwitchChange} 
                    value={this.state.bigImages}/> 
                    <Text> {
                    (this.state.bigImages ? 'Big' : 'Small') + ' Images' } 
                    </Text>
             <CameraRollView
                ref = {
                    (ref) => {
                        this._cameraRollView = ref;
                    }
                }
                batchSize = {
                    20
                }
               
                renderImage = {
                    this._renderImage
                }
                />
                </View>
      
}
                {this.state.showPreview && <PicPreview
                    handleUploadImage={this
                    .handleUploadImage
                    .bind(this)}
                    imagePath={this.state.previewPath.path}
                    showCamera={this
                    .showCamera
                    .bind(this)}/>}
            </View>
        )
    }
}