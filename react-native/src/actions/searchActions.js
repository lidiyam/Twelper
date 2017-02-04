/**
 *
 * @license Copyright (C) 2017 Twelper
 * @created 2017-02-04
 * @file searchActions.js
 * @description Provides access to search actions to alter the state
 *
 * @flow
 */
'use strict';

export function searchCity(city: string) {
  return {
    type: 'SEARCH_CITY',
    city,
  };
}

export function setNumberOfAttractions(attractions: number) {
  return {
    type: 'SEARCH_SET_ATTRACTIONS',
    attractions,
  }
}

export function setResults(results: Array) {
  return {
    type: 'SEARCH_SET_RESULTS',
    results,
  }
}