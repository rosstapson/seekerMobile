import React, {Component} from 'react';
import {Text, View, ScrollView, Alert, ActivityIndicator} from 'react-native';
import UserDetail from './components/userDetail';
import NavBar from './components/navbar';
import UpdateUser from './components/updateUser';

import Api from './api';

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
            showUpdateUser: false,
            debuggery: false
        }
    }
    onLeftButtonPressed() {
        this.state.navigator.pop();
    }
    
    onEditPressed(user) {
        //Alert.alert("on edit pressed")
        this.showUpdateUser(user);
    }
    showUpdateUser(user) {
        this.setState({
            showUserDetails: false,
            showUpdateUser: true
        })
    }
    showUpdatePending(pending) {
        this.setState({
            pendingUpdateUser: pending,
            showUpdateUser: !pending
        });
    }
    async handleUpdateClicked(user) {
        if (this.state.debuggery) {
            Alert.alert(user.address.line1);
            return;
        }
        try {
            this.showUpdatePending(true);
            let newUser = await Api.updateUser(user, this.state.accessToken);
            this.setState({
              user: user,
              pendingUpdateUser: false,
              showUpdateUser: false,
              showUserDetails:true
            });            
            Alert.alert("Update Complete", "User details updated.");
        }
        catch(error) {
            this.showUpdatePending(false);
            Alert.alert("Update Failed", error.message);
        }
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
                    <UpdateUser 
                        user={this.state.user}
                        accessToken={this.state.accessToken}
                        handleUpdateClicked={this.handleUpdateClicked.bind(this)}
                    />
                }
            </ScrollView>
        )
    }
}
