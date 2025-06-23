import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import ResultScreen from '../screens/ResultScreen';
import MockExamScreen from '../screens/MockExamScreen';
import AdviceScreen from '../screens/AdviceScreen';

const Stack = createStackNavigator(
  {
    Login: LoginScreen,
    Home: HomeScreen,
    Quiz: QuizScreen,
    Result: ResultScreen,
    MockExam: MockExamScreen,
    Advice: AdviceScreen,
  },
  {
    initialRouteName: 'Login',
  }
);

export default createAppContainer(Stack);
