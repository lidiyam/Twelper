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
    const halfStar = this.props.stars.toString().indexOf('.') >= 0;
    const stars = [];
    for (let i = 1; i <= this.props.stars; i++) {
      stars.push(
        <MaterialIcons
            key={`star-${i}`}
            size={Constants.Sizes.Text.Caption}
            color={Constants.Colors.primaryDarkText}
            name={'star'} />
      );
    }

    return (
      <View style={styles.destination}>
        <View style={styles.destinationIcon}>
          <MaterialIcons
              name={this.props.type}
              color={Constants.Colors.primaryLightText}
              size={Constants.Sizes.Text.Title} />
        </View>
        <View style={styles.destinationContent}>
          <Text
              style={styles.destinationTitle}
              ellipsizeMode={'tail'}
              numberOfLines={1}>
            {this.props.name}
          </Text>
          <View style={styles.destinationDetails}>
            {stars.map((star) => star)}
            {halfStar
            ? <MaterialIcons
                name={'star-half'}
                size={Constants.Sizes.Text.Caption}
                color={Constants.Colors.primaryDarkText} />
            : null}
            <View style={styles.spacer} />
            <Text style={styles.destinationCost}>{this.props.cost ? this.props.cost : 'N/A'}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  destination: {
    marginLeft: Constants.Sizes.Margins.Expanded,
    marginRight: Constants.Sizes.Margins.Expanded * 4,
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
    marginTop: Constants.Sizes.Margins.Condensed,
  },
  destinationCost: {
    textAlign: 'right',
  },
  spacer: {
    flex: 1,
  },
});
