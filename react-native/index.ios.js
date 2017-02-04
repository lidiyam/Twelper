/**
 *
 * @license Copyright (C) 2017 Twelper
 * @created 2017-02-04
 * @file index.ios.js
 * @description Entry point for the Twelper iOS app
 *
 * @flow
 */
'use strict';

// React imports
import {
  AppRegistry,
} from 'react-native';

// Imports
import setup from './src/setup';

AppRegistry.registerComponent('Twelper', setup);
