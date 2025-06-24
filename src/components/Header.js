import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Simple top bar header displaying a title.
 *
 * Props:
 * - title: text for the header
 * - style: optional container style
 * - textStyle: optional title style
 */
const Header = ({ title, style, textStyle }) => (
  <View style={[styles.container, style]}>
    <Text style={[styles.title, textStyle]}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;
