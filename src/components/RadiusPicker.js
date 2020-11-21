import React, {Component} from 'react';
import NumericInput from 'react-native-numeric-input';
import {View, Image, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default class NotificationRadiusPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radius: 200,
    };
  }
  async componentDidMount() {
    //for later
    /*
    try {
      let rad = await AsyncStorage.getItem('notificationDistance');
      rad ? this.setState({radius: +rad}) : rad;
    } catch (error) {
      console.log(error.message);
    }
    */
  }

  render() {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 20}}>
            You'll be able to see people within
          </Text>
          <NumericInput
            onChange={async (value) => {
              this.setState({radius: value});
              this.props.setNotificationDistance(value);
              try {
                await AsyncStorage.setItem(
                  'notificationDistance',
                  value.toString(),
                  () => console.log('Wrote new notification distance'),
                );
              } catch (error) {
                console.log(error);
              }
            }}
            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
            totalWidth={240}
            totalHeight={50}
            iconSize={25}
            step={50}
            minValue={100}
            maxValue={1000}
            valueType="real"
            initValue={this.state.radius}
            rounded
            textColor="#d92c11"
            iconStyle={{color: 'white'}}
            rightButtonBackgroundColor="#d92c11"
            leftButtonBackgroundColor="#d92c11"
          />
          <Text style={{fontSize: 20}}>feet</Text>
        </View>
        <View style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: this.state.radius ? this.state.radius / 3 : 0,
              height: this.state.radius ? this.state.radius / 3 : 0,
              borderRadius: this.state.radius ? this.state.radius / 6 : 0,
              backgroundColor: '#9bebb0',
              borderColor: 'green',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/location.png')}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{width: 25, height: 25, resizeMode: 'center'}}
            />
          </View>
        </View>
      </View>
    );
  }
}
