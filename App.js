// see README for folder structure
import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { PlanProvider } from './src/contexts/PlanContext';
import { QuizProvider } from './src/contexts/QuizContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => (
  <AuthProvider>
    <PlanProvider>
      <QuizProvider>
        <AppNavigator />
      </QuizProvider>
    </PlanProvider>
  </AuthProvider>
);

export default App;
