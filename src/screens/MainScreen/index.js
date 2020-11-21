import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NearbyStudentsScreen from './NearbyStudentsScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default class MainScreen extends React.Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Nearby"
        tabBarOptions={{activeTintColor: '#e91e63'}}>
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({color, size}) => {
              let IconComponent = Ionicons;
              // You can return any component that you like here!
              return (
                <IconComponent name={'settings'} size={25} color={color} />
              );
            },
            tabBarOptions: {
              activeTintColor: 'red',
              inactiveTintColor: 'gray',
            },
          }}
        />
        <Tab.Screen
          name="Nearby"
          component={NearbyStudentsScreen}
          options={{
            tabBarIcon: ({color, size}) => {
              let IconComponent = Ionicons;
              // You can return any component that you like here!
              return <IconComponent name={'man'} size={25} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({color, size}) => {
              let IconComponent = Ionicons;
              // You can return any component that you like here!
              return <IconComponent name={'list'} size={25} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    );
  }
}
