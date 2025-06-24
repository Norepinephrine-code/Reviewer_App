import React, { createContext, useContext, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from './AuthContext';

export const PlanContext = createContext({
  plan: 'basic',
  isPremium: false,
  refreshPlanStatus: () => {},
});

export const PlanProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [plan, setPlan] = useState('basic');

  const fetchPlanStatus = async (uid) => {
    try {
      console.log('[PlanContext] Fetching plan status for:', uid);
      const doc = await firestore().collection('users').doc(uid).get();
      const status = doc.exists ? doc.data().planStatus : 'basic';
      console.log('[PlanContext] Fetched plan status:', status);
      setPlan(status === 'premium' ? 'premium' : 'basic');
    } catch (error) {
      console.log('[PlanContext] Error fetching plan status:', error);
      setPlan('basic');
    }
  };

  useEffect(() => {
    if (user) {
      fetchPlanStatus(user.uid);
    } else {
      setPlan('basic');
    }
  }, [user]);

  useEffect(() => {
    if (plan === 'premium') {
      console.log('[PlanContext] Plan upgraded to premium');
    }
  }, [plan]);

  const refreshPlanStatus = async () => {
    if (user) {
      await fetchPlanStatus(user.uid);
    }
  };

  const isPremium = plan === 'premium';

  return (
    <PlanContext.Provider value={{ plan, isPremium, refreshPlanStatus }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => useContext(PlanContext);
