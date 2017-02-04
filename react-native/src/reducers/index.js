/**
 *
 * @license Copyright (C) 2017 Twelper
 * @created 2017-02-04
 * @file index.js
 * @description Determines the application state based on actions
 *
 * @flow
 */
'use strict';


// Redux imports
const {combineReducers} = require('redux');

// Reducer imports
import navigationReducer from './navigationReducer';
import searchReducer from './searchReducer';
import uberReducer from './uberReducer';
import yelpReducer from './yelpReducer';

// Combine and export reducers
module.exports = combineReducers({
  navigation: navigationReducer,
  search: searchReducer,
  uber: uberReducer,
  yelp: yelpReducer,
});
