import * as React from 'react';
import {connect} from 'react-redux';
import {
  sendMessage,
  receiveMessages,
  clearMessages,
} from '../actions/ChatActions';
import {StyleSheet, View, Dimensions} from 'react-native';
import {destroyRoom} from '../actions/ChatRoomActions';
import MessageItem from './MessageItem';
import {ScrollView} from 'react-native-gesture-handler';

class MessageList extends React.Component {
  componentDidMount = () => {
    console.log(this.props.chatRoomCode);
    this.props.rMessages(this.props.chatRoomCode);
  };
  render() {
    return (
      <View style={styles.messageListContainer}>
        <ScrollView>
          {this.props.messages.map((item, index) => (
            <View
              style={
                this.props.uniqueID === item.sender
                  ? styles.messageItemContainerRight
                  : styles.messageItemContainerLeft
              }>
              <MessageItem
                message={item.message}
                fromHere={this.props.uniqueID === item.sender}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  componentWillUnmount = () => {
    this.props.dRoom(this.props.chatRoomCode);
    this.props.cMessages();
  };
}

const styles = StyleSheet.create({
  messageListContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageItemContainerRight: {
    padding: 20,
    paddingLeft: 40,
    width: Dimensions.get('screen').width,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  messageItemContainerLeft: {
    padding: 20,
    paddingRight: 40,
    width: Dimensions.get('screen').width,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

const mapStateToProps = (state) => {
  const {chatRoomCode, uniqueID} = state.chatRoom;
  const {messages} = state.chat;
  return {chatRoomCode, messages, uniqueID};
};

export default connect(mapStateToProps, {
  sMessage: sendMessage,
  rMessages: receiveMessages,
  dRoom: destroyRoom,
  cMessages: clearMessages,
})(MessageList);
