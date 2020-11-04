import * as React from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import { handleInitialData } from '../actions/index';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { getDecks } from '../utils/api';
import { getData } from '../utils/api';
import { orange  } from "../utils/colors";
import { removeDeck } from '../actions/index';
import { removeDeckID } from '../utils/api';

class Decks extends React.Component {
  componentDidMount() {
    getDecks().then((decks) => this.props.receiveAllDecks(decks));
  }

  handleDelete = async(deck) => {
    const { removeDeck } = this.props;

    removeDeck(deck);
    removeDeckID(deck);
  };
  render() {
    const decks = this.props.decks || getData();
    return (
      <ScrollView>
        <View style={styles.container}>
          {Object.values(decks).map((deck) => {
            return (
              <View style={styles.card}>
                <Text>{deck.title}</Text>
                <Text>{deck.questions.length}</Text>
                <Button
                  style={styles.button}
                  key={deck.title}
                  title="View Deck"
                  onPress={() =>
                    this.props.navigation.navigate('DeckView', {
                      entryId: deck,
                    })
                  }>
                </Button>
                <Button
                title="DELETE DECK"
          textStyle={{ color: orange }}
          onPress={() => this.handleDelete(deck)}
        >
          Delete Deck
        </Button>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 5,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    padding:5,
    margin: 15,
    height: 150,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.34)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function mapStateToProps(decks) {
  return { decks };
}

function mapDispatchToProps(dispatch) {
  return {
    receiveAllDecks: (decks) => dispatch(receiveDecks(decks)),
    removeDeck: (deck)=> dispatch(removeDeck(deck))
 };
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks);
