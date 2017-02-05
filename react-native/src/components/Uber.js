/**
 *
 * @license Copyright (C) 2017 Twelper
 * @created 2017-02-04
 * @file Uber.js
 * @providesModule Uber
 * @description Uber estimates between two locations
 *
 * @flow
 */
'use strict';

// React imports
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Imports
import * as Constants from 'Constants';

export default class Uber extends React.Component {
  render() {
    return (
      <View style={[styles.uber, this.props.style]}>
        <Image
            style={styles.uberIcon}
            source={require('../../assets/uber.png')} />
          <View style={[styles.uberContent, styles.vertical]}>
            <Text style={styles.uberText}>{`approx. ${this.props.cost} / ${this.props.time}`}</Text>
            <Text style={[styles.uberText, styles.orderText]}>{'Tap to open Uber'}</Text>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  vertical: {
    flexDirection: 'column',
    marginLeft: Constants.Sizes.Margins.Expanded,
  },
  uber: {
    marginLeft: Constants.Sizes.Margins.Expanded,
    marginRight: Constants.Sizes.Margins.Expanded,
    flexDirection: 'row',
    alignItems: 'center',
  },
  uberIcon: {
    width: 38,
    height: 38,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uberContent: {
    padding: Constants.Sizes.Margins.Condensed,
    borderRadius: Constants.Sizes.Margins.Condensed,
    backgroundColor: Constants.Colors.destination,
  },
  uberText: {
    fontSize: Constants.Sizes.Text.Body,
    color: Constants.Colors.primaryDarkText,
    paddingRight: Constants.Sizes.Margins.Regular,
    paddingLeft: Constants.Sizes.Margins.Regular,
    fontFamily: 'Futura',
  },
  orderText: {
    marginTop: Constants.Sizes.Margins.Condensed,
    fontStyle: 'italic',
  },
});
