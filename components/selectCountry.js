import React, { Component } from 'react';
import {
    Picker,
    View
} from 'react-native';
import countries from './countries';
export default class SelectCountry extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         country: this.props.defaultValue
    //     }
    // }
    onValueChange = (country) => {
        //this.setState({ country });
        this.props.onChange(country);
    }
    render() {        
        return (
            <View style={{
                width: '100%'
              }}>
            <Picker 
                selectedValue={this.props.defaultValue}
                onValueChange={this.onValueChange}
                >
                {countries.map((i, index) => (
                    <Picker.Item key={index} label={i.label} value={i.value} />
                    ))}

            </Picker>
            </View>
        )
    }
}