import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
/**
 * Reusable button component used across screens.
 *
 * Props:
 * - title: text to display inside the button
 * - onPress: callback when pressed
 * - style: optional style override for the button container
 * - textStyle: optional style override for the text
 * - disabled: when true, button cannot be pressed
 */
const CustomButton = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
}) => (
  <TouchableOpacity
    style={[styles.button, style, disabled && styles.disabledButton]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={[styles.text, textStyle, disabled && styles.disabledText]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    borderRadius: 4,
  },
  text: {
    color: '#fff',
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#fff',
  },
});

export default CustomButton;
