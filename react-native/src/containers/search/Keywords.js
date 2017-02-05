/**
 *
 * @license Copyright (C) 2017 Twelper
 * @created 2017-02-04
 * @file Keywords.js
 * @description Allow the user to select a number of keywords to specify destinations
 *
 * @flow
 */
'use strict';

// React imports
import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {
  addKeyword,
  removeKeyword,
  setRootView,
} from 'actions';

// Imports
import ActionButton from 'react-native-action-button';
import Chip from 'Chip';
import IconButton from 'IconButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Constants from 'Constants';

class Keywords extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
  }

  _onAdd() {
    if (this.state.keyword != null && this.state.keyword.length > 0 && this.props.keywords.indexOf(this.state.keyword) < 0) {
      this.props.addKeyword(this.state.keyword);
      this.setState({keyword: ''});
    }
  }

  _onRemove(keyword) {
    if (this.props.keywords.length === 1) {
      Alert.alert(
        'Must have at least 1 keyword',
        'You cannot delete your final keyword because you must have at least one.',
        [{text: 'OK'}]);
    } else {
      this.props.removeKeyword(keyword);
    }
  }

  _onDone() {
    this.props.saveKeywords();
  }

  render(): ReactElement < any > {
    return (
      <View style={styles.container}>
        <View style={styles.menu}>
          <Text style={styles.subtitle}>{'pick your'}</Text>
          <Text style={styles.title}>{'KEYWORDS'}</Text>
          <View style={styles.inputContainer}>
            <TextInput
                autoCapitalize={'none'}
                autoCorrect={false}
                returnKeyType={'done'}
                selectTextOnFocus={true}
                style={styles.input}
                value={this.state.keyword}
                onChangeText={(value) => this.setState({keyword: value.toLowerCase()})}
                onSubmitEditing={this._onAdd.bind(this)} />
            <IconButton
              renderIcon={() => (
                <MaterialIcons
                    name={'add'}
                    size={Constants.Sizes.Text.Title - 1}
                    color={Constants.Colors.secondaryDarkText} />
              )}
              onClick={this._onAdd.bind(this)} />
          </View>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {this.props.keywords.map((keyword) => (
              <Chip
                  key={keyword}
                  text={keyword}
                  onClickAction={() => this._onRemove(keyword)} />
            ))}
          </ScrollView>
        </View>
        <ActionButton
            buttonColor={Constants.Colors.secondary}
            icon={
              <MaterialIcons
                  name={'done'}
                  color={Constants.Colors.secondaryDarkText}
                  size={Constants.Sizes.Text.Title} />
            }
            onPress={this._onDone.bind(this)} />
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
  scrollView: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 400,
    overflow: 'hidden',
  },
});

// Map state to props
const select = (store) => {
  return {
    keywords: store.search.keywords,
  };
};

// Map dispatch to props
const actions = (dispatch) => {
  return {
    addKeyword: (keyword: string) => dispatch(addKeyword(keyword)),
    removeKeyword: (keyword: string) => dispatch(removeKeyword(keyword)),
    saveKeywords: () => dispatch(setRootView('results')),
  };
};

export default connect(select, actions)(Keywords);
