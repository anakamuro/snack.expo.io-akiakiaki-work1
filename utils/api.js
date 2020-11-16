import  AsyncStorage  from '@react-native-community/async-storage';

const DECKS_STORAGE_KEY = "flashcards: decks";

const initialData = {
  Geography: {
    title: "Geography",
    questions: [
      {
        question: "Is Japan one of Asian countries?",
        answer: "Yes, it is.",
        correctAnswer: "true"
      },
      {
        question: "Is New York the part of New England?",
        answer: "No, New York is not the part of New England",
        correctAnswer: "false"
      }
    ]
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "what is a scope?",
        answer:
          "the current context, which determines the accessibilty of variables to JavaScript",
        correctAnswer: "true"
      },
      {
        question: "What is objects in JavaScripts?",
        answer:
          "An unordered collection of related data in the form of key: value pairs",
        correctAnswer: "true"
      }
    ]
  }
};

export const getData = () => {
  return initialData
};

export function getDecks(deck) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then(results => {
    if (results === null) {
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(initialData));
      return initialData;
    } else {
      return JSON.parse(results);
    }
  });
}

export async function getDeck(deck) {
  try {
    const Results = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

    return JSON.parse(Results)[deck];
  } catch (err) {
    console.log(err);
  }
}

export async function saveDeckTitle(title) {
  try {
    await AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          title,
          questions: []
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
}

export async function addCardToDeck(title, newCardData) {
  try {
    const deck = await getDeck(title);

    await AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          questions: [...deck.questions].concat(newCardData)
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
}

export async function removeDeckID(deck) {
  try {
    const results = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    const data = JSON.parse(results);
    data[deck.title] = undefined;
    delete data[deck.title];
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
}
