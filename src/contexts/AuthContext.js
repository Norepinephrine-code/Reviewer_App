import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { registerDeviceForPushNotifications } from '../services/notificationService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    GoogleSignin.configure();
    const unsubscribe = auth().onAuthStateChanged((usr) => {
      console.log('[AuthContext] Auth state changed:', usr ? usr.uid : null);
      setUser(usr);
    });
    return unsubscribe;
  }, []);

  // Register for push notifications whenever a user is authenticated
  useEffect(() => {
    if (user) {
      registerDeviceForPushNotifications(user.uid);
    }
  }, [user]);

  const signUp = async (email, password) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      console.log('[AuthContext] User signed up:', auth().currentUser?.uid);
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  const signIn = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      console.log('[AuthContext] User signed in:', auth().currentUser?.uid);
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut();
      console.log('[AuthContext] User signed out');
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(credential);
      console.log('[AuthContext] User signed in with Google:', auth().currentUser?.uid);
    } catch (error) {
      console.error('Error during Google sign in:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};
