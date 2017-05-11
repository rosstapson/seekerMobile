import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    ScrollView,
    ActivityIndicator,
    Picker,
    TouchableHighlight,
    Alert
} from 'react-native';

import NavBar from './components/navbar';
import Api from './api';

import styles from './styles';

export default class CaptureAsset extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            accessToken: this.props.accessToken,
            pendingAddAsset: false,
            // asset stuff:
            dnaCode: '',
            assetCode: '',
            itemCode: '',
            description: '',
            location: '',        
            unitOfMeasure: 'EA',
            audited: 'No',
            status: 'Inactive',
            dateReported: '',
            caseNumber: '',
            atPoliceStation: '',
            nextAuditDate: '',
            appliedBy: '',
            checkedBy: ''
            
        }
    }
    onLeftButtonPressed() {
        this.props.navigator.pop();
    }
    handleAddAsset() {
        this.setState({pendingAddAsset: true});
        let asset = {
            dnaCode: this.state.dnaCode,
            assetCode: this.state.assetCode,
            itemCode: this.state.itemCode,
            description: this.state.description,
            location: this.state.location,        
            unitOfMeasure: this.state.unitOfMeasure,
            audited: this.state.audited,
            status: this.state.status,
            dateReported: this.state.dateReported,
            caseNumber: this.state.caseNumber,
            atPoliceStation: this.state.atPoliceStation,
            nextAuditDate: this.state.nextAuditDate,
            appliedBy: this.state.appliedBy,
            checkedBy: this.state.checkedBy
            }            
        
        try {
            if (this.state.dnaCode === '' || this.state.assetCode === '') {
                Alert.alert("Error", "Valid DNA Code required");
                this.setState({pendingAddAsset: false});
                return;
            }
           
            let result = Api.addAssetForUser(asset, this.state.username, this.state.accessToken);
           
            Alert.alert("Success", "Asset captured.");
            this.setState({
                pendingAddAsset: false,
                dnaCode: '',
                assetCode: '',
                itemCode: '',
                description: '',
                location: '',        
                unitOfMeasure: 'EA',
                audited: 'No',
                status: 'Inactive',
                dateReported: '',
                caseNumber: '',
                atPoliceStation: '',
                nextAuditDate: '',
                appliedBy: '',
                checkedBy: ''
            });
        }
        catch(error) {
            Alert.alert(error.message);
            this.setState({pendingAddAsset: false});
        }       
         
    }

    render() {
        return (
            <ScrollView>
        <NavBar 
          title={"Capture"} 
          leftButtonTitle={"Back"} 
          onLeftButtonPressed={this.onLeftButtonPressed.bind(this)}
         
         />      
         
         {this.state.pendingAddAsset &&
            <ActivityIndicator 
            size="large"
            color="blue"
          />
        }
        {!this.state.pendingAddAsset &&
            <View>
                <Text style={styles.label}>DNA Code <Text style={styles.required}> *</Text></Text>
                <TextInput
                style={styles.input}
                placeholder="DNA Code"
                onChangeText={(val) => this.setState({dnaCode: val})}/>

                <Text style={styles.label}>Asset Code <Text style={styles.required}> *</Text></Text>
                <TextInput
                style={styles.input}
                placeholder="Asset Code"
                onChangeText={(val) => this.setState({assetCode: val})}/>

                <Text style={styles.label}>Item Code</Text>
                <TextInput
                style={styles.input}
                placeholder="Item Code"
                onChangeText={(val) => this.setState({itemCode: val})}/>

                <Text style={styles.label}>Description</Text>
                <TextInput
                style={styles.input}
                placeholder="Description"
                onChangeText={(val) => this.setState({description: val})}/>

                <Text style={styles.label}>Location</Text>
                <TextInput
                style={styles.input}
                placeholder="Location"
                onChangeText={(val) => this.setState({location: val})}/>

                <Text style={styles.label}>Unit of Measure</Text>
                <Picker
                selectedValue={this.state.unitOfMeasure}
                onValueChange={(val) => this.setState({unitOfMeasure: val})}
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
                selectedValue={this.state.audited}
                onValueChange={(val) => this.setState({audited: val})}
                >
                    <Picker.Item label="Yes" value="Yes" />
                    <Picker.Item label="No" value="No" />
                    <Picker.Item label="Re-Audited" value="Re-Audited" />
                </Picker>

                <Text style={styles.label}>Status</Text>
                <Picker selectedValue={this.state.status}
                onValueChange={(val) => this.setState({status: val})}
                >
                    <Picker.Item label="Alert" value="Alert" />
                    <Picker.Item label="Active" value="Active" />
                    <Picker.Item label="Inactive" value="Inactive" />
                </Picker>

                <Text style={styles.label}>Date Reported</Text>
                <TextInput
                style={styles.input}
                placeholder="Date Reported"
                onChangeText={(val) => this.setState({dateReported: val})}/>

                <Text style={styles.label}>Case Number</Text>
                <TextInput
                style={styles.input}
                placeholder="Case Number"
                onChangeText={(val) => this.setState({caseNumber: val})}/>

                <Text style={styles.label}>At Police Station</Text>
                <TextInput
                style={styles.input}
                placeholder="At Police Station"
                onChangeText={(val) => this.setState({atPoliceStation: val})}/>

                <Text style={styles.label}>Next Audit Date</Text>
                <TextInput
                style={styles.input}
                placeholder="Next Audit Date"
                onChangeText={(val) => this.setState({nextAuditDate: val})}/>

                <Text style={styles.label}>Applied By</Text>
                <TextInput
                style={styles.input}
                placeholder="Applied By"
                onChangeText={(val) => this.setState({appliedBy: val})}/>

                <Text style={styles.label}>Checked By</Text>
                <TextInput
                style={styles.input}
                placeholder="Checked By"
                onChangeText={(val) => this.setState({checkedBy: val})}/>

                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleAddAsset.bind(this)} >
                    <Text style={styles.buttonText}>Submit</Text>
                    </TouchableHighlight>
            </View>
            }
         </ScrollView>
         
        )
    }
}