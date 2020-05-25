/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from "react-redux";
import { init } from "@rematch/core";
import RootNavigator from './src/common/router';
import {news} from "./src/common/models"

const models = {
  news,
}

const store = init({
  models,
}) 

export default class App extends React.Component{

  render(){
  return (
    <Provider store={store}>
      <NavigationContainer>
    <RootNavigator />
    </NavigationContainer>
  </Provider>
  )}
};



