import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import Login from './src/actions/Login';
import Router from './src/config/Router';

// AppRegistry.registerComponent('Artboard', () => App);

// AppRegistry.registerComponent('Artboard', () => Login);

AppRegistry.registerComponent('Artboard', () => Router);