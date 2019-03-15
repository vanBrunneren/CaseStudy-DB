/**
 * Sample React Native _App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';


export default class App extends Component<Props> {

    render() {

        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Hello World</Text>
            </View>
        );

    }

}


