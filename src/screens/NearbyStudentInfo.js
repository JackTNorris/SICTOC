import * as React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {createRoom, joinRoom} from '../actions/ChatRoomActions';
import styles from '../assets/styles';
class NearbyStudentInfo extends React.Component {
  state = {
    nearbyStudent: {
      info: {
        id: '',
        firstName: '',
        lastName: '',
        age: 0,
        gender: '',
        major: '',
        covidStatus: '',
        interests: [],
        classes: [],
      },
      invitedChats: [],
      location: {
        latitude: 0,
        longitude: 0,
      },
      online: false,
      radius: 200,
    },
  };
  componentDidMount() {
    this.setState({nearbyStudent: this.props.route.params.student});
  }

  startConversation = async () => {
    await this.props.cRoom(
      this.props.studentID,
      this.state.nearbyStudent.info.id,
    );
    this.props.navigation.navigate('Chat');
  };

  render() {
    return (
      <View>
        <Text
          style={
            stylesAgain.name
          }>{`${this.state.nearbyStudent.info.firstName} ${this.state.nearbyStudent.info.lastName}`}</Text>
        <Text
          style={
            styles.category
          }>{`\nGender: ${this.state.nearbyStudent.info.gender}\n`}</Text>
        <Text
          style={
            styles.category
          }>{`Major: ${this.state.nearbyStudent.info.major}\n`}</Text>
        <Text
          style={
            styles.category
          }>{`Covid Status: ${this.state.nearbyStudent.info.covidStatus}\n`}</Text>
        <Text
          style={
            styles.category
          }>{`Interests: ${this.state.nearbyStudent.info.interests.join()}\n`}</Text>
        <Text
          style={
            styles.category
          }>{`Classes: ${this.state.nearbyStudent.info.classes.join()}\n`}</Text>
        <View style={{padding: 20}}>
          <Button title={'Start Talking'} onPress={this.startConversation} />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const {navigation} = ownProps;
  const {inRoom} = state.chatRoom;
  const {studentID} = state.login;
  return {navigation, inRoom, studentID};
};
export default connect(mapStateToProps, {
  jRoom: joinRoom,
  cRoom: createRoom,
})(NearbyStudentInfo);

const stylesAgain = StyleSheet.create({
  name: {
    fontSize: 20,
    borderBottomWidth: 4,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 13,
    fontWeight: 'bold',
  },
});
