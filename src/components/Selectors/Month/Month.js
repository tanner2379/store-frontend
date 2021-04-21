import React from 'react';

import classes from './Month.module.css'

const MonthSelector = props => {
  return (
    <select className={classes.Input} name={props.name} id={props.name} onChange={props.onChange} required={props.required} >
      <option>{props.placeholder}</option>
      <option value="1">01 - January</option>
      <option value="2">02 - February</option>
      <option value="3">03 - March</option>
      <option value="4">04 - April</option>
      <option value="5">05 - May</option>
      <option value="6">06 - June</option>
      <option value="7">07 - July</option>
      <option value="8">08 - August</option>
      <option value="9">09 - September</option>
      <option value="10">10 - October</option>
      <option value="11">11 - November</option>
      <option value="12">12 - December</option>
    </select>
  )
}

export default MonthSelector