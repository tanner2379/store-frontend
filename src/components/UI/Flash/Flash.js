import React from 'react';

import classes from './Flash.module.css';


const Flash = props => {

  console.log(props.messages)
  return (
    <div className={classes.Flash}>
      <p className={classes.messages}>{props.messages}</p>
      <p className={classes.closeButton} onClick={props.close}>X</p>
    </div>
  )
}

export default Flash;