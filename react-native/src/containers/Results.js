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
  removeKeyword,
  searchCity,
  setRootView,
} from 'actions';

// Imports
import ActionButton from 'react-native-action-button';
import Chip from 'Chip';
import Destination from 'Destination';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Uber from 'Uber';
import * as Constants from 'Constants';

class Results extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
      loaded: false,
    }
  }

  componentDidMount() {
    if (!this.state.loaded) {
      this.setState({
        loaded: true,
        dataSource: this.state.dataSource.cloneWithRows(this.props.results),
      })
    }
  }

  _onRemove(keyword) {
    this.props.removeKeyword(keyword);
  }

  _onNewSearch() {
    this.props.startNewSearch();
  }

  _onFilterList() {
    this.props.filter();
  }

  _renderHeader() {
    return (
      <View>
        <View style={{backgroundColor: Constants.Colors.primary, marginTop: -240, height: 240}} />
        <LinearGradient
            colors={[Constants.Colors.primary, Constants.Colors.primaryTransparent]}
            style={styles.headerShadow} />
      </View>
    );
  }

  _renderRow(row) {
    switch (row.view) {
      case 'destination':
        return (
          <View style={{marginBottom: Constants.Sizes.Margins.Expanded}}>
            <Destination
                name={row.name}
                stars={row.stars}
                cost={row.cost}
                type={row.type} />
            {row != this.props.results[this.props.results.length - 1] ? <View style={styles.destinationSeparator} /> : null}
          </View>
        );
      case 'uber':
        return (
          <View style={{marginBottom: Constants.Sizes.Margins.Expanded}}>
            <Uber
                cost={row.cost}
                time={row.time} />
            {row != this.props.results[this.props.results.length - 1] ? <View style={styles.uberSeparator} /> : null}
          </View>
        )
      default:
        return (
          <View />
        );
    }
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
            {this.props.keywords.map((keyword) => (
              <Chip
                  key={keyword}
                  text={keyword}
                  onClickAction={() => this._onRemove(keyword)} />
            ))}
          </View>
        </View>
        <ListView
            removeClippedSubviews={false}
            dataSource={this.state.dataSource}
            renderHeader={this._renderHeader}
            renderRow={this._renderRow.bind(this)} />
        <ActionButton
            buttonColor={Constants.Colors.secondary}
            icon={
              <MaterialIcons
                  name={'search'}
                  color={Constants.Colors.secondaryDarkText}
                  size={Constants.Sizes.Text.Title} />
            }>
          <ActionButton.Item
              buttonColor={Constants.Colors.primary}
              title={'New search'}
              onPress={this._onNewSearch.bind(this)}>
            <MaterialIcons
                name={'replay'}
                color={Constants.Colors.primaryLightText}
                size={Constants.Sizes.Text.Title} />
          </ActionButton.Item>
          <ActionButton.Item
              buttonColor={Constants.Colors.tertiary}
              title={'Filter'}
              onPress={this._onFilterList.bind(this)}>
            <MaterialIcons
                name={'filter-list'}
                color={Constants.Colors.primaryLightText}
                size={Constants.Sizes.Text.Title} />
          </ActionButton.Item>
        </ActionButton>
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
  headerShadow: {
    height: 20,
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
  textRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  spacer: {
    flex: 1,
  },

  destinationSeparator: {
    zIndex: -1,
    position: 'absolute',
    left: Constants.Sizes.Margins.Expanded + 22,
    top: 44,
    width: Constants.Sizes.Margins.Condensed,
    height: 50,
    backgroundColor: Constants.Colors.primaryLightText,
  },
  uberSeparator: {
    zIndex: -1,
    position: 'absolute',
    left: Constants.Sizes.Margins.Expanded + 22,
    top: 38,
    width: Constants.Sizes.Margins.Condensed,
    height: 40,
    backgroundColor: Constants.Colors.primaryLightText,
  },
});

// Map state to props
const select = (store) => {
  return {
    city: store.search.city,
    attractions: store.search.attractions,
    results: store.search.results,
    keywords: store.search.keywords,
  };
};

// Map dispatch to props
const actions = (dispatch) => {
  return {
    removeKeyword: (keyword: string) => dispatch(removeKeyword(keyword)),
    startNewSearch: () => {
      dispatch(setRootView('city'));
      dispatch(searchCity(''));
    },
    filter: () => dispatch(setRootView('keywords')),
  };
};

export default connect(select, actions)(Results);
