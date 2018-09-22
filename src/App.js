import React, { Component } from 'react';
import store, { loadProducts } from './store';
import { Provider } from 'react-redux';
import Nav from './Nav';
import ProductList from './ProductList';

export default class App extends Component {
  componentDidMount() {
    store.dispatch(loadProducts());
  }
  render() {
    return (
      <Provider store={store}>
        <div>
          <h1>ACME PRODUCTS:</h1>
          <Nav />
          <ProductList />
        </div>
      </Provider>
    );
  }
}
