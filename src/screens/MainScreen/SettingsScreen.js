import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import RadiusPicker from '../../components/RadiusPicker';
import styles from '../../assets/styles';
export default class SettingsScreen extends Component {
  stuff() {}
  render() {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={styles.settingsScreenContainer}>
        <RadiusPicker setNotificationDistance={this.stuff} />
      </View>
    );
  }
}
//     replace stuff with this =>       this.props.screenProps.setNotificationDistance
