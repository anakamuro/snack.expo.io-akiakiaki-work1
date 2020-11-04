import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert, Platform } from 'react-native';
import { saveDeckTitle } from '../utils/api';
import { addDeck } from '../actions';
import { connect } from "react-redux";
import {  white, purple } from "../utils/colors";


class AddDeck extends React.Component {
  state = {
    text: '',
  };
  clear() {
    this.setState({ text: '' });
  }

  handleSubmit = async (deck) => {
    if (!this.state.text) {
      Alert.alert('Title of deck is Required', [{ text: 'OK' }], {
        cancelable: false,
      });
      return;
    } else {
      const { navigation } = this.props;
      await saveDeckTitle(this.state.text);
      this.props.dispatch(addDeck(this.state.text));
      this.clear();
      navigation.navigate('Decks')
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of the new deck?</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ text: text })}
          value={this.state.text}></TextInput>
        <Button
          title="Submit"
          text="Submit"
          onPress={this.handleSubmit}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItem: 'center',
    backgroundColor: Platform.OS === 'ios' ? white: purple
  },
  title: {
    fontSize: 30,
    color: 'gray',
    textAlign: 'center',
  },
  input: {
    width: 200,
    height: 40,
    padding: 8,
    borderWidth: 1,
    borderColor: 'blue',
    margin: 50,
    borderRadius: 5,
    color: white
  },
});

const mapDispatchToProps = dispatch => {
return {
  addDeck: (text) =>dispatch(addDeck(text))
}
}

export default connect(mapDispatchToProps)(AddDeck)
