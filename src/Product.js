import React from 'react';
import { connect } from 'react-redux';
import { deleteProduct } from './store';

const Product = ({ products, deleteProduct }) => {
  const product = products.reduce(
    (topProduct, currProduct) => {
      if (topProduct.rating < currProduct.rating) return currProduct;
      else return topProduct;
    },
    { rating: 0 }
  );
  return (
    <div>
      <span>
        {product.name} {product.rating}
      </span>
      <button type="submit" onClick={() => deleteProduct(product)}>
        X
      </button>
    </div>
  );
};

const mapStateToProps = products => {
  return {
    products,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProduct: product => dispatch(deleteProduct(product)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
