import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import AddDeck from "./components/AddDeck";
import Quiz from "./components/Quiz";
import Decks from "./components/Decks";
import DeckView from "./components/DeckView";
import AddCard from "./components/AddCard";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import { createStore} from 'redux';
import { setLocalNotification } from "./utils/helpers";

const store = createStore(
  reducer);


const AppTabs = () =>{
  return (
    <Tab.Navigator>
    <Tab.Screen name="Decks" 
    component={Decks}/>
     <Tab.Screen name="AddDeck" component={AddDeck}/>
    </Tab.Navigator>
  )
}

const AppStack = () =>{
  return (
    <Stack.Navigator initialRouteName="AppTabs" >
    <Stack.Screen name="AppTabs" component={AppTabs}/>
    <Stack.Screen name="Quiz" component={Quiz}/>
      <Stack.Screen name="DeckView" component={DeckView}/>
      <Stack.Screen name="AddCard" component={AddCard}/>
      <Stack.Screen name="AddDeck" component={AddDeck}/>
      <Stack.Screen name="Decks" component={Decks}/>
    </Stack.Navigator>
  )
}
export default class App extends React.Component {
   componentDidMount() {
    setLocalNotification();
  }
  render(){
  return (
    <Provider store={store}>
    <NavigationContainer>
    <AppStack/>
    </NavigationContainer>
    </Provider>
);
}
}

