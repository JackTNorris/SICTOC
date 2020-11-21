import * as React from 'react';
import {View, Text} from 'react-native';
import LoginForm from '../components/LoginForm';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <LoginForm navigation={this.props.navigation} />
      </View>
    );
  }
}
