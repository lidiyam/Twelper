/**
 *
 * @license Copyright (C) 2017 Twelper
 * @created 2017-02-04
 * @file Twelper.js
 * @description Root container for the Twelper application.
 *
 * @flow
 */
'use strict';

// React imports
import React from 'react';
import {
  Navigator,
  View,
} from 'react-native';

// Imports
import * as Constants from 'Constants';

export default class Twelper extends React.Component {

  _configureScene(): Object {
    return Navigator.SceneConfigs.PushFromRight;
  }

  _renderScene(route, navigator) {
    switch (route.id) {
      default:
        return (
          <View />
        );
    }
  }

  render(): ReactElement < any > {
    return (
      <Navigator
          configureScene={this._configureScene}
          initialRoute={{id: 'home'}}
          renderScene={this._renderScene}
          style={{flex: 1, backgroundColor: Constants.Colors.primary}} />
    );
  }
}
