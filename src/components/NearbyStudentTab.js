import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
export default class NearbyStudentTab extends React.Component {
  render() {
    return (
      <View style={styles.nearbyStudentTab}>
        <Text>{this.props.student.firstName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nearbyStudentTab: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#bef58e',
    justifyContent: 'center',
    margin: 5,
  },
});
