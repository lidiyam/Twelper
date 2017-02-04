/**
 *
 * @license Copyright (C) 2017 Twelper
 * @created 2017-02-04
 * @file Chip.js
 * @providesModule Chip
 * @description Text with action button
 *
 * @flow
 */
'use strict';

// React imports
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Imports
import * as Constants from 'Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Height of the chip
const CHIP_HEIGHT = 32;

export default class Chip extends React.Component {

  _onClickAction() {
    this.props.onClickAction && this.props.onClickAction();
  }

  render() {
    return (
      <View style={styles.chip}>
        <TouchableOpacity onPress={this._onClickAction.bind(this)}>
          <View style={styles.action}>
            <MaterialIcons
                name={'close'}
                size={Constants.Sizes.Text.Title - 1}
                style={styles.icon}
                color={Constants.Colors.primaryLightText} />
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chip: {
    margin: Constants.Sizes.Margins.Regular,
    height: CHIP_HEIGHT,
    backgroundColor: Constants.Colors.tertiary,
    borderRadius: CHIP_HEIGHT / 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  action: {
    width: CHIP_HEIGHT,
    height: CHIP_HEIGHT,
    backgroundColor: Constants.Colors.overlay,
    borderRadius: CHIP_HEIGHT / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
  text: {
    backgroundColor: '#00000000',
    fontSize: Constants.Sizes.Text.Body,
    color: Constants.Colors.primaryLightText,
    fontFamily: 'Futura',
    paddingLeft: Constants.Sizes.Margins.Condensed,
    paddingRight: Constants.Sizes.Margins.Regular,
  },
});
