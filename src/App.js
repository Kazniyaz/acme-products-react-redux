import React, { Component } from 'react';
import store, { loadProducts } from './store';
import { Provider } from 'react-redux';
import Nav from './Nav';
import ProductList from './ProductList';
import Product from './Product';
import { HashRouter as Router, Route } from 'react-router-dom';

export default class App extends Component {
  componentDidMount() {
    store.dispatch(loadProducts());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <h1>ACME PRODUCTS:</h1>
            <Route component={Nav} />
            <Route path="/" exact component={ProductList} />
            <Route path="/product" component={Product} />
          </div>
        </Router>
      </Provider>
    );
  }
}
