// Firebase Cloud Messaging helper functions
import messaging from '@react-native-firebase/messaging';
import { updateUserFcmToken } from './firestoreService';

/**
 * Requests notification permission, retrieves the FCM token and stores it in
 * the user's Firestore document. The device is also subscribed to the
 * "daily_reminder" topic for broadcast reminders.
 *
 * @param {string} userId Firebase authentication UID
 */
export const registerDeviceForPushNotifications = async (userId) => {
  try {
    const authStatus = await messaging().requestPermission();
    const granted =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!granted) {
      console.log('[NotificationService] FCM permission not granted');
      return;
    }

    const fcmToken = await messaging().getToken();
    console.log('[NotificationService] FCM token obtained:', fcmToken);

    await updateUserFcmToken(userId, fcmToken);
    console.log('[NotificationService] FCM token saved to Firestore');

    await messaging().subscribeToTopic('daily_reminder');
    console.log('[NotificationService] Subscribed to topic: daily_reminder');
  } catch (error) {
    console.log('[NotificationService] Error registering device for push notifications:', error);
  }
};

/**
 * Unsubscribes the device from the daily reminder topic.
 * Useful when a user disables notifications.
 */
export const unsubscribeFromDailyReminder = async () => {
  try {
    await messaging().unsubscribeFromTopic('daily_reminder');
    console.log('[NotificationService] Unsubscribed from daily_reminder topic');
  } catch (error) {
    console.log('[NotificationService] Error unsubscribing from daily_reminder:', error);
  }
};

