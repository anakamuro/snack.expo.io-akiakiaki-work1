import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getData } from '../utils/api';

class DeckView extends React.Component {
  render() {
    const deck = this.props.route.params.entryId;
    const questions = this.props.decks[deck.title].questions;
    const decks = this.props.decks;
    

    return (
      <View style={styles.container}>
        <Text style={styles.mainText}> {deck.title} </Text>
        <Text>{questions.length}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            this.props.navigation.navigate('AddCard', {
              title: this.props.route.params.entryId.title,
            })
          }>
          <Text style={styles.text}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Quiz', {entryId: this.props.route.params.entryId})}>
         <Text style={styles.text}>Start Quiz</Text>
         </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    color: "#FFFFFF",
    backgroundColor: "purple",
    padding: 10,
    fontSize: 30,
    margin: 2
  },
  text: {
    color: "white"
  }
});

function mapStateToProps(decks) {
  return { decks };
}

export default connect(mapStateToProps)(DeckView);
