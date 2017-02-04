/**
 *
 * @license Copyright (C) 2017 Twelper
 * @created 2017-02-04
 * @file Attractions.js
 * @description Allow the user to select the number of attractions to visit
 *
 * @flow
 */
'use strict';

// React imports
import React from 'react';
import {
  Image,
  Picker,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {
  setNumberOfAttractions,
  setRootView,
} from 'actions';

// Imports
import NextButton from 'NextButton';
import * as Constants from 'Constants';

const MAX_ATTRACTIONS = 10;

class Attractions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      attractions: 3,
    };

    this._onNext = this._onNext.bind(this);
  }

  _onNext() {
    this.props.selectAttractions(this.props.attractions);
  }

  render(): ReactElement < any > {
    let attractions = [];
    for (let i = 1; i <= MAX_ATTRACTIONS; i++) {
      attractions.push(i);
    }

    return (
      <View style={styles.container}>
        <View style={styles.menu}>
          <Text style={styles.subtitle}>{'how many'}</Text>
          <Text style={styles.title}>{'ATTRACTIONS?'}</Text>
        </View>
        <Picker
            itemStyle={styles.pickerItem}
            selectedValue={this.props.attractions}
            onValueChange={(value) => this.props.updateAttractions(value)}>
          {attractions.map((value) => (
            <Picker.Item
                key={value}
                label={value.toString()}
                value={value} />
          ))}
        </Picker>
        <View style={styles.inputContainer}>
          <NextButton onClick={this._onNext} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.overlay,
    justifyContent: 'center',
  },
  menu: {
    marginLeft: Constants.Sizes.Margins.Expanded * 4,
    marginRight: Constants.Sizes.Margins.Expanded * 4,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerItem: {
    color: Constants.Colors.primaryLightText,
    backgroundColor: Constants.Colors.overlay,
  },
  subtitle: {
    fontSize: Constants.Sizes.Text.Subtitle,
    color: Constants.Colors.primaryLightText,
    fontFamily: 'Futura',
  },
  title: {
    fontSize: Constants.Sizes.Text.Title,
    color: Constants.Colors.secondary,
    fontFamily: 'Futura',
  },
});

// Map state to props
const select = (store) => {
  return {
    attractions: store.search.numberOfAttractions,
  };
};

// Map dispatch to props
const actions = (dispatch) => {
  return {
    updateAttractions: (attractions: number) => dispatch(setNumberOfAttractions(attractions)),
    selectAttractions: (attractions: number) => {
      dispatch(setNumberOfAttractions(attractions));
      dispatch(setRootView('results'));
    },
  };
};

export default connect(select, actions)(Attractions);
