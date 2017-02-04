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
import StatusBar from 'StatusBarUnderlay';
import * as Constants from 'Constants';

// Screen imports
import City from './search/City';

export default class Twelper extends React.Component {

  _configureScene(): Object {
    return Navigator.SceneConfigs.PushFromRight;
  }

  _renderScene(route, navigator) {
    switch (route.id) {
      case 'city':
        return (
          <City />
        );
      default:
        return (
          <View />
        );
    }
  }

  render(): ReactElement < any > {
    return (
      <View style={{flex: 1, backgroundColor: Constants.Colors.primary}}>
        <Navigator
            configureScene={this._configureScene}
            initialRoute={{id: 'city'}}
            renderScene={this._renderScene}
            style={{flex: 1}} />
        <StatusBar />
      </View>
    );
  }
}
