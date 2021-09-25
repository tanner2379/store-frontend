import React, { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux';
import CartItem from '../../containers/Cart/CartItem/CartItem';

import { currency } from '../../shared/utility';

import classes from './Confirm.module.css';

const Confirm = props => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentIntent = JSON.parse(sessionStorage.getItem("paymentInfo"));
  let itemIds = null;
  if (paymentIntent){
    itemIds = paymentIntent.cartItems.map(cartItem => cartItem.id);
  }

  const [isProcessing, setProcessingTo] = useState(false);

  const handleSubmit = event => {  
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    
    try {
      setProcessingTo(true);
      // stripe.confirmCardPayment(paymentIntent);
      axios.post('/confirm', {
        payment_intent: paymentIntent.payment_intent,
        cart_items: itemIds
      })
        .then(response => {
          if (response.status === 200){
            sessionStorage.removeItem("paymentInfo");
            setProcessingTo(false);
            props.history.push('/');
          } else {
            console.log("invoice status error")
          }
        }).catch(error => {
          setProcessingTo(false);
          console.log(error);
        })
    }
    catch(error) {
      setProcessingTo(false);
      console.log('error with confirmation', error);
    }
  }
  let totalPrice = 0;
  if(paymentIntent && paymentIntent.cartItems){
    for (let i = 0; i < paymentIntent.cartItems.length; i++) {
      totalPrice += paymentIntent.cartItems[i].product_price * paymentIntent.cartItems[i].quantity;
    }
  }
  
  let cardDetails = null;
  let shippingDetails = null;

  if (paymentIntent && paymentIntent.shipping) {
    cardDetails = (
      <Aux>
        <p>Name: {paymentIntent.name}</p>
        <p>Card Ending In: {paymentIntent.lastFour}</p>
      </Aux>
    )
    shippingDetails = (
      <Aux>
        <p>Address Line 1: {paymentIntent.shipping.line1}</p>
        <p>Address Line 2: {paymentIntent.shipping.line2}</p>
        <p>City: {paymentIntent.shipping.city}</p>
        <p>State: {paymentIntent.shipping.state}</p>
        <p>Country: {paymentIntent.shipping.country}</p>
        <p>Postal Code: {paymentIntent.shipping.postal_code}</p>
      </Aux>
    )
  }

  let cartList = null;
  if (paymentIntent && paymentIntent.cartItems) {
    cartList = (
      <Aux>
        {paymentIntent.cartItems.map(cartItem => {
          return(
            <CartItem
              key={cartItem.id}
              id={cartItem.id}
              imageUrl={cartItem.image_url}
              productName={cartItem.product_name}
              productPrice={
                cartItem.product_price
                ? currency(cartItem.product_price)
                : null
              }
              quantity={cartItem.quantity}
              totalPrice={
                cartItem.product_price
                ? currency(cartItem.product_price * cartItem.quantity)
                : null
              } />
            )
          }
        )}
      </Aux>
    )
  }

  return (
    <div className={classes.Confirm}>
      <div className={classes.contentWrapper}>
        <p className={classes.Title}>Confirm Order Details</p>
        <div className={classes.cartList}>
          <p className={classes.subTitle}>Order Total: {currency(totalPrice)}</p>
          {cartList}
        </div>
        <div className={classes.infoWrapper}>
          <div className={classes.cardDetailsWrapper}>
            <p className={classes.subTitle}>Card Details</p>
            <div className={classes.cardDetails}>
              {cardDetails}
            </div>
          </div>
          <div className={classes.shippingDetailsWrapper}>
          <p className={classes.subTitle}>Shipping Details</p>
            <div className={classes.shippingDetails}>
              {shippingDetails}
            </div>
          </div>  
        </div>
        <button className={classes.confirmButton} disabled={isProcessing || !stripe} onClick={(event) => handleSubmit(event)}>Confirm</button>
      </div>
    </div>
  )
}

export default Confirm