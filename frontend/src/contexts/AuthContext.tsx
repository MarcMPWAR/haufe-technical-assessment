// AuthContext.tsx
import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  getUserData: () => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
}

interface AuthContextProps {
  children: ReactNode; // Define children as a ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isRegistrated, setRegistrationSuccess] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState("");
  

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const { success, message } = await AuthService.login(email, password);

      if (success) {
        setAuthenticated(true);
      } else {
        // Handle failed login
        console.error('Login failed:', message);
      }
      return { success, message };
    } catch (error) {
      // Handle any errors from AuthService
      console.error('Error during login:', error);
      return { success: false, message: 'Internal error during login' };
    }
  };

  const logout = () => {
    setAuthenticated(false);
    AuthService.logout();
  };

  const register = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
  try {
    const { success, message } = await AuthService.register(email, password);

    if (success) {
      // You may set a state to show a success message and provide a button for manual login
      setRegistrationSuccess(true);
      setRegistrationMessage('Registration successful. Click the button below to login.');
    } else {
      // Handle failed registration
      console.error('Registration failed:', message);
    }
    return { success, message };
  } catch (error) {
    // Handle any errors from AuthService
    console.error('Error during registration:', error);
    return { success: false, message: 'Internal error during registration' };
  }
};


  const getUserData = async () => {
    try {
      // Fetch user data based on the stored token
      // Update user context with the retrieved data
      const userData = await AuthService.getUserData();
      setAuthenticated(true);
    } catch (error) {
      // Handle any errors during user data fetch
      console.error('Error fetching user data:', error);
    } finally {
      // Set loading to false after user data fetch
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      // Check if a token is present (user is authenticated)
      const token = AuthService.getToken();
      if (token) {
        // If a token is present, try to fetch user data
        await getUserData();
      }

      // Set initial loading to false after authentication check
      setLoading(false);
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, getUserData, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
