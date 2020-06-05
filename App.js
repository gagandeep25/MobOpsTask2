import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Home from './screens/home';
import Registration from './screens/register';
import SavedScreen from './screens/saved';

const App = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home Screen',
    },
  },
  Registration: {
    screen: Registration,
    navigationOptions: {
      title: 'Register User',
    },
  },
  SavedScreen: {
    screen: SavedScreen,
    navigationOptions: {
      title: 'Saved Entries',
    },
  },
});

export default createAppContainer(App);
