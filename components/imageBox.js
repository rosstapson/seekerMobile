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
            imageUrl: this.props.imageUrl,
            handleDeletePressed: this.props.handleDeletePressed
        }
    }
    render() {
        return(
            <View style={styles.imageBox}>
                <Image 
                    source={{
                                uri: constants.IMG_API + this.state.imageUrl
                            }}
                    style={{width: 350, height: 350}}
                >
                <TouchableOpacity
                        style={styles.captureButton}
                        onPress={() => {                            
                            this.state.handleDeletePressed(this.state.imageUrl)
                        }}>
                        <Image source={require('../icons/ic_delete.png')} />
                    </TouchableOpacity>
                </Image>
            </View>
        )
    }
}