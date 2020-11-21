import * as React from 'react';
import {View, Text} from 'react-native';
import MessageForm from '../components/MessageForm';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {receiveMessages, sendMessage} from '../actions/ChatActions';
import MessageList from '../components/MessageList';

export default class Chat extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <MessageList />
        <MessageForm />
      </View>
    );
  }
}
