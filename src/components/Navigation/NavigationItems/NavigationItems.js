import React, { useContext } from 'react';
import axios from '../../../axios-orders';

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

  if (userInfo.loggedIn === "LOGGED_IN") {
    profileLink = (
      <NavigationItem link={`/users/${userInfo.user.id}`}>
        Profile
      </NavigationItem>
    )
  }

  const handleLogout = () => {
    axios.delete(`/logout`, {
    }, { withCredentials: true})
    .then(response => {
      if (response.data.logged_out) {
        setUserInfo({...userInfo, loggedIn: 'NOT_LOGGED_IN', user: {}});
        props.history.push('/');
      } else {
        console.log("Logout Error")
      }
    }).catch(error => {
      console.log("Logout Error", error);
    });   
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
      {userInfo.loggedIn === 'LOGGED_IN'
      ? <div className={classes.Logout} onClick={handleLogout}>Log Out</div>
      : null}
      <NavigationItem link={'/cart'}>
        Cart
      </NavigationItem>
    </ul>
  );
};

export default NavigationItems;