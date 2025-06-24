import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

/**
 * Display a single answer choice. When results are shown it renders
 * a check or cross icon depending on correctness and selection.
 *
 * Props:
 * - text: option text
 * - onPress: callback when pressed
 * - showResult: if true, show ✅ for correct or ❌ if selected incorrectly
 * - isCorrect: whether this option is the correct answer
 * - isSelected: whether the user selected this option
 * - style: optional container style
 */
const AnswerOption = ({
  text,
  onPress,
  showResult = false,
  isCorrect = false,
  isSelected = false,
  style,
}) => {
  let icon = '';
  if (showResult) {
    if (isCorrect) icon = ' ✅';
    else if (isSelected) icon = ' ❌';
  }

  return (
    <TouchableOpacity
      style={[styles.option, style]}
      onPress={onPress}
      disabled={showResult}
    >
      <Text>
        {text}
        {icon}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default AnswerOption;
