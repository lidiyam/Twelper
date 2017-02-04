/**
 *
 * @license Copyright (C) 2017 Twelper
 * @created 2017-02-04
 * @file index.js
 * @providesModule actions
 * @description Provides access to actions to alter the state
 *
 * @flow
 */
'use strict';

import * as navigationActions from './navigationActions';
import * as searchActions from './searchActions';

module.exports = {
  ...navigationActions,
  ...searchActions,
};
