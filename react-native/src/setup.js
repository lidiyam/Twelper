/**
 *
 * @license Copyright (C) 2017 Twelper
 * @created 2017-02-04
 * @file setup.js
 * @description Provides the initial setup environment for the Twelper app
 *
 * @flow
 */
'use strict';


// React imports
import React from 'react';
import {
  Platform,
  UIManager,
} from 'react-native';

// Redux imports
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';

// Imports
import Twelper from './containers/Twelper';

export default function setup() {

  // Disable yellow box on release
  if (!__DEV__) {
    console.disableYellowBox = true
  }

  // Enable animations on Android
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  // Create the redux store
  const store = configureStore();

  class Root extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <Twelper />
        </Provider>
      );
    }
  }

  return Root;
}