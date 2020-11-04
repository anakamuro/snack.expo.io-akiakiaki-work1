import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD_TO_DECK,
  REMOVE_DECK
} from '../actions/index';



export default function deck(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS: {
      return {
        ...state,
        ...action.decks
      };
  }
    case ADD_DECK: {
      const newDeck = {
        [action.deck]: {
          title: action.deck,
          questions: [],
        },
      };
      return {
        ...state,
        ...newDeck
      }
    }
      case REMOVE_DECK: {
      const { title } = action.deck;
      const { [title]: value, ...remainingDecks } = state;
      return remainingDecks;
      }
 case ADD_CARD_TO_DECK: {
      const { question, answer, correctAnswer, deck } = action.card
      return {
        ...state,
        [deck]: {
          ...state[deck],
          questions: [
            ...state[deck].questions,
            { question, answer, correctAnswer }
          ]
        }
      }
 }
    default:
      return state;
  }
}
