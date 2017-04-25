import React, {Component} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';

import styles from '../styles';

export default class PicPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handleUploadImage: this.props.handleUploadImage,
            imagePath: this.props.imagePath,
            showCamera: this.props.showCamera            
        }
    }
    
    
    render() {
        return (
            <View style={styles.container}>
               
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
                            
                            onPress={() => {this.state.handleUploadImage()}}>
                            <Image source={require('../icons/ic_file_upload_white.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity                            
                            onPress={() => {this.state.showCamera()} }>
                            <Image source={require('../icons/ic_cancel_white.png')}/>
                        </TouchableOpacity>
                    </View>
                </Image>
            </View>
        )
    }
}