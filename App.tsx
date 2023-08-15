// App.tsx
import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import HomeScreen from './src/screens/HomeScreen';
import Settings from './src/screens/Settings';
import ShoppingListScreen from './src/screens/ShoppingListScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';

import {enableScreens} from 'react-native-screens';
import ResultsShowScreen from './src/screens/ResultsShowScreen';

import Icon from 'react-native-vector-icons/FontAwesome';
enableScreens();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Create a Stack navigator for the Home screen and ResultsShow screen
const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen name="ResultsShow" component={ResultsShowScreen} />
  </Stack.Navigator>
);

const HomeTab = () => (
  <View style={{flex: 1, backgroundColor: 'red'}}>
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconComponent;

          if (route.name === 'Home') {
            iconComponent = <Icon name="home" size={30} color={color} />;
          } else if (route.name === 'ShoppingList') {
            iconComponent = (
              <Icon name="shopping-bag" size={size} color={color} />
            );
          } else if (route.name === 'Favorites') {
            iconComponent = <Icon name="star" size={30} color={color} />;
          } else if (route.name === 'Settings') {
            iconComponent = <Icon name="gear" size={30} color={color} />;
          }
          return iconComponent;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {fontSize: 13},
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="ShoppingList" component={ShoppingListScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  </View>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegistrationScreen} />
        <Stack.Screen name="HomeTab" component={HomeTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
