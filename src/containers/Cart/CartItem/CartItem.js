import React from 'react';
import axios from '../../../axios-orders';

import { currency } from '../../../shared/utility';

import classes from './CartItem.module.css';

const CartItem = props => {

  const handleRemove = event => {
    axios.delete(`/cart_items/${props.id}`, { withCredentials: true})
      .then(response => {
        if (response.data.satus = "deleted") {
          console.log("Deleted!", response.data);
          props.handleDelete();
        } else {
          console.log("CartItem delete error", response.data)
        }
      })
      .catch(error => {
        console.log("CartItem delete error", error);
      })
  }

  return(
    <div className={classes.CartItem}>
      <img src={'http://localhost:5000' + props.imageUrl} alt='cartItem Image' width="100px" height="100px" />
      <p>{props.productName}</p>
      <p>{currency(props.productPrice)}</p>
      <p>{props.quantity}</p>
      <button onClick={(event) =>handleRemove(event)}>Remove from Cart</button>
    </div>
  )
}

export default CartItem