import React from 'react';
import axios from '../../../axios-orders';

import SubtractArrow from '../../../components/svg/SubtractArrow/SubtractArrow';
import AddArrow from '../../../components/svg/AddArrow/AddArrow';

import classes from './CartItem.module.css';

const CartItem = props => {

  const handleRemove = event => {
    axios.delete(`/cart_items/${props.id}`)
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
      <img src={'http://localhost:5000/' + props.imageUrl} alt='cartItem Image' width="100px" height="100px" />
      <p className={classes.productName}>{props.productName}</p>
      <p className={classes.productPrice}>{props.productPrice}</p>
      <div className={classes.subtractWrapper}>
        <SubtractArrow onclick={props.decreaseQuantity} />
      </div>
      <p className={classes.productQuantity}>{props.quantity}</p>
      <div className={classes.addWrapper}>
        <AddArrow onclick={props.increaseQuantity} />
      </div>
      <p className={classes.totalPrice}>{props.totalPrice}</p>
      <div className={classes.removeButton} onClick={(event) => handleRemove(event)}>
        <p>Remove from Cart</p>
      </div>
    </div>
  )
}

export default CartItem