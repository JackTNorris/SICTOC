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
          <Text>{JSON.stringify(this.props.nearbyStudents)}</Text>
          <Button
            title={'test'}
            onPress={() =>
              this.props.navigation.navigate('NearbyStudentInfo', {
                student: 'jackT',
              })
            }
          />
          {this.props.nearbyStudents.map((item, i) => (
            <NearbyStudentTab
              key={i}
              student={item.info}
              navigation={this.props.navigation}
            />
          ))}
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
