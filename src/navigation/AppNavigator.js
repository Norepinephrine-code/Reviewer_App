import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../contexts/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import MockExamScreen from '../screens/MockExamScreen';
import ResultScreen from '../screens/ResultScreen';
import AdviceScreen from '../screens/AdviceScreen';

const Stack = createStackNavigator();

const linking = {
  prefixes: ['reviewersph://'],
  config: {
    screens: {
      Login: 'login',
      Home: 'home',
      Quiz: 'quiz',
      MockExam: 'mock-exam',
      Result: 'result',
      Advice: 'advice',
    },
  },
};

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Quiz" component={QuizScreen} />
    <Stack.Screen name="MockExam" component={MockExamScreen} />
    <Stack.Screen name="Result" component={ResultScreen} />
    <Stack.Screen name="Advice" component={AdviceScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer linking={linking}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
