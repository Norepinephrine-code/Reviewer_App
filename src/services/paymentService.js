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
  console.log('[PaymentService] Starting verification for purchaseId:', purchaseId);

  try {
    console.log('[PaymentService] Sending receipt to server for verification...');
    const response = await fetch(VERIFY_RECEIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, purchaseId, platform, amount }),
    });

    const result = await response.json();

    console.log('[PaymentService] Payment verification result:', result);

    if (!response.ok || !result.verified) {
      console.log('[PaymentService] Receipt verification failed');
      return { success: false, error: 'Verification failed' };
    }

    console.log('[PaymentService] Receipt verified, creating payment record...');
    await createPaymentRecord(userId, purchaseId, platform, amount, 'completed');

    console.log('[PaymentService] Updating user plan status to premium...');
    await updateUserPlanStatus(userId, 'premium');

    console.log('[PaymentService] Payment processed successfully');
    return { success: true };
  } catch (error) {
    console.log('[PaymentService] Error during verifyAndProcessPayment:', error);
    return { success: false, error: error.message };
  }
};
