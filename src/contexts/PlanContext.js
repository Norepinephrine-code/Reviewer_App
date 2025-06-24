import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import { AuthContext } from './AuthContext';
import { subscribeToUserPlan } from '../services/firestoreService';

export const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [plan, setPlan] = useState('basic');

  useEffect(() => {
    let unsubscribe = () => {};
    if (user) {
      unsubscribe = subscribeToUserPlan(user.uid, setPlan);
    } else {
      setPlan('basic');
    }
    return unsubscribe;
  }, [user]);

  const isPremium = plan === 'premium';

  return (
    <PlanContext.Provider value={{ plan, isPremium }}>
      {children}
    </PlanContext.Provider>
  );
};
