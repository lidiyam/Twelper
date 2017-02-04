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
  Dimensions,
  Image,
  Navigator,
  StyleSheet,
  View,
} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {
  setRootView,
} from 'actions';

// Imports
import StatusBar from 'StatusBarUnderlay';
import * as Constants from 'Constants';

// Screen imports
import City from './search/City';
import Attractions from './search/Attractions';

const {width, height} = Dimensions.get('window');

const NATURE_IMAGE_URL = 'https://source.unsplash.com/category/nature/';
const PEOPLE_IMAGE_URL = 'https://source.unsplash.com/category/people/';
const BUILDINGS_IMAGE_URL = 'https://source.unsplash.com/category/buildings/';
const prefetchCity = Image.prefetch(NATURE_IMAGE_URL)
const prefetchAttractions = Image.prefetch(PEOPLE_IMAGE_URL);
const prefetchResults = Image.prefetch(BUILDINGS_IMAGE_URL);

class Twelper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cityLoaded: false,
      attractionsLoaded: false,
      resultsLoaded: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.view != this.props.view) {
      const currentRoutes = this.refs.rootNavigator.getCurrentRoutes();
      for (let i = 0; i < currentRoutes.length; i++) {
        if (nextProps.view === currentRoutes[i].id) {
          this.refs.rootNavigator.popToRoute(currentRoutes[i]);
          return;
        }
      }
      this.refs.rootNavigator.push({id: nextProps.view});
    }
  }

  componentDidMount(): void {
    this.refs.rootNavigator.navigationContext.addListener('didfocus', this._handleNavigationEvent.bind(this));
    prefetchCity.then(() => this.setState({cityLoaded: true}));
    prefetchAttractions.then(() => this.setState({attractionsLoaded: true}));
    prefetchResults.then(() => this.setState({resultsLoaded: true}));
  }

  _configureScene(route): Object {
    if (route.id === 'results') {
      return {
        ...Navigator.SceneConfigs.PushFromRight,
        gestures: false,
      }
    } else {
      return Navigator.SceneConfigs.PushFromRight;
    }
  }

  /**
   * Handles navigation events.
   *
   * @param {any} event the event taking place
   */
  _handleNavigationEvent(): void {
    const currentRoutes = this.refs.rootNavigator.getCurrentRoutes();
    this.props.setRootView(currentRoutes[currentRoutes.length - 1].id);
  }

  _renderScene(route, navigator) {
    switch (route.id) {
      case 'city':
        return (
          <View style={styles.container}>
            {this.state.cityLoaded
            ? <Image
                source={{uri: NATURE_IMAGE_URL}}
                style={styles.backgroundImage} />
            : null
            }
            <City />
          </View>
        );
      case 'attractions':
        return (
          <View style={styles.container}>
            {this.state.attractionsLoaded
            ? <Image
                source={{uri: PEOPLE_IMAGE_URL}}
                style={styles.backgroundImage} />
            : null
            }
            <Attractions />
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
        <Navigator
            configureScene={this._configureScene}
            initialRoute={{id: 'city'}}
            ref='rootNavigator'
            renderScene={this._renderScene.bind(this)}
            style={styles.container} />
        <StatusBar />
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
})

// Map state to props
const select = (store) => {
  return {
    view: store.navigation.rootView,
  };
}

// Map dispatch to props
const actions = (dispatch) => {
  return {
    setRootView: (view: string) => dispatch(setRootView(view)),
  };
};

export default connect(select, actions)(Twelper);
