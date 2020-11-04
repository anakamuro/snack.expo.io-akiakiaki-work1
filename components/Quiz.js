import * as React from 'react';
import { Text, View, StyleSheet, TextInput , Button, Platform} from 'react-native';
import { ToggleButton } from "./ToggleButton";
import {  white, purple, red, green, blue, gold, gray } from "../utils/colors";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";


 class Quiz extends React.Component{
    state = {
      score: 0, 
      currentQuestionIndex: 0,
      showQuestion: false,
      correct: 0,
      incorrect: 0
  }

  handleToggleQuestionAnswer = () =>{
    this.setState((prevState) => ({
    showQuestion: !prevState.showQuestion
  }))
}

  submitAnswer = answer => {
    const { currentQuestionIndex } = this.state;
    const deck = this.props.route.params.entryId;
    const decks = this.props.decks;
    const correct = decks[deck.title].questions[
      currentQuestionIndex
    ].correctAnswer.toLowerCase();

    if (answer.trim() === correct.trim()) {
      this.setState({ correct: this.state.correct + 1, score: this.state.score + 1 });
    } else {
      this.setState({ incorrect: this.state.incorrect + 1, score: this.state.score});
    }
    this.setState({
      currentQuestionIndex: this.state.currentQuestionIndex + 1,
      showQuestion: false
    });
  };

  resetQuiz = () => {
    this.setState({
      currentQuestionIndex: 0,
      showQuestion: false,
      correct: 0,
      incorrect: 0,
      score: 0
    });
  };

  goBack = () => {
    this.props.navigation.navigate('DeckView')
  };
  
  render(){
    const currentQuestionIndex = this.state.currentQuestionIndex;
    const decks = this.props.decks;
    const deck = this.props.route.params.entryId;
    const number = currentQuestionIndex + 1;
   if(currentQuestionIndex === decks[deck.title].questions.length){
    return(
       <View style={styles.container}>
          <View style={styles.card}>
          <Text style={styles.mainText}>
          You got {this.state.correct} out of {decks[deck.title].questions.length}!</Text>
          
           {this.state.correct == decks[deck.title].questions.length ? 
          <Text style={{ fontSize: 90,  color: gold}}>Perfect</Text>
          : ((this.state.correct > this.state.incorrect) &&(this.state.correct < 
          decks[deck.title].questions.length)) ? 
          <Text style={{ fontSize: 90, color: green }}>Happy</Text>
          : 
          <Text style={{ fontSize: 90, color: gray }}>Cry</Text>
          }
              <View>
              <Button
                title="Reset Quiz"
                styles={styles}
                text={"Try again"}
                color={red}
                onPress={this.resetQuiz}
              />
              <Button
                title="Back"
                styles={styles}
                text={"Back"}
                color={green}
                onPress={this.goBack}
              />
            </View>
          </View>
        </View>
    )
    }
    return(
     <View style={styles.container}>
     <View style={styles.card}>
      <Text style={styles.questions}>
            {number}/{decks[deck.title].questions.length}
          </Text>
          {!this.state.showQuestion ? 
      <Text style={styles.mainText}>{decks[deck.title].questions[currentQuestionIndex].question}</Text>
           :  <Text style={styles.mainText}>
              {decks[deck.title].questions[currentQuestionIndex].answer}
            </Text>}

   
          {!this.state.showQuestion ? (
            <ToggleButton
              style={styles.answer}
              text={"Show Answer"}
              onPress={this.handleToggleQuestionAnswer}
            />
          ) : (
            <ToggleButton
              style={styles.answer}
              text={"Show Question"}
              onPress={this.handleToggleQuestionAnswer}
            />
          )}
       
         <View>
         <Button
            title="CORRECT"
            color={green}
            styles={styles.button}
            text={"correct"}
            onPress={() => this.submitAnswer("true")}
          />
          <Button
            title="INCORRECT"
            color={red}
            styles={styles.button}
            text={"incorrect"}
            onPress={() => this.submitAnswer("false")}
          />
          </View>
     </View>
     </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    padding: 10,
    borderRadius: Platform.OS === 'ios' ? 8 : 2,
    height: 40,
    margin: 5,
    width: 140
  },
  questions: {
    top: 0,
    alignSelf: "flex-start",
    left: 0,
    color: white,
    fontSize: 20,
    margin: 5,
    position: "absolute"
  },
  answer: {
    color: white,
    fontSize: 20,
    margin: 20
  },
  card: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    margin: 8,
    backgroundColor: blue,
    alignSelf: "stretch",
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.34)",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 4,
    shadowOpacity: 1
  },
  mainText: {
    fontSize: 40,
    color: white,
    marginTop: 40,
    textAlign: "center"
  }
})

function mapStateToProps(decks) {
  return {
    decks
  };
}
 export default connect(mapStateToProps)(Quiz);
