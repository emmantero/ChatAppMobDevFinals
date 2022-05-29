import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../firebase';
import SplashScreen from '../SplashScreen';
import { doc, getDoc } from 'firebase/firestore';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const data = doc(db, 'users', auth.currentUser?.uid);
        getDoc(data).then((res) => {
          setUser(res.data());
        });
      }
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <SplashScreen />;
  }
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
