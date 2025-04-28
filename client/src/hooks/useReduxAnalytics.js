import { useSelector, useDispatch } from 'react-redux';
import { 
  selectAnalyticsData, 
  selectAnalyticsLoading, 
  selectAnalyticsError,
  selectLastFetched,
  fetchAnalytics,
  refreshAnalytics,
  clearAnalyticsData
} from '../store/slices/analyticsSlice';
import { useReduxAuth } from './useReduxAuth';

export const useReduxAnalytics = () => {
  const dispatch = useDispatch();
  const analyticsData = useSelector(selectAnalyticsData);
  const loading = useSelector(selectAnalyticsLoading);
  const error = useSelector(selectAnalyticsError);
  const lastFetched = useSelector(selectLastFetched);
  const { user } = useReduxAuth();

  const fetchData = () => {
    if (!user) return Promise.reject(new Error('User not authenticated'));
    const userId = user._id || user.id;
    return dispatch(fetchAnalytics(userId)).unwrap();
  };

  const refreshData = () => {
    if (!user) return Promise.reject(new Error('User not authenticated'));
    const userId = user._id || user.id;
    return dispatch(refreshAnalytics(userId)).unwrap();
  };

  const clearData = () => {
    dispatch(clearAnalyticsData());
  };

  // Determine if data is stale (more than 5 minutes old)
  const isDataStale = () => {
    if (!lastFetched) return true;
    const fiveMinutes = 5 * 60 * 1000;
    return Date.now() - lastFetched > fiveMinutes;
  };

  // Fetch data if not available or stale
  const fetchIfNeeded = () => {
    if (!analyticsData || isDataStale()) {
      return fetchData();
    }
    return Promise.resolve(analyticsData);
  };

  return {
    analyticsData,
    loading,
    error,
    lastFetched,
    fetchData,
    refreshData,
    clearData,
    isDataStale,
    fetchIfNeeded
  };
}; 