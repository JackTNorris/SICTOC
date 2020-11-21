import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
export default class NearbyStudentTab extends React.Component {
  render() {
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.navigation.navigate('NearbyStudentInfo', {
            student: this.props.student,
          });
        }}>
        <View style={styles.nearbyStudentTab}>
          <Text>{this.props.student.info.firstName}</Text>
        </View>
      </TouchableHighlight>
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
