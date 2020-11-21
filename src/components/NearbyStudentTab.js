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
          <View style={{flexDirection: 'column', flex: 1}}>
            <Text
              style={
                styles.name
              }>{`${this.props.student.info.firstName} ${this.props.student.info.lastName}`}</Text>
            <Text>{this.props.student.info.major}</Text>
          </View>
          <View
            style={{flexDirection: 'column', flex: 1, alignItems: 'flex-end'}}>
            <View
              style={{flexDirection: 'column', flex: 1, alignItems: 'center'}}>
              <Text>Year:</Text>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>
                {this.props.student.info.year}
              </Text>
            </View>
          </View>
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
    backgroundColor: '#e8e3e3',
    justifyContent: 'flex-start',
    padding: 5,
    margin: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
