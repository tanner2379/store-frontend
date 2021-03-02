import React, { useContext } from 'react';

import { UserContext } from '../../../contexts/UserContext';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';

const NavigationItems = props => {
  const [userInfo, setUserInfo] = useContext(UserContext);

  let profileLink = (
    <NavigationItem link={'/sign_in'}>
      Log In/Sign Up
    </NavigationItem>
  )

  if (userInfo.loggedIn) {
    profileLink = (
      <NavigationItem link={`/users/${userInfo.user.id}`}>
        Profile
      </NavigationItem>
    )
  }

  return (
    <ul className={classes.NavigationItems} >
      <NavigationItem link={'/'} exact>
        Home
      </NavigationItem>
      <NavigationItem link={'/products'}>
        Products
      </NavigationItem>
      <NavigationItem link={'/categories'}>
        Categories
      </NavigationItem>
      {profileLink}
      <NavigationItem link={'/cart'}>
        Cart
      </NavigationItem>
    </ul>
  );
};

export default NavigationItems;