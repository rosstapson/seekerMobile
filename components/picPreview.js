import React, {Component} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';

import NavBar from './navbar';
import styles from '../styles';

export default class PicPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigator: this.props.navigator,
            handleUploadImage: this.props.handleUploadImage,
            imagePath: this.props.imagePath
        }
    }
    onLeftButtonPressed() {
        this
            .props
            .navigator
            .pop();
    }
    uploadImage() {
        alert("upload")
    }
    deleteImage() {
        alert("delete")
    }
    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    title={"Preview"}
                    leftButtonTitle={"Back"}
                    onLeftButtonPressed={this
                    .onLeftButtonPressed
                    .bind(this)}/>                
                <Image source={{uri: this.state.imagePath}} style={styles.cameraPreview}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TouchableOpacity
                            style={styles.captureButton}
                            onPress={this
                            .uploadImage
                            .bind(this)}>
                            <Image source={require('../icons/ic_file_upload_white.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.captureButton}
                            onPress={this
                            .deleteImage
                            .bind(this)}>
                            <Image source={require('../icons/ic_delete_white.png')}/>
                        </TouchableOpacity>
                    </View>
                </Image>
            </View>
        )
    }
}