import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight
} from 'react-native';

import styles from '../styles';
import countries from './countries';

export default class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            accessToken: this.props.accessToken,
            onEditPressed: this.props.onEditPressed
        }
    }
    render() {
        return(
            <View>

                <View style={styles.assetDetailRow}>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelRight}>Username</Text>
                    </View>
                    <View style={styles.userDetailTextBox}>
                        <Text style={styles.labelSmall}>{this.state.user.username}</Text>
                    </View>
                </View>

                <View style={styles.assetDetailRow}>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelRight}>Email</Text>
                    </View>
                    <View style={styles.userDetailTextBox}>
                        <Text style={styles.labelSmall}>{this.state.user.email}</Text>
                    </View>
                </View>
                <View style={styles.assetDetailRow}>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelRight}>Company</Text>
                    </View>
                    <View style={styles.userDetailTextBox}>
                        <Text style={styles.labelSmall}>{this.state.user.companyName}</Text>
                    </View>
                </View>
                <View style={styles.assetDetailRow}>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelRight}>Address</Text>
                    </View>
                    <View style={styles.userDetailTextBox}>
                        <Text style={styles.labelSmall}>{this.state.user.address.line1}</Text>
                    
                        <Text style={styles.labelSmall}>{this.state.user.address.line2}</Text>
                    
                        <Text style={styles.labelSmall}>{this.state.user.address.line3}</Text>
                    </View>
                </View>
                <View style={styles.assetDetailRow}>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelRight}>State</Text>
                    </View>
                    <View style={styles.userDetailTextBox}>
                        <Text style={styles.labelSmall}>{this.state.user.address.state}</Text>
                    </View>
                </View>
                <View style={styles.assetDetailRow}>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelRight}>Country</Text>
                    </View>
                    <View style={styles.userDetailTextBox}>
                        <Text style={styles.labelSmall}>{this.state.user.address.country}</Text>                        
                    </View>
                </View>
                <View style={styles.assetDetailRow}>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelRight}>Phone</Text>
                    </View>
                    <View style={styles.userDetailTextBox}>
                        <Text style={styles.labelSmall}>{this.state.user.telephone}</Text>
                    </View>
                </View>
                <View style={styles.assetDetailRow}>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelRight}>Contact</Text>
                    </View>
                    <View style={styles.userDetailTextBox}>
                        <Text style={styles.labelSmall}>{this.state.user.contactPerson}</Text>
                    </View>
                </View>
                <TouchableHighlight style={styles.button}
                    onPress={() => {this.state.onEditPressed(this.state.user)}}>                    
                    <Text style={styles.buttonText}>Edit User</Text>
                </TouchableHighlight>
            </View>
        )
    }
}