import { useState, useContext, createContext, ReactNode } from 'react';

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (email: string, password: string) => {
    // Mock login logic
    console.log(`Logging in with email: ${email}, password: ${password}`);
    setUser(email);
  };

  const register = (email: string, password: string) => {
    // Mock registration logic
    console.log(`Registering with email: ${email}, password: ${password}`);
    setUser(email);
  };

  const logout = () => {
    console.log('Logging out');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
