import React, { useState } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Footer from '../../components/Footer/Footer';

import classes from './Layout.module.css'

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

const Layout = props => {
  const [sideDrawerVisible, setSideDrawerVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerVisible(false);
  }

  const sideDrawerToggleHandler = () => {
    setSideDrawerVisible(!sideDrawerVisible);
  }

  return (
    <Aux>
      <Toolbar {...props} drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer {...props} open={sideDrawerVisible} closed={sideDrawerClosedHandler} />
      <Elements stripe={stripePromise}>
        <div className={classes.Content}>
          {props.children}
        </div>
      </Elements>
      
      {/* <div className={classes.Footer}>
        <Footer />
      </div> */}
    </Aux>
  );
};

export default Layout;