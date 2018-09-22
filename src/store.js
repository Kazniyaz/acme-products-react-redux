import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const SHOW_TOP_RATE_PRODUCT = 'SHOW_TOP_RATED_PRODUCT';

const _loadProducts = products => {
  return {
    products,
    type: 'LOAD_PRODUCTS',
  };
};

const _createProduct = product => {
  return {
    product,
    type: 'CREATE_PRODUCT',
  };
};
const _deleteProduct = product => {
  return {
    product,
    type: 'DELETE_PRODUCT',
  };
};
const _topRatedProduct = () => {
  return {
    type: 'SHOW_TOP_RATED_PRODUCT',
  };
};

const loadProducts = () => {
  return dispatch => {
    return axios
      .get('/api/products')
      .then(res => res.data)
      .then(products => dispatch(_loadProducts(products)));
  };
};
const createProduct = product => {
  return dispatch => {
    return axios
      .post('/api/products', product)
      .then(res => res.data)
      .then(productToAdd => dispatch(_createProduct(productToAdd)));
  };
};

const deleteProduct = product => {
  return dispatch => {
    return axios
      .delete(`/api/products/${product.id}`)
      .then(() => dispatch(_deleteProduct(product)));
  };
};

const showTopRatedProduct = () => {
  return dispatch => {
    return dispatch(_topRatedProduct());
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      state = action.products;
      break;
    case CREATE_PRODUCT:
      state = [...state, action.product];
      break;
    case DELETE_PRODUCT:
      state = state.filter(product => product.id !== action.product.id);
      break;
    case SHOW_TOP_RATE_PRODUCT:
      state = [
        [...state].reduce(
          (topProduct, currProduct) => {
            if (topProduct.rating < currProduct.rating) return currProduct;
            else return topProduct;
          },
          { rating: 0 }
        ),
      ];
      break;
    default:
      break;
  }
  return state;
};

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;
export { loadProducts, createProduct, deleteProduct, showTopRatedProduct };
