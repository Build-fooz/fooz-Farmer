import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Initial state
const initialState = {
  data: null,
  loading: false,
  error: null,
  lastFetched: null,
};

// Async thunks
export const fetchAnalytics = createAsyncThunk(
  'analytics/fetch',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/analytics/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const refreshAnalytics = createAsyncThunk(
  'analytics/refresh',
  async (userId, { rejectWithValue }) => {
    try {
      // Use PUT to refresh analytics data on the server first
      await api.put(`/api/analytics/${userId}`);
      
      // Then get the updated data
      const response = await api.get(`/api/analytics/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Analytics slice
const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    clearAnalyticsData: (state) => {
      state.data = null;
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch analytics
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to load analytics';
      })
      
      // Refresh analytics
      .addCase(refreshAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(refreshAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to refresh analytics';
      });
  },
});

export const { clearAnalyticsData } = analyticsSlice.actions;

// Selectors
export const selectAnalyticsData = (state) => state.analytics.data;
export const selectAnalyticsLoading = (state) => state.analytics.loading;
export const selectAnalyticsError = (state) => state.analytics.error;
export const selectLastFetched = (state) => state.analytics.lastFetched;

export default analyticsSlice.reducer; 