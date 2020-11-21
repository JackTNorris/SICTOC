/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunkMiddleWare from 'redux-thunk';
import reducers from './reducers';
import Navigator from './Navigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import LocationTracker from './components/LocationTracker';
export default class App extends React.Component {
  componentDidMount() {}
  componentWillUnmount() {
    clearInterval();
    clearTimeout();
  }
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
            <Navigator />
          </View>
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  },
});
