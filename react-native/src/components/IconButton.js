/**
 *
 * @license Copyright (C) 2017 Twelper
 * @created 2017-02-04
 * @file IconButton.js
 * @providesModule IconButton
 * @description Small circular button
 *
 * @flow
 */
'use strict';

// React imports
import React from 'react';
import {
  TouchableOpacity,
  View,
} from 'react-native';

// Imports
import * as Constants from 'Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Width / Height of the button
const BUTTON_SIZE = 32;

export default class IconButton extends React.Component {

  _onClick() {
    this.props.onClick && this.props.onClick();
  }

  render() {
    return (
      <TouchableOpacity onPress={this._onClick.bind(this)}>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: BUTTON_SIZE,
          height: BUTTON_SIZE,
          borderRadius: BUTTON_SIZE / 2,
          backgroundColor: Constants.Colors.secondary,
          margin: Constants.Sizes.Margins.Regular,
          }}>
          {this.props.renderIcon()}
        </View>
      </TouchableOpacity>
    );
  }
}

