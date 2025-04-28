import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCurrentUser, 
  selectIsAuthenticated, 
  selectAuthLoading, 
  selectAuthError,
  loginUser,
  logoutUser,
  refreshAuthToken,
  setUser,
  setAuthTokens,
  clearAuth
} from '../store/slices/authSlice';

export const useReduxAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const login = (credentials) => {
    return dispatch(loginUser(credentials)).unwrap();
  };

  const logout = () => {
    return dispatch(logoutUser()).unwrap();
  };

  const refreshToken = () => {
    return dispatch(refreshAuthToken()).unwrap();
  };

  const updateUser = (userData) => {
    dispatch(setUser(userData));
  };

  const updateTokens = (tokens) => {
    dispatch(setAuthTokens(tokens));
  };

  const clearAuthData = () => {
    dispatch(clearAuth());
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    refreshToken,
    updateUser,
    updateTokens,
    clearAuthData
  };
}; 