/**
 *
 * @license Copyright (C) 2017 Twelper
 * @created 2017-02-04
 * @file navigationReducer.js
 * @description Determines the updated state based on navigation actions
 *
 * @flow
 */
'use strict';

const initialState = {
  rootView: 'city',
};

export default function navigation(state = initialState, action) {
  switch(action.type) {
    case 'SET_ROOT_VIEW':
      return {
        ...state,
        rootView: action.view,
      };
    default:
      return state;
  }
}
