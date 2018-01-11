import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';

import styles from '../styles';
import constants from '../constants';

export default class ImageBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: this.props.image,
            handleDeletePressed: this.props.handleDeletePressed
        }
    }
    render() {
        return(
            <View style={styles.imageBox}>
                <View>
                    <Image 
                        source={{
                                    uri: constants.IMG_API + this.state.image.url
                                }}
                        style={{width: 350, height: 350}}
                    >                    
                    <TouchableOpacity
                            style={styles.captureButton}
                            onPress={() => {                            
                                this.state.handleDeletePressed(this.state.image.url)
                            }}>
                            <Image source={require('../icons/ic_delete.png')} />
                        </TouchableOpacity>
                    </Image>
                    <Text>{this.state.image.imageDescription}</Text>
                    <Text>{this.state.image.dateUploaded}</Text>
                </View>
            </View>
        )
    }
}