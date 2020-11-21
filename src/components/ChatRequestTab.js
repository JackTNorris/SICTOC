import * as React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TouchableHighlightBase,
} from 'react-native';
import {connect} from 'react-redux';
import {joinRoom} from '../actions/ChatRoomActions';
import firebase from '../config/firebase';
const db = firebase.database();
class ChatRequestTab extends React.Component {
  state = {
    firstNameRequest: '',
    lastNameRequest: '',
    majorRequest: '',
  };
  async componentDidMount() {
    await db
      .ref(`/users/${this.props.request.requestID}/info`)
      .once('value')
      .then((snapshot) => {
        let info = snapshot.val();
        this.setState({
          firstNameRequest: info.firstName,
          lastNameRequest: info.lastName,
          majorRequest: info.major,
        });
      });
  }

  onClickToJoin = async () => {
    await this.props.jRoom(this.props.request.roomCode);
    if (this.props.inRoom) {
      this.props.navigation.navigate('Chat');
    }
  };

  render() {
    return (
      <TouchableHighlight onPress={this.onClickToJoin}>
        <View style={styles.chatRequestTab}>
          <Text>{`${this.state.firstNameRequest} ${this.state.lastNameRequest}`}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {navigation} = ownProps;
  const {inRoom} = state.chatRoom;
  return {navigation, inRoom};
};

export default connect(mapStateToProps, {
  jRoom: joinRoom,
})(ChatRequestTab);

const styles = StyleSheet.create({
  chatRequestTab: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#bef58e',
    justifyContent: 'flex-start',
    margin: 5,
  },
  nameText: {
    fontSize: 25,
  },
});
