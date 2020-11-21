import * as React from 'react';
import {View, Button, Text, TextInput, StyleSheet} from 'react-native';

export default class LoginForm extends React.Component {
  state = {
    studentIdField: '',
    errorMessage: "Sorry, you're not a student here!",
  };

  onClickLogin = async () => {
    console.log('Logged In!');
  };

  render() {
    return (
      <View style={styles.centeredContainer}>
        <View style={styles.loginFormContainer}>
          <Text>Login to Connect!{'\n'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Student ID"
            value={this.state.studentIdField}
            onChangeText={(text) => this.setState({studentIdField: text})}
          />
          <Button title="Login" onPress={this.onClickLogin} />
          <Text>{this.state.errorMessage}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: 200,
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    textAlign: 'center',
    marginBottom: 10,
  },
  loginFormContainer: {
    width: 300,
    height: 200,
    backgroundColor: '#b6f0eb',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
