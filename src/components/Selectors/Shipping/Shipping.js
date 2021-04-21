import React from 'react';

import classes from './Shipping.module.css';

const ShippingSelector = props => {

  let shippingOptions = null;

  if (props.options) {
    shippingOptions = props.options.map(option => {
      return <option key={option[0]} value={option[1]}>{option[0]}</option>
    })
  }

  return (
    <select className={classes.Input} name="shippingDetails" id="shippingDetails" placeholder={props.placeholder} onChange={props.onChange} required={props.required} >
      <option>Select Saved Address</option>
      {shippingOptions}
    </select>
  )
}

export default ShippingSelector