/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';
import SettingsScreen from './screens/SettingsScreen';

export default class App extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <View style={{flex: 1}}>
        <SettingsScreen />
      </View>
    );
  }
}
