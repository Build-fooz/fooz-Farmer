import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productAPI } from '../../services/api';

// Initial state
const initialState = {
  products: [],
  drafts: [],
  currentProduct: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await productAPI.getUserProducts(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const fetchDrafts = createAsyncThunk(
  'products/fetchDrafts',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await productAPI.getDrafts(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/create',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await productAPI.createProduct(productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await productAPI.updateProduct(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await productAPI.updateProductStatus(uuid, 'removed');
      return { uuid, response: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const saveDraft = createAsyncThunk(
  'products/saveDraft',
  async (draftData, { rejectWithValue }) => {
    try {
      const response = await productAPI.saveDraft(draftData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const publishDraft = createAsyncThunk(
  'products/publishDraft',
  async (draftId, { rejectWithValue }) => {
    try {
      const response = await productAPI.publishDraft(draftId);
      return { draftId, response: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const deleteDraft = createAsyncThunk(
  'products/deleteDraft',
  async (draftId, { rejectWithValue }) => {
    try {
      const response = await productAPI.deleteDraft(draftId);
      return { draftId, response: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    clearProductsData: (state) => {
      state.products = [];
      state.drafts = [];
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to load products';
      })
      
      // Fetch drafts
      .addCase(fetchDrafts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrafts.fulfilled, (state, action) => {
        state.loading = false;
        state.drafts = action.payload.drafts || [];
      })
      .addCase(fetchDrafts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to load drafts';
      })
      
      // Create product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload.product);
      })
      
      // Update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p.uuid === action.payload.product.uuid);
        if (index !== -1) {
          state.products[index] = action.payload.product;
        }
      })
      
      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product.uuid !== action.payload.uuid);
      })
      
      // Save draft
      .addCase(saveDraft.fulfilled, (state, action) => {
        state.drafts.unshift(action.payload.draft);
      })
      
      // Publish draft
      .addCase(publishDraft.fulfilled, (state, action) => {
        // Add new product
        if (action.payload.response.product) {
          state.products.unshift(action.payload.response.product);
        }
        // Remove draft
        state.drafts = state.drafts.filter(draft => draft.uuid !== action.payload.draftId);
      })
      
      // Delete draft
      .addCase(deleteDraft.fulfilled, (state, action) => {
        state.drafts = state.drafts.filter(draft => draft.uuid !== action.payload.draftId);
      });
  },
});

export const { setCurrentProduct, clearCurrentProduct, clearProductsData } = productSlice.actions;

// Selectors
export const selectProducts = (state) => state.products.products;
export const selectDrafts = (state) => state.products.drafts;
export const selectCurrentProduct = (state) => state.products.currentProduct;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;

export default productSlice.reducer; 