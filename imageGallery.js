import React, {Component} from 'react';
import {View, Image, ScrollView} from 'react-native';

import NavBar from './components/navbar';
import ImageBox from './components/imageBox';
import styles from './styles';
import constants from './constants';

export default class ImageGallery extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            asset: this.props.asset,
            navigator: this.props.navigator
        }
    }
    onLeftButtonPressed() {
        this.state.navigator.pop();
    }
    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    title={"Images"}
                    leftButtonTitle={"Back"}
                    onLeftButtonPressed={this
                    .onLeftButtonPressed
                    .bind(this)}/>
                <ScrollView>
                    {this
                        .state
                        .asset
                        .imageUrls
                        .map((imageUrls, i) => {
                            console.log(this.state.asset.imageUrls[i])
                            return <ImageBox
                                key={i}
                                imageUrl={this.state.asset.imageUrls[i]}
                                />
                        })}
                </ScrollView>
            </View>
        )
    }
}