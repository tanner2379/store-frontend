import React, { useState, useContext } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Flash from '../../components/UI/Flash/Flash';

import { FlashContext }  from '../../contexts/FlashContext'

import classes from './Layout.module.css'

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

const Layout = props => {
  const [flash, setFlash] = useContext(FlashContext);
  const [sideDrawerVisible, setSideDrawerVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerVisible(false);
  }

  const sideDrawerToggleHandler = () => {
    setSideDrawerVisible(!sideDrawerVisible);
  }

  const closeFlash = () => {
    setFlash({errors: [], visible: false})
  }

  return (
    <Aux>
      <Toolbar {...props} drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer {...props} open={sideDrawerVisible} closed={sideDrawerClosedHandler} />
      <Elements stripe={stripePromise}>
        {
          flash.visible
          ? <Flash close={closeFlash} messages={flash.errors} />
          : null
        }
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