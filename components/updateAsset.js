import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    
    ActivityIndicator,
    Picker,
    TouchableHighlight,
    
} from 'react-native';


import styles from '../styles';

export default class UpdateAsset extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            accessToken: this.props.accessToken,            
            asset: this.props.asset,
            handleUpdateClicked: this.props.handleUpdateClicked
            
        }
    }
   
    render() {
        return (
            <View>            
                <Text style={styles.label}>DNA Code</Text>
                <Text style={styles.inputDisabled}>
                    {this.state.asset.dnaCode}
                </Text>

                <Text style={styles.label}>Asset Code <Text style={styles.required}> *</Text></Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.asset.assetCode}
                onChangeText={(value) => this.setState({asset: {...this.state.asset, assetCode: value}})}/>

                <Text style={styles.label}>Description</Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.asset.description}
                onChangeText={(value) => this.setState({asset: {...this.state.asset, description: value}})}/>

                <Text style={styles.label}>Location</Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.asset.location}
                onChangeText={(value) => this.setState({asset: {...this.state.asset, location: value}})}/>

                <Text style={styles.label}>Unit of Measure</Text>
                <Picker
                selectedValue={this.state.asset.unitOfMeasure}
                onValueChange={(val) => this.setState({asset: {...this.state.asset, unitOfMeasure: val}})}
                >
                    <Picker.Item label="EA" value="EA" />
                    <Picker.Item label="Kg" value="Kg" />
                    <Picker.Item label="Lt" value="Lt" />
                    <Picker.Item label="PAA" value="PAA" />
                    <Picker.Item label="MT" value="MT" />
                    <Picker.Item label="MT2" value="MT2" />
                </Picker>

                <Text style={styles.label}>Audited</Text>
                <Picker
                selectedValue={this.state.asset.audited}
                onValueChange={(val) => this.setState({asset: {...this.state.asset, audited: val}})}
                >
                    <Picker.Item label="Yes" value="Yes" />
                    <Picker.Item label="No" value="No" />
                    <Picker.Item label="Re-Audited" value="Re-Audited" />
                </Picker>

                <Text style={styles.label}>Status</Text>
                <Picker selectedValue={this.state.asset.status}
                onValueChange={(val) => this.setState({asset: {...this.state.asset, status: val}})}
                >
                    <Picker.Item label="Alert" value="Alert" />
                    <Picker.Item label="Active" value="Active" />
                    <Picker.Item label="Inactive" value="Inactive" />
                </Picker>

                <Text style={styles.label}>Date Reported</Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.asset.dateReported}
                onChangeText={(value) => this.setState({asset: {...this.state.asset, dateReported: value}})}/>

                <Text style={styles.label}>Case Number</Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.asset.caseNumber}
                onChangeText={(value) => this.setState({asset: {...this.state.asset, caseNumber: value}})}/>

                <Text style={styles.label}>At Police Station</Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.asset.atPoliceStation}
                onChangeText={(value) => this.setState({asset: {...this.state.asset, atPoliceStation: value}})}/>

                <Text style={styles.label}>Next Audit Date</Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.asset.nextAuditDate}
                onChangeText={(value) => this.setState({asset: {...this.state.asset, nextAuditDate: value}})}/>

                <Text style={styles.label}>Applied By</Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.asset.appliedBy}
                onChangeText={(value) => this.setState({asset: {...this.state.asset, appliedBy: value}})}/>

                <Text style={styles.label}>Checked By</Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.asset.checkedBy}
                onChangeText={(value) => this.setState({asset: {...this.state.asset, checkedBy: value}})}/>

                <TouchableHighlight
                    style={styles.button}
                    onPress={() => {this.state.handleUpdateClicked(this.state.asset)}} >
                    <Text style={styles.buttonText}>Submit</Text>
                    </TouchableHighlight>
            </View>
           
         
         
        )
    }
}