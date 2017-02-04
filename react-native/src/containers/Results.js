/**
 *
 * @license Copyright (C) 2017 Twelper
 * @created 2017-02-04
 * @file Results.js
 * @description Display the suggested tour to the user
 *
 * @flow
 */
'use strict';

// React imports
import React from 'react';
import {
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {
  setRootView,
} from 'actions';

// Imports
import Chip from 'Chip';
import LinearGradient from 'react-native-linear-gradient';
import * as Constants from 'Constants';

class Results extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
    }
  }

  _renderHeader() {
    return (
      <LinearGradient
          colors={[Constants.Colors.primary, Constants.Colors.primaryTransparent]}
          style={styles.headerShadow} />
    );
  }

  _renderRow() {

  }

  _renderSeparator() {
    return (
      <View style={styles.separator} />
    )
  }

  render(): ReactElement < any > {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.textRow}>
            <Text style={[styles.subtitle, styles.headerLeftText]}>{'your personalized trip to'}</Text>
            <View style={styles.spacer} />
            <Text style={[styles.subtitle, styles.headerRightText]}>{'approx.'}</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={[styles.huge, styles.headerLeftText]}>{this.props.city}</Text>
            <View style={styles.spacer} />
            <Text style={[styles.huge, styles.headerRightText]}>{'$8'}</Text>
          </View>
          <View style={styles.textRow}>
            <Chip text={'nightlife'} />
            <Chip text={'nightlife'} />
            <Chip text={'nightlife'} />
            <Chip text={'nightlife'} />
            <Chip text={'nightlife'} />
            <Chip text={'nightlife'} />
            <Chip text={'nightlife'} />
          </View>
        </View>
        <ListView
            dataSource={this.state.dataSource}
            alwaysBounceVertical={false}
            renderHeader={this._renderHeader}
            renderRow={this._renderRow.bind(this)}
            renderSeparator={this._renderSeparator.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.overlay,
  },
  header: {
    backgroundColor: Constants.Colors.primary,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  textRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  spacer: {
    flex: 1,
  },
  headerShadow: {
    height: 50,
  },
  headerLeftText: {
    paddingLeft: Constants.Sizes.Margins.Regular,
    color: Constants.Colors.primaryLightText,
  },
  headerRightText: {
    paddingRight: Constants.Sizes.Margins.Regular,
    textAlign: 'right',
    color: Constants.Colors.secondaryLightText,
  },
  subtitle: {
    fontSize: Constants.Sizes.Text.Subtitle,
    fontFamily: 'Futura',
  },
  huge: {
    fontSize: Constants.Sizes.Text.Huge,
    fontFamily: 'Futura',
  },
  separator: {
    marginLeft: Constants.Sizes.Margins.Expanded * 2,
    width: Constants.Sizes.Margins.Condensed,
    backgroundColor: Constants.Colors.primaryLightText,
    height: 30,
  },
});

// Map state to props
const select = (store) => {
  return {
    city: store.search.city,
    attractions: store.search.attractions,
  };
};

// Map dispatch to props
const actions = (dispatch) => {
  return {
    startNewSearch: () => dispatch(setRootView('city')),
  };
};

export default connect(select, actions)(Results);
