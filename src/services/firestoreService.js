import firestore from '@react-native-firebase/firestore';

// Collection references
const usersCollection = firestore().collection('users');
const questionsCollection = firestore().collection('questions');
const paymentsCollection = firestore().collection('payments');
const guidanceModulesCollection = firestore().collection('guidanceModules');

// ----- Users -----
export const createUserProfile = async (userId, email, name) => {
  try {
    console.log('[FirestoreService] Creating user profile for:', userId);
    const createdAt = firestore.FieldValue.serverTimestamp();
    await usersCollection.doc(userId).set({
      userId,
      email,
      name,
      planStatus: 'basic',
      createdAt,
    });
  } catch (error) {
    console.log('[FirestoreService] Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    console.log('[FirestoreService] Fetching user profile for:', userId);
    const doc = await usersCollection.doc(userId).get();
    return doc.exists ? doc.data() : null;
  } catch (error) {
    console.log('[FirestoreService] Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserPlanStatus = async (userId, planStatus) => {
  try {
    console.log('[FirestoreService] Updating plan status for:', userId, planStatus);
    await usersCollection.doc(userId).update({ planStatus });
  } catch (error) {
    console.log('[FirestoreService] Error updating user plan status:', error);
    throw error;
  }
};

// Update or store the FCM token for a user so push notifications can be sent
export const updateUserFcmToken = async (userId, fcmToken) => {
  try {
    console.log('[FirestoreService] Updating FCM token for:', userId);
    await usersCollection.doc(userId).update({ fcmToken });
  } catch (error) {
    console.log('[FirestoreService] Error updating FCM token:', error);
    throw error;
  }
};

// ----- Questions -----
export const getQuestionsBySubjectAndSubtopic = async (subject, subtopic) => {
  try {
    console.log('[FirestoreService] Fetching questions for:', subject, subtopic);
    const snapshot = await questionsCollection
      .where('subject', '==', subject)
      .where('subtopic', '==', subtopic)
      .get();
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.log('[FirestoreService] Error fetching questions by subject and subtopic:', error);
    throw error;
  }
};

export const getMockExamQuestionsSet = async (setNumber) => {
  try {
    console.log('[FirestoreService] Fetching mock exam questions for set:', setNumber);
    const snapshot = await questionsCollection
      .where('mockSet', '==', setNumber)
      .get();
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.log('[FirestoreService] Error fetching mock exam questions:', error);
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
    console.log('[FirestoreService] Creating payment record for:', userId, purchaseId);
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
    console.log('[FirestoreService] Error creating payment record:', error);
    throw error;
  }
};

export const getPaymentRecord = async (userId) => {
  try {
    console.log('[FirestoreService] Fetching payment record for:', userId);
    const snapshot = await paymentsCollection
      .where('userId', '==', userId)
      .get();
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.log('[FirestoreService] Error fetching payment record:', error);
    throw error;
  }
};

// ----- Guidance Modules -----
export const getAllGuidanceModules = async () => {
  try {
    console.log('[FirestoreService] Fetching all guidance modules');
    const snapshot = await guidanceModulesCollection.orderBy('moduleId').get();
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.log('[FirestoreService] Error fetching guidance modules:', error);
    throw error;
  }
};

