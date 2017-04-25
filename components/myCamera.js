
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, AsyncStorage} from 'react-native';

import Camera from 'react-native-camera';

import NavBar from './navbar';
import styles from '../styles';
import constants from '../constants';

export default class MyCamera extends Component {
    constructor(props) {
        super(props);

        this.camera = null;

        this.state = {
            camera: {
                aspect: Camera.constants.Aspect.fill,
                captureTarget: Camera.constants.CaptureTarget.disk,
                type: Camera.constants.Type.back,
                orientation: Camera.constants.Orientation.portrait,
                flashMode: Camera.constants.FlashMode.auto
            },
            handleUploadImage: this.props.handleUploadImage,
            navigator: this.props.navigator,
            asset: this.props.asset,
            accessToken: this.props.accessToken

        };
    }

    takePicture() {
        console.log("zomg.");
        if (this.camera) {
            this
                .camera
                .capture()
                .then((data) => {
                    console.log(data);
                    // mediaUri:"content://media/external/images/media/67"
                    // path:"file:///storage/emulated/0/Pictures/IMG_20170424_082114.jpg"
                    console.log("and now on to 'preview'");
                    this.state.navigator.push({
                        name: "picPreview",
                        props: {
                            imagePath: data.path,
                            handleUploadImage: this.state.handleUploadImage,
                            asset: this.state.asset
                        }
                    });
                    
                })
                .catch(err => console.error(err));
        }

    }
    // async storeImagePath(path) {
    //     try {
    //         await AsyncStorage.setItem(constants.IMAGE_PATH, path);
            
    //     } catch (error) {
    //         console.log("storeImagePath: " + error);
    //     }
    // }

    onLeftButtonPressed() {
        this
            .props
            .navigator
            .pop();
    }

    render() {

        return (
            <View style={styles.container}>
                <NavBar
                    title={"Capture"}
                    leftButtonTitle={"Back"}
                    onLeftButtonPressed={this
                    .onLeftButtonPressed
                    .bind(this)}/>
                <Camera
                    ref={(cam) => {
                    this.camera = cam;
                }}
                    style={styles.cameraPreview}
                    aspect={this.state.camera.aspect}
                    orientation={this.state.orientation}
                    captureTarget={this.state.camera.captureTarget}
                    type={this.state.camera.type}
                    flashMode={this.state.camera.flashMode}
                    defaultTouchToFocus
                    mirrorImage={false}>

                    <TouchableOpacity
                        style={styles.captureButton}
                        onPress={this
                        .takePicture
                        .bind(this)}>
                        <Image source={require('../icons/ic_camera_white.png')}/>
                    </TouchableOpacity>
                </Camera>
            </View>
        )
    }
}