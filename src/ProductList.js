import React from 'react';
import { connect } from 'react-redux';
import { createProduct, deleteProduct } from './store';
import faker from 'faker';

const ProductList = ({ products, createProduct, deleteProduct }) => {
  return (
    <div>
      <button
        type="submit"
        onClick={() => {
          createProduct({
            name: faker.commerce.productName().toString(),
            rating: Math.floor(Math.random() * 11),
          });
        }}
      >
        Create Product
      </button>
      <ul>
        {products.map(product => {
          return (
            <li key={product.id}>
              {product.name} {product.rating}
              <button type="submit" onClick={() => deleteProduct(product)}>
                X
              </button>
            </li>
          );
        })}
      </ul>
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
    createProduct: product => dispatch(createProduct(product)),
    deleteProduct: product => dispatch(deleteProduct(product)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
