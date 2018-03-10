import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import Login from './src/actions/Login';

// AppRegistry.registerComponent('Artboard', () => App);

// AppRegistry.registerComponent('Artboard', () => Login);

export default class Artboard extends Component {
    render() {
        return (
            <App  />
        );
    }
}

AppRegistry.registerComponent('Artboard', () => Artboard);
