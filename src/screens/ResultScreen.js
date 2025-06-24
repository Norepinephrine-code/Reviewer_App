import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';

const ResultScreen = ({ route, navigation }) => {
  const { correctCount = 0 } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Complete!</Text>
      <Text style={styles.summary}>You answered {correctCount} correctly.</Text>
      <CustomButton
        title="Back to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  summary: {
    fontSize: 18,
    marginBottom: 24,
  },
});

export default ResultScreen;
