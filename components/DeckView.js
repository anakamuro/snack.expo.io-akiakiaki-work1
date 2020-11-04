import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { getData } from '../utils/api';

class DeckView extends React.Component {
  render() {
    const deck = this.props.route.params.entryId;
    const questions = this.props.decks[deck.title].questions;

    return (
      <View style={styles.container}>
        <Text style={styles.mainText}> {deck.title} </Text>
        <Text>{questions.length}</Text>
        <Button
          style={styles.button}
          title="Add Card"
          text={'Add Card'}
          onPress={() =>
            this.props.navigation.navigate('AddCard', {
              title: this.props.route.params.entryId.title,
            })
          }
        />
        <Button
          style={styles.button}
          title="Start Quiz"
          text={'Start Quiz'}
          onPress={() => this.props.navigation.navigate('Quiz', {entryId: this.props.route.params.entryId})}
        />
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 100,
    fontSize: 30,
  },
});

function mapStateToProps(decks) {
  return { decks };
}

export default connect(mapStateToProps)(DeckView);
