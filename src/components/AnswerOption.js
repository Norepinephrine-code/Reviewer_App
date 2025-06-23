import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AnswerOption = ({ option, onSelect }) => (
  <TouchableOpacity style={styles.option} onPress={() => onSelect(option)}>
    <Text>{option}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default AnswerOption;
