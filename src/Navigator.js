import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import ChatScreen from './screens/ChatScreen';
import MainScreen from './screens/MainScreen';
import NearbyStudentInfo from './screens/NearbyStudentInfo';
import {connect} from 'react-redux';
import {checkLoginPersistence} from './actions/LoginActions';
import {View} from 'react-native';
import LocationTracker from './components/LocationTracker';

const Stack = createStackNavigator();
class Navigator extends React.Component {
  state = {
    isLoggedIn: false,
    checkedPersistence: false,
  };
  async componentDidMount() {
    await this.props.checkLogin();
    this.setState({
      checkedPersistence: true,
    });
  }

  render() {
    if (this.state.checkedPersistence) {
      return (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={this.props.loggedIn ? 'Main' : 'Login'}
            headerMode="none">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen
              name="NearbyStudentInfo"
              component={NearbyStudentInfo}
            />
          </Stack.Navigator>
          {this.props.loggedIn ? <LocationTracker /> : null}
        </NavigationContainer>
      );
    } else {
      return <View />;
    }
  }
}

const mapStateToProps = (state) => {
  const {studentID, loggedIn} = state.login;
  return {studentID, loggedIn};
};

export default connect(mapStateToProps, {
  checkLogin: checkLoginPersistence,
})(Navigator);
