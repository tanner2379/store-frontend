import React, { Suspense, useState, useEffect } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import axios from './axios-orders';

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

  useEffect(() => {
    axios.get('/logged_in', {withCredentials: true})
      .then(response => {
        if (response.data.logged_in && userInfo.loggedIn === 'NOT_LOGGED_IN') {
          setUserInfo({...userInfo, loggedIn: 'LOGGED_IN', user: response.data.user})
        } else if (!response.data.logged_in && userInfo.loggedIn === 'LOGGED_IN') {
          setUserInfo({...userInfo, loggedIn: 'NOT_LOGGED_IN', user: {}})
        }
      }).catch(error => {
        console.log("check login error", error);
      })
  }, [userInfo, setUserInfo])

  return (
    <UserContext.Provider value={[userInfo, setUserInfo]}>
      <Layout {...props}>
        <Suspense fallback={<p>Loading...</p>}>
          <Route render={({location})  => (
            <TransitionElement multiple assignedKey={location.key} animation='fade' timeout={1000}>
              <Switch location={location}>
                <Route path="/" exact render={props => (
                  <Home {...props} />)} />
                <Route path="/products" exact render={props => (
                  <Products {...props} />)} />
                <Route path="/products/new" exact render={props => (
                  <NewProduct {...props} />)} />
                <Route path="/products/:slug/edit" render={props => (
                  <EditProduct {...props} />)} />
                <Route path="/products/:slug" render={props => (
                  <Product {...props} />)} />
                <Route path="/categories" exact render={props => (
                  <Categories {...props} />)} />
                <Route path="/categories/new" exact render={props => (
                  <NewCategory {...props} />)} />
                <Route path="/categories/:slug/edit" render={props => (
                  <EditCategory {...props} />)} />
                <Route path="/categories/:slug" render={props => (
                  <Category {...props} />)} />
                <Route path="/sign_in" render={props => (
                  <Registration {...props} />)} />
                <Route path="/users/:slug/edit" render={props => (
                  <EditProfile {...props} />)} />
                <Route path="/users/:slug" render={props => (
                  <Profile {...props} />)} />
                <Route path="/cart" render={props => (
                  <Cart {...props} />)} />
                <Route path="/dashboard" render={props => (
                  <Dashboard {...props} />)} />
                <Route path="/invoices" render={props => (
                  <Invoices {...props} />)} />
                <Route path="/checkout" render={props => (
                  <Checkout {...props} />)} />
                <Route path="/confirm" render={props => (
                  <Confirm {...props} />)} />
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