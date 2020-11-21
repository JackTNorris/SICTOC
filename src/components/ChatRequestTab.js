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
    yearRequest: '',
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
          yearRequest: info.year,
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
          <View style={{flexDirection: 'column', flex: 1}}>
            <Text
              style={
                styles.nameText
              }>{`${this.state.firstNameRequest} ${this.state.lastNameRequest}`}</Text>
            <Text>{this.state.majorRequest}</Text>
          </View>
          <View
            style={{flexDirection: 'column', flex: 1, alignItems: 'flex-end'}}>
            <View
              style={{flexDirection: 'column', flex: 1, alignItems: 'center'}}>
              <Text>Year:</Text>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>
                {this.state.yearRequest}
              </Text>
            </View>
          </View>
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
    backgroundColor: '#cad9cb',
    justifyContent: 'flex-start',
    padding: 5,
    margin: 5,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
