import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import Camera from 'react-native-camera';

import NavBar from './navbar';
import styles from '../styles';

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
            }

        };
    }

    takePicture() {
        console.log("zomg.");
        if (this.camera) {
            this
                .camera
                .capture()
                .then((data) => console.log(data))
                .catch(err => console.error(err));
        }

    }
    onLeftButtonPressed() {
    this.props.navigator.pop();
  }
  
    render() {
        console.log("MyCamera render");
        return (
            <View style={styles.container}>
             <NavBar 
          title={"Capture"} 
          leftButtonTitle={"Back"} 
          onLeftButtonPressed={this.onLeftButtonPressed.bind(this)}
          
         />      
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