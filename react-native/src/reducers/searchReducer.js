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
  numberOfAttractions: 5,
  keywords: ['arts'],
  results: [],
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
    case 'SEARCH_ADD_KEYWORD': {
      const newKeywords = state.keywords.slice();
      newKeywords.push(action.keyword);
      newKeywords.sort();
      return {
        ...state,
        keywords: newKeywords,
      };
    }
    case 'SEARCH_REMOVE_KEYWORD': {
      const newKeywords = state.keywords.slice();
      for (let i = 0; i < newKeywords.length; i++) {
        if (newKeywords[i] === action.keyword) {
          newKeywords.splice(i, 1);
          break;
        }
      }

      return {
        ...state,
        keywords: newKeywords,
      };
    }
    case 'SEARCH_SET_RESULTS':
      return {
        ...state,
        results: action.results,
      };
    default:
      return state;
  }
}
