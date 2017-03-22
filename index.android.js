/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
} from 'react-native';

import ListViewExample from './ListViewExample';

export default class ImmutableListViewExample extends Component {
    render() {
        return (
            <ListViewExample/>
        );
    }
}

AppRegistry.registerComponent('ImmutableListViewExample', () => ImmutableListViewExample);
