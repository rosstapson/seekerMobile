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
import Api from './api';

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
            bigImages: true,
            pendingDeleteImage: false
        }
    }
    async handleUploadImage() {
       
        let formData = new FormData();
        let username = await AsyncStorage.getItem("username");
        let accessToken = await AsyncStorage.getItem(constants.ACCESS_TOKEN);

        formData.append('username', username);
        formData.append('dnaCode', this.state.asset.dnaCode);

        let photo = {
            uri: this.state.previewPath,
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
                    Alert.alert("Success", "Image uploaded.");
                }
                this.optimisticUpdateAsset(json.url);
                //this.showImages();
            });
    };
    optimisticUpdateAsset(image) {
        let tempAsset = this.state.asset;
        let tempImages = tempAsset
            .images
            .slice();
            tempImages.push(image);
        tempAsset.images = tempImages;
        this.setState({asset: tempAsset, showCamera: false, showImages: true, showDeviceGallery: false, showPreview: false});
        //showCamera: false, showImages: true, showDeviceGallery: false, showPreview: false
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
        this._cameraRollView.rendererChanged();
        this.setState({ bigImages: value });
    }

    _renderImage = (asset) => {
    const imageSize = this.state.bigImages ? 150 : 75;
    const imageStyle = [styles.image, {width: imageSize, height: imageSize}];    
    let myUri = asset.node.image.uri;
    // const {location} = asset.node;
    // const locationStr = location ? JSON.stringify(location) : 'Unknown location';
    return (
      <TouchableOpacity key={asset} onPress={(asset) => {          
          this.showPreview(myUri)}
        }>
        <View style={styles.row}>
          <Image
            source={asset.node.image}
            style={imageStyle}
          />
          <View style={styles.info}>
            <Text style={styles.url}>{asset.node.image.uri}</Text>            
            <Text>{new Date(asset.node.timestamp).toString()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  async doDeleteImage(imageUrl) {
    this.setState({pendingDeleteImage: true});
    try {
        let username = await AsyncStorage.getItem("username");
        let accessToken = await AsyncStorage.getItem(constants.ACCESS_TOKEN);
        Api.deleteImageForAsset(imageUrl, this.state.asset.dnaCode, username, accessToken);
        let tempAsset = this.state.asset;
        let tempImages = this.state.asset.images.filter((image) => {
            return image.url !== imageUrl;
        });
        tempAsset.images = tempImages;
        this.setState({asset: tempAsset});
    }
    catch(error) {
        Alert.alert("Error", error.message);
    }
      // here do the 'optimistic update' - remove the image  from the array and let the setState rerender....
      this.setState({pendingDeleteImage: false});
  }

  
  handleDeletePressed(imageUrl) {     
      Alert.alert(
  'Confirm',
  'Delete image?',
  [    
    {text: 'Cancel', onPress: () => {return}, style: 'cancel'},
    {text: 'OK', onPress: () => {this.doDeleteImage(imageUrl)}},
  ]
)
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
                        .images
                        .map((images, i) => {
                            return <ImageBox 
                            key={i} 
                            image={this.state.asset.images[i]}
                            handleDeletePressed={this.handleDeletePressed.bind(this)}
                            />
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
                    <CameraRollView
                        ref = {(ref) => { this._cameraRollView = ref; }}
                        batchSize = {20}               
                        renderImage = {this._renderImage}
                        showPreview={this.showPreview.bind(this)}

                        />
                </View>      
}
                {this.state.showPreview && <PicPreview
                    handleUploadImage={this
                    .handleUploadImage
                    .bind(this)}
                    imagePath={this.state.previewPath}
                    showCamera={this
                    .showCamera
                    .bind(this)}/>}
            </View>
        )
    }
}