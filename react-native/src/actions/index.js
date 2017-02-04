/**
 *
 * @license Copyright (C) 2017 Twelper
 * @created 2017-02-04
 * @file index.js
 * @description Provides access to actions to alter the state
 *
 * @flow
 */
'use strict';

import * as uberActions from './uberActions';
import * as yelpActions from './yelpActions';

module.exports = {
  ...uberActions,
  ...yelpActions,
};
