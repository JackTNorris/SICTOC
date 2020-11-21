import * as React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ProfileForm from '../../components/ProfileForm';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <ProfileForm />
        </ScrollView>
      </View>
    );
  }
}
