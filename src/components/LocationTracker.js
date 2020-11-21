import * as React from 'react';
import Geolocation from '@react-native-community/geolocation';
import {connect} from 'react-redux';
import {
  stopUpdating,
  updateLocation,
  updateNearbyStudents,
} from '../actions/GeolocationActions';
import {PermissionsAndroid, AppState} from 'react-native';

class LocationTracker extends React.Component {
  componentDidMount() {
    AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        this.getLocUpdate();
      } else if (state === 'background') {
        this.state.updatesEnabled = false;
        Geolocation.clearWatch(this.watchId);
        Geolocation.stopObserving();
        this.props.stop('123456');
        console.log('stopped');
      } else if (state === 'inactive') {
        this.state.updatesEnabled = false;
        Geolocation.clearWatch(this.watchId);
        Geolocation.stopObserving();

        this.props.stop('123456');
        console.log('stopped');
      }
    });
  }
  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Grant Location',
          message: 'Location data needed for app',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  getLocUpdate = async () => {
    const hasLocationPermission = await this.requestLocationPermission();
    if (!hasLocationPermission) {
      return;
    }
    //let speedLimit = await this.getSpeedLimit();
    this.setState({updatesEnabled: true}, () => {
      this.watchId = Geolocation.watchPosition(
        (position) => {
          this.props.updateLoc(
            position.coords.latitude,
            position.coords.longitude,
            '123456',
          );
          this.props.updateNearbyStuds(
            position.coords.latitude,
            position.coords.longitude,
          );
          console.log(position.coords.speed);
        },
        (error) => {
          this.setState({location: error});
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 0,
          interval: 500,
          fastestInterval: 500,
        },
      );
    });
  };

  stopUpdates = () => {
    this.setState({updatesEnabled: false});
    this.setState({speed: null, speedLimit: null});
    Geolocation.clearWatch(this.watchId);

    this.setState({updatesEnabled: false});
    console.log('stoppped updates');
  };

  render() {
    return null;
  }
}

export default connect(
  (state) => {
    return {};
  },
  {
    updateLoc: updateLocation,
    updateNearbyStuds: updateNearbyStudents,
    stop: stopUpdating,
  },
)(LocationTracker);
