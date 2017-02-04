/**
 *
 * @license Copyright (C) 2017 Twelper
 * @created 2017-02-04
 * @file index.android.js
 * @description Entry point for the Twelper Android app
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
