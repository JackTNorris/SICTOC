import * as React from 'react';
import {ScrollView, View, Text, Button} from 'react-native';
import NearbyStudentTab from '../../components/NearbyStudentTab';

const student = {
  firstName: 'Jack',
  lastName: 'Norris',
  year: 'Freshman',
  major: 'Computer Science',
};
export default class NearbyStudentsScreen extends React.Component {
  render() {
    const nearbyStudents = [];
    for (let i = 0; i < 10; i++) {
      nearbyStudents.push(student);
    }
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <Button
            title={'test'}
            onPress={() => this.props.navigation.navigate('NearbyStudentInfo')}
          />
          {nearbyStudents.map((item, i) => (
            <NearbyStudentTab key={i} student={item} />
          ))}
        </ScrollView>
      </View>
    );
  }
}
