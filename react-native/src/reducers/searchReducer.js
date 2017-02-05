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
  keywords: ['nightlife', 'cheap'],
  results: [
    {
      name: 'Drinks at Parliament',
      stars: 5,
      cost: 1,
      type: 'local-bar',
      view: 'destination',
    },
    {
      cost: 8,
      time: 12,
      view: 'uber',
    },
    {
      name: 'Strathcona Park',
      stars: 4.5,
      cost: 0,
      type: 'local-florist',
      view: 'destination',
    },
    {
      cost: 8,
      time: 12,
      view: 'uber',
    },
    {
      name: 'Strathcona Park',
      stars: 4.5,
      cost: 0,
      type: 'local-florist',
      view: 'destination',
    },
    {
      cost: 8,
      time: 12,
      view: 'uber',
    },
    {
      name: 'Strathcona Park',
      stars: 4.5,
      cost: 0,
      type: 'local-florist',
      view: 'destination',
    },
    {
      cost: 8,
      time: 12,
      view: 'uber',
    },
    {
      name: 'Strathcona Park',
      stars: 4.5,
      cost: 0,
      type: 'local-florist',
      view: 'destination',
    },
    {
      cost: 8,
      time: 12,
      view: 'uber',
    },
    {
      name: 'Strathcona Park',
      stars: 4.5,
      cost: 0,
      type: 'local-florist',
      view: 'destination',
    },
    {
      cost: 8,
      time: 12,
      view: 'uber',
    },
    {
      name: 'Strathcona Park',
      stars: 4.5,
      cost: 0,
      type: 'local-florist',
      view: 'destination',
    },
  ],
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
