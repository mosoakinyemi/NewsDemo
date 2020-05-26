import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import ViewNews from '../screens/ViewNews';
import {colors} from './constants';
ViewNews;

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: 'News App'}}
      />
      <Stack.Screen
        name="ViewNews"
        component={ViewNews}
        options={{title: 'View News'}}
      />
    </Stack.Navigator>
  );
}

export default RootNavigator;
