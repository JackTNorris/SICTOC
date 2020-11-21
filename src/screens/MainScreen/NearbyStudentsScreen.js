import * as React from 'react';
import {ScrollView, View, Text, Button} from 'react-native';
import {connect} from 'react-redux';
import NearbyStudentTab from '../../components/NearbyStudentTab';

const student = {
  firstName: 'Jack',
  lastName: 'Norris',
  year: 'Freshman',
  major: 'Computer Science',
};
class NearbyStudentsScreen extends React.Component {
  render() {
    const nearbyStudents = [];
    for (let i = 0; i < 10; i++) {
      nearbyStudents.push(student);
    }
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          {this.props.nearbyStudents.length > 0 ? (
            this.props.nearbyStudents.map((item, i) => (
              <NearbyStudentTab
                key={i}
                student={item}
                navigation={this.props.navigation}
              />
            ))
          ) : (
            <View
              style={{
                margin: 7,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text>No One Nearby</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {nearbyStudents} = state.geolocation;
  return {nearbyStudents};
};

export default connect(mapStateToProps, {})(NearbyStudentsScreen);
