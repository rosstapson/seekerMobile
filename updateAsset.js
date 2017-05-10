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

export default class UpdateAsset extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            accessToken: this.props.accessToken,
            pendingUpdateAsset: false,
            // asset stuff:
            asset: this.props.asset,
            handleUpdateAsset: this.props.handleUpdateAsset
            
        }
    }
    onLeftButtonPressed() {
        this.props.navigator.pop();
    }
    handleUpdateClicked() {
        this.state.handleUpdateAsset(this.state.asset, this.state.username, this.state.accessToken);
    }

    render() {
        return (
            <ScrollView>
        <NavBar 
          title={"Edit"} 
          leftButtonTitle={"Back"} 
          onLeftButtonPressed={this.onLeftButtonPressed.bind(this)}
         
         />      
         
         {this.state.pendingUpdateAsset &&
            <ActivityIndicator 
            size="large"
            color="blue"
          />
        }
        {!this.state.pendingUpdateAsset &&
            <View>
                <Text style={styles.label}>DNA Code <Text style={styles.required}> *</Text></Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.asset.dnaCode}
                onChangeText={(value) => this.setState({dnaCode: value})}/>

                <Text style={styles.label}>Asset Code <Text style={styles.required}> *</Text></Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.asset.assetCode}
                onChangeText={(value) => this.setState({assetCode: value})}/>

                <Text style={styles.label}>Description</Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.asset.description}
                onChangeText={(value) => this.setState({description: value})}/>

                <Text style={styles.label}>Location</Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.asset.location}
                onChangeText={(value) => this.setState({location: value})}/>

                <Text style={styles.label}>Unit of Measure</Text>
                <Picker
                selectedValue={this.state.asset.unitOfMeasure}
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
                selectedValue={this.state.asset.audited}
                onValueChange={(val) => this.setState({audited: val})}
                >
                    <Picker.Item label="Yes" value="Yes" />
                    <Picker.Item label="No" value="No" />
                    <Picker.Item label="Re-Audited" value="Re-Audited" />
                </Picker>

                <Text style={styles.label}>Status</Text>
                <Picker selectedValue={this.state.asset.status}
                onValueChange={(val) => this.setState({status: val})}
                >
                    <Picker.Item label="Alert" value="Alert" />
                    <Picker.Item label="Active" value="Active" />
                    <Picker.Item label="Inactive" value="Inactive" />
                </Picker>

                <Text style={styles.label}>Date Reported</Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.asset.dateReported}
                onChangeText={(value) => this.setState({dateReported: value})}/>

                <Text style={styles.label}>Case Number</Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.asset.caseNumber}
                onChangeText={(value) => this.setState({caseNumber: value})}/>

                <Text style={styles.label}>At Police Station</Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.asset.atPoliceStation}
                onChangeText={(value) => this.setState({atPoliceStation: value})}/>

                <Text style={styles.label}>Next Audit Date</Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.asset.nextAuditDate}
                onChangeText={(value) => this.setState({nextAuditDate: value})}/>

                <Text style={styles.label}>Applied By</Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.asset.appliedBy}
                onChangeText={(value) => this.setState({appliedBy: value})}/>

                <Text style={styles.label}>Checked By</Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.asset.checkedBy}
                onChangeText={(value) => this.setState({checkedBy: value})}/>

                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleUpdateClicked.bind(this)} >
                    <Text style={styles.buttonText}>Submit</Text>
                    </TouchableHighlight>
            </View>
            }
         </ScrollView>
         
        )
    }
}