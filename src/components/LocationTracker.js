import * as React from 'react';
import Geolocation from '@react-native-community/geolocation';
import {connect} from 'react-redux';
import {
  stopUpdating,
  updatedRadius,
  updateLocation,
  updateNearbyStudents,
} from '../actions/GeolocationActions';
import {PermissionsAndroid, AppState} from 'react-native';

class LocationTracker extends React.Component {
  state = {updatesEnabled: false};
  componentDidMount() {
    this.props.setRad(this.props.studentID, 200);
    AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        this.getLocUpdate();
        console.log('ready');
      } else if (state === 'background') {
        this.setState({updatesEnabled: false});
        Geolocation.clearWatch(this.watchId);
        clearTimeout();
        clearInterval();
        Geolocation.stopObserving();
        this.props.stop(this.props.studentID);
        console.log('stopped');
      } else if (state === 'inactive') {
        this.setState({updatesEnabled: false});
        Geolocation.clearWatch(this.watchId);
        Geolocation.stopObserving();
        clearTimeout();
        clearInterval();
        this.props.stop(this.props.studentID);
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
            this.props.studentID,
          );
          this.props.updateNearbyStuds(
            position.coords.latitude,
            position.coords.longitude,
            this.props.radius,
            this.props.studentID,
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
          interval: 1000,
          fastestInterval: 1000,
        },
      );
    });
  };

  render() {
    return null;
  }
}

const mapStateToProps = (state) => {
  const {radius} = state.geolocation;
  const {studentID} = state.login;
  return {radius, studentID};
};

export default connect(mapStateToProps, {
  updateLoc: updateLocation,
  updateNearbyStuds: updateNearbyStudents,
  stop: stopUpdating,
  setRad: updatedRadius,
})(LocationTracker);
