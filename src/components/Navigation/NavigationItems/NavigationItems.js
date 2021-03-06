import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import axios from '../../../axios-orders';

import { UserContext } from '../../../contexts/UserContext';

import NavigationItem from './NavigationItem/NavigationItem';
import SearchBar from '../../Forms/SearchBar/SearchBar';

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
    })
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
    <div className={classes.NavigationWrapper}>
      <NavLink to="/" className={classes.HomeIcon}>
        K
      </NavLink>
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
        <SearchBar className={classes.Search} history={props.history} />
      </ul>
    </div>
  );
};

export default NavigationItems;