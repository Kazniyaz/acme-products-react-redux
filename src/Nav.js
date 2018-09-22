import React from 'react';
import { connect } from 'react-redux';
import { showTopRatedProduct, loadProducts } from './store';
import { Link } from 'react-router-dom';

const Nav = ({ products, numberOfProducts }) => {
  const topProd = products.reduce(
    (topProduct, currProduct) => {
      if (topProduct.rating < currProduct.rating) return currProduct;
      else return topProduct;
    },
    { rating: 0 }
  );
  return (
    <ul>
      <li>
        <Link to="/">Products ({numberOfProducts})</Link>
      </li>
      <li>
        <Link to="/product">
          Top Rated(
          {topProd.name})
        </Link>
      </li>
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
