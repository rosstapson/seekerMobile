
import React, {Component} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

import Camera from 'react-native-camera';

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
            showPreview: this.props.showPreview,
            showImages: this.props.showImages
        };
    }

    takePicture() {        
        if (this.camera) {
            this
                .camera
                .capture()
                .then((data) => {                   
                    // mediaUri:"content://media/external/images/media/67"
                    // path:"file:///storage/emulated/0/Pictures/IMG_20170424_082114.jpg"
                   this.state.showPreview(data.path);                    
                })
                .catch(err => console.error(err));
        }

    }
   
    onLeftButtonPressed() {
        this.state.showImages();
    }

    render() {
        return (
            <View style={styles.container}>
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
                    mirrorImage={false}
                    >
                    <View
                        style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity
                        style={styles.captureButton}
                        onPress={
                            this                        
                                .onLeftButtonPressed
                                .bind(this)}
                                >
                        <Image source={require('../icons/ic_cancel_white.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.captureButton}
                        onPress={this
                            .takePicture
                            .bind(this)}
                        >
                        <Image source={require('../icons/ic_camera_white.png')} />
                    </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        )
    }
}