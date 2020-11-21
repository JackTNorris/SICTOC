import * as React from 'react';
import {View, Button, Text, TextInput, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {login} from '../actions/LoginActions';

class LoginForm extends React.Component {
  state = {
    studentIdField: '',
  };

  onClickLogin = async () => {
    await this.props.lgIn(this.state.studentIdField);
    if (this.props.loggedIn) {
      console.log(this.props.loggedIn);
      this.props.navigation.navigate('Main');
    }
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
          <Text>{this.props.errorMessage}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {navigation} = ownProps;
  const {errorMessage, loggedIn} = state.login;
  return {navigation, loggedIn, errorMessage};
};
export default connect(mapStateToProps, {
  lgIn: login,
})(LoginForm);

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
