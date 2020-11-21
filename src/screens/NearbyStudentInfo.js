import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {connect} from 'react-redux';
import {createRoom, joinRoom} from '../actions/ChatRoomActions';
class NearbyStudentInfo extends React.Component {
  state = {
    nearbyStudent: {},
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
        <Text>{JSON.stringify(this.state.nearbyStudent)}</Text>
        <Text>Hello</Text>
        <Button title={'Start Talking'} onPress={this.startConversation} />
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
//);
