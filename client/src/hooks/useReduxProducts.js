import { useSelector, useDispatch } from 'react-redux';
import { 
  selectProducts,
  selectDrafts,
  selectCurrentProduct,
  selectProductsLoading,
  selectProductsError,
  fetchProducts,
  fetchDrafts,
  createProduct,
  updateProduct,
  deleteProduct,
  saveDraft,
  publishDraft,
  deleteDraft,
  setCurrentProduct,
  clearCurrentProduct,
  clearProductsData
} from '../store/slices/productSlice';
import { useReduxAuth } from './useReduxAuth';

export const useReduxProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const drafts = useSelector(selectDrafts);
  const currentProduct = useSelector(selectCurrentProduct);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const { user } = useReduxAuth();

  const getUserId = () => {
    if (!user) return null;
    return user._id || user.id;
  };

  const loadProducts = () => {
    const userId = getUserId();
    if (!userId) return Promise.reject(new Error('User not authenticated'));
    return dispatch(fetchProducts(userId)).unwrap();
  };

  const loadDrafts = () => {
    const userId = getUserId();
    if (!userId) return Promise.reject(new Error('User not authenticated'));
    return dispatch(fetchDrafts(userId)).unwrap();
  };

  const addProduct = (productData) => {
    const userId = getUserId();
    if (!userId) return Promise.reject(new Error('User not authenticated'));
    const data = { ...productData, userId };
    return dispatch(createProduct(data)).unwrap();
  };

  const editProduct = (id, data) => {
    if (!id) return Promise.reject(new Error('Product ID is required'));
    return dispatch(updateProduct({ id, data })).unwrap();
  };

  const removeProduct = (uuid) => {
    if (!uuid) return Promise.reject(new Error('Product UUID is required'));
    return dispatch(deleteProduct(uuid)).unwrap();
  };

  const createDraft = (draftData) => {
    const userId = getUserId();
    if (!userId) return Promise.reject(new Error('User not authenticated'));
    const data = { ...draftData, userId };
    return dispatch(saveDraft(data)).unwrap();
  };

  const publishDraftProduct = (draftId) => {
    if (!draftId) return Promise.reject(new Error('Draft ID is required'));
    return dispatch(publishDraft(draftId)).unwrap();
  };

  const removeDraft = (draftId) => {
    if (!draftId) return Promise.reject(new Error('Draft ID is required'));
    return dispatch(deleteDraft(draftId)).unwrap();
  };

  const setCurrent = (product) => {
    dispatch(setCurrentProduct(product));
  };

  const clearCurrent = () => {
    dispatch(clearCurrentProduct());
  };

  const clearAll = () => {
    dispatch(clearProductsData());
  };

  return {
    products,
    drafts,
    currentProduct,
    loading,
    error,
    loadProducts,
    loadDrafts,
    addProduct,
    editProduct,
    removeProduct,
    createDraft,
    publishDraftProduct,
    removeDraft,
    setCurrent,
    clearCurrent,
    clearAll
  };
}; 