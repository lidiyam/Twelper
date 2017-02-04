/**
 *
 * @license Copyright (C) 2017 Twelper
 * @created 2017-02-04
 * @file City.js
 * @description Allow the user to select a city to explore
 *
 * @flow
 */
'use strict';

// React imports
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {
  searchCity,
} from 'actions';

// Imports
import NextButton from 'NextButton';
import * as Constants from 'Constants';

const {width, height} = Dimensions.get('window');

class City extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      city: '',
    };

    this._onNext = this._onNext.bind(this);
  }

  _onNext() {
    this.props.selectCity(this.props.city);
  }

  render(): ReactElement < any > {
    return (
      <View style={styles.container}>
        <Image
            source={{uri: 'https://source.unsplash.com/category/buildings/'}}
            style={styles.backgroundImage} />
        <View style={[styles.container, styles.overlay]}>
          <View style={styles.menu}>
            <Text style={styles.subtitle}>{'Find your'}</Text>
            <Text style={styles.title}>{'CITY'}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                  returnKeyType={'go'}
                  selectTextOnFocus={true}
                  style={styles.input}
                  value={this.props.city}
                  onChangeText={(value) => this.props.updateCity(value)}
                  onSubmitEditing={this._onNext} />
              <NextButton onClick={this._onNext} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.primary,
  },
  backgroundImage: {
    resizeMode: 'cover',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width,
    height,
  },
  overlay: {
    backgroundColor: Constants.Colors.overlay,
    justifyContent: 'center',
  },
  menu: {
    marginLeft: Constants.Sizes.Margins.Expanded * 4,
    marginRight: Constants.Sizes.Margins.Expanded * 4,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 30,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: Constants.Sizes.Margins.Regular,
    paddingLeft: Constants.Sizes.Margins.Regular,
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
    city: store.search.city,
  };
};

// Map dispatch to props
const actions = (dispatch) => {
  return {
    updateCity: (city: string) => dispatch(searchCity(city)),
    selectCity: (city: string) => dispatch(searchCity(city)),
  };
};

export default connect(select, actions)(City);
