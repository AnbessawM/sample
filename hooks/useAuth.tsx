import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/app/config/firebase';

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isFirstTimeUser: boolean;
  setIsFirstTimeUser: (isFirstTime: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => { },
  logout: () => { },
  isFirstTimeUser: true,
  setIsFirstTimeUser: () => { },
});

const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false); // Initialize to false

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setIsFirstTimeUser(false);
      }
    });
    return unsubscribe;
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return { user, setUser, logout, isFirstTimeUser, setIsFirstTimeUser };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
