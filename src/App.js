/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';
import SettingsScreen from './screens/MainScreen/SettingsScreen';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunkMiddleWare from 'redux-thunk';
import reducers from './reducers';
import Navigator from './Navigator';
import {Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoginScreen from './screens/LoginScreen';
export default class App extends React.Component {
  componentDidMount() {}
  render() {
    const store = createStore(
      reducers,
      {},
      applyMiddleware(ReduxThunkMiddleWare),
    );
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <View style={{flex: 1}}>
            <LoginScreen />
          </View>
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  },
});
