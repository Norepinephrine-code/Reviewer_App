// Firestore database helper functions
import firestore from '@react-native-firebase/firestore';

export const fetchQuestions = async () => {
  // fetch questions from Firestore
};

export const subscribeToUserPlan = (userId, callback) => {
  if (!userId) {
    return () => {};
  }
  return firestore()
    .collection('payments')
    .doc(userId)
    .onSnapshot(doc => {
      const data = doc.data();
      const plan = data?.plan === 'premium' && data?.active ? 'premium' : 'basic';
      callback(plan);
    });
};
