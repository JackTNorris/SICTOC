import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import ChatScreen from './screens/ChatScreen';
import MainScreen from './screens/MainScreen';
import NearbyStudentInfo from './screens/NearbyStudentInfo';

const Stack = createStackNavigator();
export default class Navigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen
            name="NearbyStudentInfo"
            component={NearbyStudentInfo}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
