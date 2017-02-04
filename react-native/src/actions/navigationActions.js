/**
 *
 * @license Copyright (C) 2017 Twelper
 * @created 2017-02-04
 * @file navigationActions.js
 * @description Provides access to navigation actions to alter the state
 *
 * @flow
 */
'use strict';

export function setRootView(view: 'city' | 'attractions' | 'results') {
  return {
    type: 'SET_ROOT_VIEW',
    view,
  };
}
