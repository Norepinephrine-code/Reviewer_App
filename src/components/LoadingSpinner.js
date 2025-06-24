import React from 'react';
import { ActivityIndicator } from 'react-native';

/**
 * Simple activity indicator for loading states.
 *
 * Props:
 * - size: indicator size (default 'large')
 * - color: indicator color (default '#2196F3')
 */
const LoadingSpinner = ({ size = 'large', color = '#2196F3' }) => (
  <ActivityIndicator size={size} color={color} />
);

export default LoadingSpinner;
