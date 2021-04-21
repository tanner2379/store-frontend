import React, { useState, useContext } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux';
import classes from './Confirm.module.css';

const Confirm = props => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentIntent = JSON.parse(localStorage.getItem("paymentInfo"));
  const itemIds = paymentIntent.cartItems.map(cartItem => cartItem.id);

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
        payment_intent: paymentIntent,
        cart_items: itemIds
      })
        .then(response => {
          if (response.status === 200){
            localStorage.removeItem("paymentInfo");
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
      console.log('error with confirmation', error);
      setProcessingTo(false);
    }
  }

  let confirmFields = null
  if (paymentIntent && paymentIntent.shipping) {
    confirmFields = (
      <Aux>
        <p>Name: {paymentIntent.name}</p>
        <p>Card Ending In: {paymentIntent.lastFour}</p>
        <p>Address Line 1: {paymentIntent.shipping.line1}</p>
        <p>Address Line 2: {paymentIntent.shipping.line2}</p>
        <p>City: {paymentIntent.shipping.city}</p>
        <p>State: {paymentIntent.shipping.state}</p>
        <p>Country: {paymentIntent.shipping.country}</p>
        <p>Postal Code: {paymentIntent.shipping.postal_code}</p>
        <button disabled={isProcessing || !stripe} onClick={(event) => handleSubmit(event)}>Confirm</button>
      </Aux>
    )
  }

  return (
    <div className={classes.Confirm}>
      <div className={classes.contentWrapper}>
        <p className={classes.Title}>Confirm Payment Details</p>
        {confirmFields}
      </div>
    </div>
  )
}

export default Confirm