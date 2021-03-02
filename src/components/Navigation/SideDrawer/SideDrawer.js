import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

import classes from './SideDrawer.module.css';


const sideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed} >
        <nav>
          <NavigationItems />
        </nav>
        <ul className={classes.externalLinks}>
          <li className={classes.NavigationItem}>
            <a href='https://github.com/tanner2379' >
                Github
            </a>
          </li>
          <li className={classes.NavigationItem}>
            <a href='https://www.linkedin.com/in/tanner-sigel/' >
                LinkedIn
            </a>
          </li>
          <li className={classes.NavigationItem}>
            <p>tanner2379@live.com</p>
          </li>
        </ul>
      </div>
    </Aux>
  );
};

export default sideDrawer;