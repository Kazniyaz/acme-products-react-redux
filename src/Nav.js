import React from 'react';
import { connect } from 'react-redux';
import { showTopRatedProduct, loadProducts } from './store';
import store from './store';

const Nav = ({
  products,
  numberOfProducts,
  showTopRatedProduct,
  loadProducts,
}) => {
  return (
    <ul>
      <li onClick={() => loadProducts()}>
        Products(
        {numberOfProducts}){console.log(store.getState())}
      </li>
      <li onClick={() => showTopRatedProduct()}>Top Rated ()</li>
    </ul>
  );
};

const mapStateToProps = products => {
  return {
    products,
    numberOfProducts: products.length,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    showTopRatedProduct: () => dispatch(showTopRatedProduct()),
    loadProducts: () => dispatch(loadProducts()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
