/**
 *
 * @license Copyright (C) 2017 Twelper
 * @created 2017-02-04
 * @file Destination.js
 * @providesModule Destination
 * @description Details about a location the user may be interested in
 *
 * @flow
 */
'use strict';

// React imports
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Imports
import * as Constants from 'Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class Destination extends React.Component {
  render() {
    return (
      <View style={styles.destination}>
        <View style={styles.destinationIcon}>
          <MaterialIcons
              name={this.props.type}
              color={Constants.Colors.primaryLightText}
              size={Constants.Sizes.Text.Title} />
        </View>
        <View style={styles.destinationContent}>
          <Text style={styles.destinationTitle}>{this.props.name}</Text>
          <View style={styles.destinationDetails}>
            <Text style={styles.destinationStars}>{this.props.stars}</Text>
            <Text style={styles.destinationCost}>{this.props.cost}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  destination: {
    marginLeft: Constants.Sizes.Margins.Expanded,
    marginRight: Constants.Sizes.Margins.Expanded,
    flexDirection: 'row',
    alignItems: 'center',
  },
  destinationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Constants.Colors.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  destinationContent: {
    marginLeft: Constants.Sizes.Margins.Expanded,
    padding: Constants.Sizes.Margins.Regular,
    borderRadius: Constants.Sizes.Margins.Condensed,
    backgroundColor: Constants.Colors.destination,
  },
  destinationTitle: {
    fontSize: Constants.Sizes.Text.Title,
    color: Constants.Colors.primaryDarkText,
    fontFamily: 'Futura',
  },
  destinationDetails: {
    flexDirection: 'row',
  }
});
