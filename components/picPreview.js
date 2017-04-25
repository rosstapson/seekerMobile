import React, {Component} from 'react';
import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';


import NavBar from './navbar';
import styles from '../styles';

export default class PicPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigator: this.props.navigator,
            handleUploadImage: this.props.handleUploadImage,
            imagePath: this.props.imagePath,
            asset: this.props.asset,
            accessToken: this.props.accessToken
        }
    }
    onLeftButtonPressed() {
        this
            .props
            .navigator
            .pop();
    }
    async uploadImage() {
        await this.state.handleUploadImage(this.state.imagePath, this.state.asset.dnaCode, this.state.accessToken);
        Alert.alert("Image uploaded", "Hooray");

    }
    async cancel() {        
        this.props.navigator.pop();        
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
                <Image
                    source={{
                    uri: this.state.imagePath
                }}
                    style={styles.cameraPreview}>
                    <View
                        style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity
                            
                            onPress={this
                            .uploadImage
                            .bind(this)}>
                            <Image source={require('../icons/ic_file_upload_white.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity                            
                            onPress={this
                            .cancel
                            .bind(this)}>
                            <Image source={require('../icons/ic_cancel_white.png')}/>
                        </TouchableOpacity>
                    </View>
                </Image>
            </View>
        )
    }
}