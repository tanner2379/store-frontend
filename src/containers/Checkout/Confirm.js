import React, { useState, useContext } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import axios from '../../axios-orders';
import { UserContext } from '../../contexts/UserContext';

const Confirm = props => {
  const stripe = useStripe();
  const elements = useElements();

  const [userInfo, setUserInfo] = useContext(UserContext);
  const paymentIntent = userInfo.paymentIntent;
  const cartItems = userInfo.cartItems.map(cartItem => {
    return cartItem.id
  });

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
        cart_items: cartItems
      }, { withCredentials: true })
        .then(response => {
          if (response.status === 200){
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

  return (
    <button disabled={isProcessing || !stripe} onClick={(event) => handleSubmit(event)}>Confirm</button>
  )
}

export default Confirm