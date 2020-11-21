import * as React from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Button} from 'react-native';
import {sendMessage} from '../actions/ChatActions';
import {TextInput} from 'react-native-gesture-handler';
class MessageForm extends React.Component {
  state = {message: '', height: 60};

  onClickSend = async () => {
    await this.props.sMessage(
      this.props.chatRoomCode,
      this.props.uniqueID,
      this.state.message,
    );
    this.setState({message: ''});
  };

  render() {
    return (
      <View style={styles.messageFormContainer}>
        <TextInput
          style={styles.messageForm}
          placeholder="Enter Message Here"
          value={this.state.message}
          onChangeText={(text) => {
            this.setState({message: text});
          }}
          multiline
        />
        <View style={styles.sendButtonContainer}>
          <Button title="Send" onPress={this.onClickSend} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {chatRoomCode, uniqueID} = state.chatRoom;
  return {chatRoomCode, uniqueID};
};
export default connect(mapStateToProps, {sMessage: sendMessage})(MessageForm);

const styles = StyleSheet.create({
  messageFormContainer: {
    backgroundColor: '#ccfeff',
    minHeight: 80,
    padding: 10,
    flexDirection: 'row',
  },
  messageForm: {
    backgroundColor: 'white',
    flex: 4,
    borderRadius: 10,
    padding: 5,
  },
  sendButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
