/**
 *
 * @license Copyright (C) 2017 Twelper
 * @created 2017-02-04
 * @file searchReducer.js
 * @description Determines the updated state based on search actions
 *
 * @flow
 */
'use strict';

const initialState = {
  city: '',
  numberOfAttractions: 3,
};

export default function search(state = initialState, action) {
  switch(action.type) {
    case 'SEARCH_CITY':
      return {
        ...state,
        city: action.city,
      };
    case 'SEARCH_SET_ATTRACTIONS':
      return {
        ...state,
        numberOfAttractions: action.attractions,
      };
    default:
      return state;
  }
}
