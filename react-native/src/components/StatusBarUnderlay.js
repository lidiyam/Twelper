/**
 *
 * @license Copyright (C) 2017 Twelper
 * @created 2017-02-04
 * @file StatusBar.js
 * @providesModule StatusBarUnderlay
 * @description Always render something under the status bar on iOS
 *
 * @flow
 */
'use strict';

// React imports
import React from 'react';
import {
  Dimensions,
  Platform,
  View,
} from 'react-native';

// Imports
import * as Constants from 'Constants';
const screenWidth = Dimensions.get('window').width;

export default function StatusBar() {
  if (Platform.OS === 'android') {
    return null;
  } else {
    return (
      <View style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 20,
        backgroundColor: Constants.Colors.primary,
        }} />
    );
  }
}
