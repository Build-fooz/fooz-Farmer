/**
 * Browser storage utility for managing user and analytics data
 */

// Storage keys
const KEYS = {
  // Auth related 
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_DATA: 'userData',
  
  // Analytics related
  ANALYTICS_DATA: 'analyticsData',
  ANALYTICS_TIMESTAMP: 'analyticsTimestamp',
  
  // Settings
  SETTINGS: 'appSettings'
};

// Storage expiration times (in milliseconds)
const EXPIRATION = {
  USER_DATA: 7 * 24 * 60 * 60 * 1000, // 7 days
  ANALYTICS: 30 * 60 * 1000, // 30 minutes
};

/**
 * Store user authentication data
 * @param {Object} data - { accessToken, refreshToken, user } 
 */
export const storeAuthData = (data) => {
  const { accessToken, refreshToken, user } = data;
  
  if (accessToken) {
    localStorage.setItem(KEYS.ACCESS_TOKEN, accessToken);
  }
  
  if (refreshToken) {
    localStorage.setItem(KEYS.REFRESH_TOKEN, refreshToken);
  }
  
  if (user) {
    // Add expiration timestamp
    const userData = {
      ...user,
      _timestamp: Date.now(),
      _expiration: Date.now() + EXPIRATION.USER_DATA
    };
    localStorage.setItem(KEYS.USER_DATA, JSON.stringify(userData));
  }
};

/**
 * Get stored user data
 * @returns {Object|null} User data or null if not found/expired
 */
export const getUserData = () => {
  try {
    const userDataStr = localStorage.getItem(KEYS.USER_DATA);
    if (!userDataStr) return null;
    
    const userData = JSON.parse(userDataStr);
    
    // Check for expiration if timestamp exists
    if (userData._expiration && Date.now() > userData._expiration) {
      // Data expired, clear it
      localStorage.removeItem(KEYS.USER_DATA);
      return null;
    }
    
    return userData;
  } catch (error) {
    console.error('Error retrieving user data from storage:', error);
    return null;
  }
};

/**
 * Get authentication tokens
 * @returns {Object} { accessToken, refreshToken }
 */
export const getAuthTokens = () => {
  return {
    accessToken: localStorage.getItem(KEYS.ACCESS_TOKEN),
    refreshToken: localStorage.getItem(KEYS.REFRESH_TOKEN)
  };
};

/**
 * Clear all authentication data
 */
export const clearAuthData = () => {
  localStorage.removeItem(KEYS.ACCESS_TOKEN);
  localStorage.removeItem(KEYS.REFRESH_TOKEN);
  localStorage.removeItem(KEYS.USER_DATA);
};

/**
 * Store analytics data
 * @param {string} userId - User ID
 * @param {Object} data - Analytics data object
 */
export const storeAnalyticsData = (userId, data) => {
  if (!userId || !data) return;
  
  try {
    // Add metadata
    const analyticsData = {
      ...data,
      _timestamp: Date.now(),
      _expiration: Date.now() + EXPIRATION.ANALYTICS
    };
    
    // Store in both localStorage (persistent) and sessionStorage (temporary session)
    localStorage.setItem(`${KEYS.ANALYTICS_DATA}_${userId}`, JSON.stringify(analyticsData));
    sessionStorage.setItem(`${KEYS.ANALYTICS_DATA}_${userId}`, JSON.stringify(analyticsData));
    sessionStorage.setItem(`${KEYS.ANALYTICS_TIMESTAMP}_${userId}`, Date.now().toString());
  } catch (error) {
    console.error('Error storing analytics data:', error);
  }
};

/**
 * Get stored analytics data
 * @param {string} userId - User ID
 * @returns {Object|null} Analytics data or null if not found/expired
 */
export const getAnalyticsData = (userId) => {
  if (!userId) return null;
  
  try {
    // First try sessionStorage (faster, temporary)
    const sessionData = sessionStorage.getItem(`${KEYS.ANALYTICS_DATA}_${userId}`);
    if (sessionData) {
      const parsedData = JSON.parse(sessionData);
      // Check expiration
      if (parsedData._expiration && Date.now() < parsedData._expiration) {
        return parsedData;
      }
    }
    
    // Fall back to localStorage if session data not found or expired
    const localData = localStorage.getItem(`${KEYS.ANALYTICS_DATA}_${userId}`);
    if (localData) {
      const parsedData = JSON.parse(localData);
      // Check expiration
      if (parsedData._expiration && Date.now() < parsedData._expiration) {
        return parsedData;
      } else {
        // Clear expired data
        localStorage.removeItem(`${KEYS.ANALYTICS_DATA}_${userId}`);
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error retrieving analytics data from storage:', error);
    return null;
  }
};

/**
 * Clear analytics data for a user
 * @param {string} userId - User ID
 */
export const clearAnalyticsData = (userId) => {
  if (!userId) return;
  
  localStorage.removeItem(`${KEYS.ANALYTICS_DATA}_${userId}`);
  sessionStorage.removeItem(`${KEYS.ANALYTICS_DATA}_${userId}`);
  sessionStorage.removeItem(`${KEYS.ANALYTICS_TIMESTAMP}_${userId}`);
};

/**
 * Store application settings
 * @param {Object} settings - Settings object
 */
export const storeSettings = (settings) => {
  if (!settings) return;
  
  try {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error storing app settings:', error);
  }
};

/**
 * Get stored application settings
 * @returns {Object|null} Settings or default settings if not found
 */
export const getSettings = () => {
  try {
    const settings = localStorage.getItem(KEYS.SETTINGS);
    return settings ? JSON.parse(settings) : null;
  } catch (error) {
    console.error('Error retrieving app settings:', error);
    return null;
  }
}; 