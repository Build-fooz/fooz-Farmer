import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          try {
            // In a real implementation, you would verify the token with the server
            // For now, we'll just assume it's valid if it exists
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            if (userData && Object.keys(userData).length > 0) {
              setUser(userData);
            }
          } catch (error) {
            console.error('Auth check failed:', error);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userData');
          }
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { accessToken, refreshToken, user: userData } = response.data;
      
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userData', JSON.stringify(userData));
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Registration error:", error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const verifyOTP = async (otpData) => {
    try {
      const response = await authAPI.verifyOTP(otpData);
      
      // If OTP verification includes user data and tokens, save them
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        
        if (response.data.user) {
          localStorage.setItem('userData', JSON.stringify(response.data.user));
          setUser(response.data.user);
        }
      }
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error("OTP verification error:", error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'OTP verification failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  // Provide a fallback in case of errors
  if (error) {
    console.error("Auth context error:", error);
    return <>{children}</>;
  }

  const value = {
    user,
    loading,
    login,
    register,
    verifyOTP,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  try {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  } catch (error) {
    console.error("Error using Auth context:", error);
    // Return a dummy implementation to prevent crashes
    return {
      user: null,
      loading: false,
      login: () => ({ success: false, error: "Auth context error" }),
      register: () => ({ success: false, error: "Auth context error" }),
      verifyOTP: () => ({ success: false, error: "Auth context error" }),
      logout: () => {},
      isAuthenticated: false
    };
  }
}; 