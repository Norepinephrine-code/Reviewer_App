import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Header title="Home" />
    <CustomButton
      title="Review"
      onPress={() => navigation.navigate('Quiz')}
      style={styles.button}
      textStyle={styles.buttonText}
    />
    <CustomButton
      title="Advice and Guidance"
      onPress={() => navigation.navigate('Advice')}
      style={styles.button}
      textStyle={styles.buttonText}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#1a1a1a',
  },
  button: {
    backgroundColor: '#6a5acd',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HomeScreen;
