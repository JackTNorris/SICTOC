import React, {Component} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
export default class Header extends Component {
  render() {
    return (
      // eslint-disable-next-line prettier/prettier
      <View style = {styles.headerContainer}>
        <Image
          source={require('../assets/sictoc.png')}
          style={styles.headerImage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    width: Dimensions.get('screen').width,
    flexDirection: 'row',
    backgroundColor: '#adadad',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    resizeMode: 'center',
    flex: 1,
  },
});
