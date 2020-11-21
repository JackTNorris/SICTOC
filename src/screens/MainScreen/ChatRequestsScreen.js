import * as React from 'react';
import {View, ScrollView, Text} from 'react-native';
import {connect} from 'react-redux';
import {joinRoom} from '../../actions/ChatRoomActions';
import ChatRequestTab from '../../components/ChatRequestTab';
import firebase from '../../config/firebase';
const db = firebase.database();
class ChatRequestsScreen extends React.Component {
  state = {
    invitedChats: [],
  };
  componentDidMount() {
    db.ref(`/users/${this.props.studentID}/invitedChats`).on(
      'value',
      (snapshot) => {
        this.setState({invitedChats: []});
        snapshot.forEach((item) => {
          db.ref('/chat')
            .once('value')
            .then((snapshot) => {
              if (snapshot.hasChild(item.val().roomCode)) {
              } else {
                this.setState({
                  invitedChats: [...this.state.invitedChats, item.val()],
                });
              }
            });
        });
      },
    );
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          {this.state.invitedChats.length > 0 ? (
            this.state.invitedChats.map((item, i) => (
              <ChatRequestTab
                key={i}
                request={item}
                navigation={this.props.navigation}
              />
            ))
          ) : (
            <View
              style={{
                margin: 7,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text>No Requests</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {studentID} = state.login;
  return {studentID};
};

export default connect(mapStateToProps, {})(ChatRequestsScreen);
