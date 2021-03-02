import React, { Suspense, useState, useEffect } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from './contexts/UserContext';

import Layout from './hoc/Layouts/Layout';
import TransitionElement from './components/TransitionElement/TransitionElement';

import Home from './containers/Home/Home';

import Products from './containers/Products/Products';
import Product from './containers/Products/Product/Product';
import NewProduct from './containers/Products/New/New';
import EditProduct from './containers/Products/Product/Edit/Edit';

import Categories from './containers/Categories/Categories';
import Category from './containers/Categories/Category/Category';
import NewCategory from './containers/Categories/New/New';
import EditCategory from './containers/Categories/Category/Edit/Edit';

import Registration from './containers/Registration/Registration';
import Profile from './containers/Profile/Profile';
import EditProfile from './containers/Profile/Edit/Edit';

import Cart from './containers/Cart/Cart';

import Checkout from './containers/Checkout/Checkout';
import Confirm from './containers/Checkout/Confirm';


import Dashboard from './containers/Dashboard/Dashboard'

import Invoices from './containers/Invoices/Invoices';

const App = props => {
  const [userInfo, setUserInfo] = useState({loggedIn: 'NOT_LOGGED_IN', user: {}});

  const checkLoginStatus = () => {

    axios.get('http://localhost:5000/logged_in', {withCredentials: true})
      .then(response => {
        if (response.data.logged_in && userInfo.loggedIn === 'NOT_LOGGED_IN') {
          setUserInfo({loggedIn: 'LOGGED_IN', user: response.data.user})
        } else if (!response.data.logged_in && userInfo.loggedIn === 'LOGGED_IN') {
          setUserInfo({loggedIn: 'NOT_LOGGED_IN', user: {}})
        }
      }).catch(error => {
        console.log("check login error", error);
      })
  }

  useEffect(() => {
    checkLoginStatus();
  }, [])

  return (
    <UserContext.Provider value={[userInfo, setUserInfo]}>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          <Route render={({location})  => (
            <TransitionElement multiple assignedKey={location.key} animation='fade' timeout={1000}>
              <Switch location={location}>
                <Route path="/" exact component={Home} />
                <Route path="/products" exact component={Products} />
                <Route path="/products/new" exact component={NewProduct} />
                <Route path="/products/:slug/edit" component={EditProduct} />
                <Route path="/products/:slug" component={Product} />
                <Route path="/categories" exact component={Categories} />
                <Route path="/categories/new" exact component={NewCategory} />
                <Route path="/categories/:slug/edit" component={EditCategory} />
                <Route path="/categories/:slug" component={Category} />
                <Route path="/sign_in" render={props => (
                  <Registration {...props} />)} />
                <Route path="/users/:id/edit" component={EditProfile} />
                <Route path="/users/:id" component={Profile} />
                <Route path="/cart" component={Cart} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/invoices" component={Invoices} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/confirm" component={Confirm} />
                <Redirect to="/" />
              </Switch>
            </TransitionElement>
          )} />
        </Suspense>
      </Layout>
    </UserContext.Provider>
  )
};

export default withRouter(App);