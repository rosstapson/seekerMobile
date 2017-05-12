import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableHighlight
} from 'react-native';

import styles from '../styles';

export default class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state={
            user: this.props.user,
            accessToken: this.props.accessToken,
            handleUpdateClicked: this.props.handleUpdateClicked
        }
    }
    render() {
        return(
            <View>

                       
                <Text style={styles.label}>Username</Text>
                <Text style={styles.inputDisabled}>
                    {this.state.user.username}
                </Text>

                <Text style={styles.label}>Email</Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.user.email}
                onChangeText={(value) => this.setState({user: {...this.state.user, email: value}})}/>

                <Text style={styles.label}>Password</Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.user.password}
                secureTextEntry={true}
                onChangeText={(value) => this.setState({user: {...this.state.user, password: value}})}/>

                <Text style={styles.label}>Company</Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.user.companyName}
                onChangeText={(value) => this.setState({user: {...this.state.user, companyName: value}})}/>

                <Text style={styles.label}>Address</Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.user.address.line1}
                onChangeText={(value) => this.setState({user: {...this.state.user, address: {...this.state.user.address, line1: value}}})}/>
                <TextInput
                style={styles.input}
                defaultValue={this.state.user.address.line2}
                onChangeText={(value) => this.setState({user: {...this.state.user, address: {...this.state.user.address, line2: value}}})}/>
                <TextInput
                style={styles.input}
                defaultValue={this.state.user.address.line3}
                onChangeText={(value) => this.setState({user: {...this.state.user, address: {...this.state.user.address, line3: value}}})}/>
                <Text style={styles.label}>State</Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.user.address.state}
                onChangeText={(value) => this.setState({user: {...this.state.user, address: {...this.state.user.address, state: value}}})}/>
                <Text style={styles.label}>Country</Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.user.address.country}
                onChangeText={(value) => this.setState({user: {...this.state.user, address: {...this.state.user.address, country: value}}})}/>

                <Text style={styles.label}>Phone</Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.user.telephone}
                onChangeText={(value) => this.setState({user: {...this.state.user, telephone: value}})}/>

                <Text style={styles.label}>Contact</Text>
                <TextInput
                style={styles.input}
                defaultValue={this.state.user.contactPerson}
                onChangeText={(value) => this.setState({user: {...this.state.user, contactPerson: value}})}/>

                <TouchableHighlight
                    style={styles.button}
                    onPress={() => {this.state.handleUpdateClicked(this.state.user)}} >
                    <Text style={styles.buttonText}>Submit</Text>
                    </TouchableHighlight>
            </View>
        )
    }
}