import React, { Component } from 'react';
import { View } from 'react-native';

import AppText from './AppText';

export default class BodyText extends Component {
    render() {
        return (
            <AppText>
                <Text style={{ fontSize: 20 }}>
                    {this.props.children}
                </Text>
            </AppText>
        );
    }
}