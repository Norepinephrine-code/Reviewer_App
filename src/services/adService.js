import React from 'react';
import mobileAds, { BannerAd, BannerAdSize, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

// Environment configuration
const {
  ADMOB_APP_ID,
  ADMOB_BANNER_UNIT_ID,
  ADMOB_INTERSTITIAL_UNIT_ID,
} = process.env;

let interstitial = null;
let interstitialLoaded = false;

/**
 * Initializes the Google Mobile Ads SDK.
 * Should be called once when the app launches.
 */
export const initializeAds = () => {
  console.log('[AdService] Initializing AdMob with App ID:', ADMOB_APP_ID);
  mobileAds()
    .initialize()
    .then(() => console.log('[AdService] AdMob initialized'))
    .catch((error) => console.log('[AdService] AdMob initialization error:', error));
};

/**
 * Returns a banner ad component for non-premium users.
 * @param {boolean} isPremium User's premium status
 * @returns {React.ReactElement|null} Configured BannerAd component or null
 */
export const getBannerAd = (isPremium) => {
  if (isPremium) {
    console.log('[AdService] Banner ad skipped for premium user');
    return null;
  }

  console.log('[AdService] Rendering banner ad');
  return (
    <BannerAd
      unitId={ADMOB_BANNER_UNIT_ID}
      size={BannerAdSize.SMART_BANNER}
      onAdLoaded={() => console.log('[AdService] Banner ad loaded')}
      onAdFailedToLoad={(err) => console.log('[AdService] Banner ad failed to load:', err)}
    />
  );
};

/**
 * Loads an interstitial ad for non-premium users.
 * @param {boolean} isPremium User's premium status
 */
export const loadInterstitialAd = (isPremium) => {
  if (isPremium) {
    console.log('[AdService] Interstitial ad not loaded for premium user');
    return;
  }

  console.log('[AdService] Loading interstitial ad');
  interstitial = InterstitialAd.createForAdRequest(ADMOB_INTERSTITIAL_UNIT_ID);
  interstitial.addAdEventListener(AdEventType.LOADED, () => {
    console.log('[AdService] Interstitial ad loaded');
    interstitialLoaded = true;
  });
  interstitial.addAdEventListener(AdEventType.CLOSED, () => {
    console.log('[AdService] Interstitial ad closed');
    interstitialLoaded = false;
  });
  interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
    console.log('[AdService] Interstitial ad error:', error);
    interstitialLoaded = false;
  });
  interstitial.load();
};

/**
 * Displays the loaded interstitial ad if available and user is not premium.
 * @param {boolean} isPremium User's premium status
 */
export const showInterstitialAd = (isPremium) => {
  if (isPremium) {
    console.log('[AdService] Interstitial ad not shown for premium user');
    return;
  }

  if (interstitialLoaded && interstitial) {
    console.log('[AdService] Showing interstitial ad');
    interstitial.show();
  } else {
    console.log('[AdService] Interstitial ad not ready yet');
  }
};
