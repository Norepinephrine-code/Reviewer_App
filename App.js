// see README for folder structure
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import { PlanProvider } from './src/contexts/PlanContext';
import { QuizProvider } from './src/contexts/QuizContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => (
  <AuthProvider>
    <PlanProvider>
      <QuizProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </QuizProvider>
    </PlanProvider>
  </AuthProvider>
);

export default App;
