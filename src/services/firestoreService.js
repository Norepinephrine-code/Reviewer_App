import firestore from '@react-native-firebase/firestore';

// Collection references
const usersCollection = firestore().collection('users');
const questionsCollection = firestore().collection('questions');
const paymentsCollection = firestore().collection('payments');
const guidanceModulesCollection = firestore().collection('guidanceModules');

// ----- Users -----
export const createUserProfile = async (userId, email, name) => {
  try {
    const createdAt = firestore.FieldValue.serverTimestamp();
    await usersCollection.doc(userId).set({
      userId,
      email,
      name,
      planStatus: 'basic',
      createdAt,
    });
  } catch (error) {
    console.log('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const doc = await usersCollection.doc(userId).get();
    return doc.exists ? doc.data() : null;
  } catch (error) {
    console.log('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserPlanStatus = async (userId, planStatus) => {
  try {
    await usersCollection.doc(userId).update({ planStatus });
  } catch (error) {
    console.log('Error updating user plan status:', error);
    throw error;
  }
};

// Update or store the FCM token for a user so push notifications can be sent
export const updateUserFcmToken = async (userId, fcmToken) => {
  try {
    await usersCollection.doc(userId).update({ fcmToken });
  } catch (error) {
    console.log('Error updating FCM token:', error);
    throw error;
  }
};

// ----- Questions -----
export const getQuestionsBySubjectAndSubtopic = async (subject, subtopic) => {
  try {
    const snapshot = await questionsCollection
      .where('subject', '==', subject)
      .where('subtopic', '==', subtopic)
      .get();
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.log('Error fetching questions by subject and subtopic:', error);
    throw error;
  }
};

export const getMockExamQuestionsSet = async (setNumber) => {
  try {
    const snapshot = await questionsCollection
      .where('mockSet', '==', setNumber)
      .get();
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.log('Error fetching mock exam questions:', error);
    throw error;
  }
};

// ----- Payments -----
export const createPaymentRecord = async (
  userId,
  purchaseId,
  platform,
  amount,
  status,
) => {
  try {
    const purchaseTime = firestore.FieldValue.serverTimestamp();
    await paymentsCollection.add({
      userId,
      purchaseId,
      planStatus: 'premium',
      purchaseTime,
      platform,
      amount,
      status,
    });
  } catch (error) {
    console.log('Error creating payment record:', error);
    throw error;
  }
};

export const getPaymentRecord = async (userId) => {
  try {
    const snapshot = await paymentsCollection
      .where('userId', '==', userId)
      .get();
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.log('Error fetching payment record:', error);
    throw error;
  }
};

// ----- Guidance Modules -----
export const getAllGuidanceModules = async () => {
  try {
    const snapshot = await guidanceModulesCollection.orderBy('moduleId').get();
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.log('Error fetching guidance modules:', error);
    throw error;
  }
};

