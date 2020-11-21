import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
export default class MessageItem extends React.Component {
  render() {
    return (
      <View
        style={
          this.props.fromHere
            ? styles.messageFromHereContainer
            : styles.messageFromThereContainer
        }>
        <Text>{this.props.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageFromHereContainer: {
    //this is a message sent by THIS user
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#6df2a7',
  },
  messageFromThereContainer: {
    //this is a message received remotely
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#f0f069',
  },
  messageText: {
    color: 'black',
  },
});
