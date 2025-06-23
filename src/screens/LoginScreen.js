import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import { AuthContext } from '../contexts/AuthContext';

const LoginScreen = () => {
  const { signIn, signUp, signInWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    setError('');
    try {
      await signIn(email, password);
    } catch (e) {
      setError('Failed to sign in.');
    }
  };

  const handleSignUp = async () => {
    setError('');
    try {
      await signUp(email, password);
    } catch (e) {
      setError('Failed to sign up.');
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signInWithGoogle();
    } catch (e) {
      setError('Google sign in failed.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.buttonGroup}>
        <CustomButton title="Sign In" onPress={handleSignIn} />
      </View>
      <View style={styles.buttonGroup}>
        <CustomButton title="Sign Up" onPress={handleSignUp} />
      </View>
      <View style={styles.buttonGroup}>
        <CustomButton title="Sign In with Google" onPress={handleGoogleSignIn} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 12,
  },
  buttonGroup: {
    marginBottom: 12,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 12,
  },
});

export default LoginScreen;
