import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import Menu, { MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

//import IconButton from './iconButton.js';
import styles from '../styles'

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      onLeftButtonPressed: this.props.onLeftButtonPressed,
      leftButtonTitle: this.props.leftButtonTitle,
      onRightButtonPressed: this.props.onRightButtonPressed,
      rightButtonTitle: this.props.rightButtonTitle,
      menu: this.props.menu,
      menuItems: this.props.menuItems,
      handleMenuSelect: this.props.handleMenuSelect
    }
  }
  render() {
    return (
      <View style={styles.navbar}>
        <View style={{
          flex: 1
        }}>
          {this.state.leftButtonTitle && <Button
            title={this.state.leftButtonTitle}
            onPress={this.state.onLeftButtonPressed}/>}
        </View>
        <View style={{
          flex: 3
        }}>
          <Text style={styles.heading}>{this.state.title}</Text>
        </View>
        <View style={{
          flex: 1
        }}>
          {this.state.rightButtonTitle && <Button
            title={this.state.rightButtonTitle}
            onPress={this.state.onRightButtonPressed}/>}

          {this.state.menu && <Menu onSelect={(value) => this.state.handleMenuSelect(value)}>
            <MenuTrigger style={styles.menuTrigger}>
              <Text style={styles.menuTriggerText}>&#8942;</Text>
            </MenuTrigger>
            <MenuOptions>
              {this
                .state
                .menuItems
                .map((menuItem, i) => {
                  return (
                    <MenuOption 
                      value={menuItem.value}
                      key={i}
                    >
                      <Text style={styles.menuOptionText}>{menuItem.text}</Text>
                    </MenuOption>
                  )
                })}

            </MenuOptions>
          </Menu>
}
        </View>

      </View>
    )
  }
}