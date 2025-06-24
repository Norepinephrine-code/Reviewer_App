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
      console.log('Fetching plan status for:', uid);
      const doc = await firestore().collection('users').doc(uid).get();
      const status = doc.exists ? doc.data().planStatus : 'basic';
      console.log('Plan status fetched:', status);
      setPlan(status === 'premium' ? 'premium' : 'basic');
    } catch (error) {
      console.log('Error fetching plan status:', error);
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
