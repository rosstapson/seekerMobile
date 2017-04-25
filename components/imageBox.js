import React, { Component } from 'react';
import {
    View,
    Image,
    Text
} from 'react-native';

import styles from '../styles';
import constants from '../constants';

export default class ImageBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: this.props.imageUrl
        }
    }
    render() {
        return(
            <View style={styles.imageBox}>
                <Image 
                    source={{
                                uri: constants.IMG_API + this.state.imageUrl
                            }}
                    style={{width: 400, height: 400}}
                >
                <Text>Delete</Text>
                </Image>
            </View>
        )
    }
}