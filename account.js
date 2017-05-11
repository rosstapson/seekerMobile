import React, {Component} from 'react';
import {Text, View, ScrollView, Alert} from 'react-native';
import UserDetail from './components/userDetail';
import NavBar from './components/navbar';

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            accessToken: this.props.accessToken,
            navigator: this.props.navigator,
            navTitle: "User Details",
            pendingUpdateUser: false,
            showUserDetails: true,
            showUpdateUser: false
        }
    }
    onLeftButtonPressed() {
        this.state.navigator.pop();
    }
    onEditPressed(user) {
        Alert.alert("on edit pressed")
        //this.showUpdateUser(user);
    }
    render() {
        return (
            <ScrollView>
                <NavBar
                    title={this.state.navTitle}
                    leftButtonTitle={"Back"}
                    onLeftButtonPressed={this
                    .onLeftButtonPressed
                    .bind(this)}/> 
                
                {this.state.pendingUpdateUser && 
                    <ActivityIndicator size="large" color="blue"/>
                }
                {this.state.showUserDetails &&
                    <UserDetail 
                        user={this.state.user}
                        accessToken={this.state.accessToken}
                        onEditPressed={this.onEditPressed.bind(this)}
                    />
                }
                {this.state.showUpdateUser &&
                    <Text>User Uupdate: zomg.</Text>
                }
            </ScrollView>
        )
    }
}
