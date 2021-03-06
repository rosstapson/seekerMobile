import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,    
    Picker,
    TouchableHighlight
    
} from 'react-native';

import styles from '../styles';

export default class ViewAsset extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            accessToken: this.props.accessToken,            
            onEditPressed: this.props.onEditPressed,
            asset: this.props.asset            
        }
    }
   
    render() {
        return (      
            <View>
                <Text style={styles.heading}>Asset Details</Text>
                <View style={styles.assetDetailRow}>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelRight}>DNA Code</Text>
                    </View>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelSmall}>{this.state.asset.dnaCode}</Text>
                    </View>
                </View>

                <View style={styles.assetDetailRow}>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelRight}>Asset Code</Text>
                    </View>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelSmall}>{this.state.asset.assetCode}</Text>
                    </View>
                </View>

                <View style={styles.assetDetailRow}>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelRight}>Description</Text>
                    </View>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelSmall}>{this.state.asset.description}</Text>
                    </View>
                </View>

                <View style={styles.assetDetailRow}>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelRight}>Location</Text>
                    </View>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelSmall}>{this.state.asset.location}</Text>
                    </View>
                </View>
                <View style={styles.assetDetailRow}>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelRight}>Unit of Measure</Text>
                    </View>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelSmall}>{this.state.asset.unitOfMeasure}</Text>
                    </View>
                </View>
                <View style={styles.assetDetailRow}>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelRight}>Audited</Text>
                    </View>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelSmall}>{this.state.asset.audited}</Text>
                    </View>
                </View>
                <View style={styles.assetDetailRow}>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelRight}>Next Audit Date</Text>
                    </View>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelSmall}>{this.state.asset.nextAuditDate}</Text>
                    </View>
                </View>
                <View style={styles.assetDetailRow}>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelRight}>Status</Text>
                    </View>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelSmall}>{this.state.asset.status}</Text>
                    </View>
                </View>
               <View style={styles.assetDetailRow}>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelRight}>Date Reported</Text>
                    </View>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelSmall}>{this.state.asset.dateReported}</Text>
                    </View>
                </View>
                <View style={styles.assetDetailRow}>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelRight}>Case Number</Text>
                    </View>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelSmall}>{this.state.asset.caseNumber}</Text>
                    </View>
                </View>
                <View style={styles.assetDetailRow}>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelRight}>Police Station</Text>
                    </View>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelSmall}>{this.state.asset.atPoliceStation}</Text>
                    </View>
                </View>
                <View style={styles.assetDetailRow}>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelRight}>Police Station</Text>
                    </View>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelSmall}>{this.state.asset.atPoliceStation}</Text>
                    </View>
                </View>
                <View style={styles.assetDetailRow}>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelRight}>Applied By</Text>
                    </View>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelSmall}>{this.state.asset.appliedBy}</Text>
                    </View>
                </View>
                <View style={styles.assetDetailRow}>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelRight}>Checked By</Text>
                    </View>
                    <View style={styles.assetSmallTextBox}>
                        <Text style={styles.labelSmall}>{this.state.asset.checkedBy}</Text>
                    </View>
                </View>

                <TouchableHighlight style={styles.button}
                    onPress={() => {this.state.onEditPressed(this.state.asset)}}>                    
                    <Text style={styles.buttonText}>Edit Asset</Text>
                    </TouchableHighlight>
            </View>
         
        )
    }
}