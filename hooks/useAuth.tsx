import { useState, useEffect, createContext, useContext, ReactNode, useMemo } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useRouter } from 'expo-router'; // For Expo Router navigation

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
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false); // Default: not first-time user
  const router = useRouter(); // Access router for navigation

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        // Check if the user is logging in for the first time
        const isFirstTime = user.metadata.creationTime === user.metadata.lastSignInTime;
        setIsFirstTimeUser(isFirstTime);
      }
    });
    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.replace('./auth/LoginScreen'); // Using absolute path
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const value = useMemo(
    () => ({ user, setUser, logout, isFirstTimeUser, setIsFirstTimeUser }),
    [user, isFirstTimeUser]
  );

  return value;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
