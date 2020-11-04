import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert, Platform } from 'react-native';
import { addCardToDeck } from '../utils/api';
import { addCard } from '../actions';
import { connect } from 'react-redux';
import {  white, orange } from "../utils/colors";

const INITIAL_STATE = {
  question: '',
  answer: '',
  correctAnswer: '',
};
class AddCard extends React.Component {
  state = INITIAL_STATE;

  clear() {
    this.setState(INITIAL_STATE);
  }

  handleSubmit = async () => {
    const { title } = this.props.route.params;
    const { question, answer, correctAnswer } = this.state;

    if (question === '' || answer === '' || correctAnswer === '') {
      Alert.alert(
        'Question and Answer and Correct Answer Required',
        'Please provide a question and an answer and an correct answer.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
    } else {
      const { navigation } = this.props;
      await addCardToDeck(title, this.state);
      this.props.dispatch(addCard(title, this.state));
      this.clear();
      navigation.goBack();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the question?</Text>
        <TextInput
          style={styles.input}
          value={this.state.question}
          onChangeText={(question) => this.setState({ question })}></TextInput>
        <Text style={styles.title}>What is the answer?</Text>
        <TextInput
          style={styles.input}
          value={this.state.answer}
          onChangeText={(answer) => this.setState({ answer })}></TextInput>
        <Text style={styles.title}>Is that true or false?</Text>
        <TextInput
          style={styles.input}
          onChangeText={(correctAnswer) => this.setState({ correctAnswer })}
          value={this.state.correctAnswer}></TextInput>
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
    backgroundColor: Platform.OS === 'ios' ? white: orange,
  },
  title: {
    fontSize: 30,
    color: 'white',
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
  addCard: (title, question, answer, correctAnswer) =>dispatch(addCard(title, question, answer, correctAnswer))
}
}
export default connect(mapDispatchToProps)(AddCard)

