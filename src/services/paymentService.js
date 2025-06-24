import { createPaymentRecord, updateUserPlanStatus } from './firestoreService';

// Endpoint for verifying purchase receipts server-side
const VERIFY_RECEIPT_URL = 'https://your-secure-endpoint.com/verifyReceipt';

/**
 * Verifies a Google Play purchase receipt and processes payment data.
 * @param {string} userId Firebase auth UID of the purchaser
 * @param {string} purchaseId Identifier from Google Play receipt
 * @param {string} platform Mobile platform (Android or iOS)
 * @param {number} amount Purchase amount in Philippine Peso
 * @returns {Promise<{success: boolean, error?: string}>} Result of processing
 */
export const verifyAndProcessPayment = async (userId, purchaseId, platform, amount) => {
  console.log('Starting verifyAndProcessPayment for purchaseId:', purchaseId);

  try {
    console.log('Sending receipt to server for verification...');
    const response = await fetch(VERIFY_RECEIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, purchaseId, platform, amount }),
    });

    const result = await response.json();

    if (!response.ok || !result.verified) {
      console.log('Receipt verification failed:', result);
      return { success: false, error: 'Verification failed' };
    }

    console.log('Receipt verified, creating payment record...');
    await createPaymentRecord(userId, purchaseId, platform, amount, 'completed');

    console.log('Updating user plan status to premium...');
    await updateUserPlanStatus(userId, 'premium');

    console.log('Payment processed successfully');
    return { success: true };
  } catch (error) {
    console.log('Error during verifyAndProcessPayment:', error);
    return { success: false, error: error.message };
  }
};
