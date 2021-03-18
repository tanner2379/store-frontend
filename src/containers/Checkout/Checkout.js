import React, { useState, useEffect, useContext } from 'react';
import axios from '../../axios-orders';

import { inputChangedHandler } from '../../shared/utility';
import { UserContext } from '../../contexts/UserContext';
import { CartItemContext } from '../../contexts/CartItemContext';
import { PaymentIntentContext } from '../../contexts/PaymentIntentContext';

import PaymentMethodSelector from '../../components/Selectors/PaymentMethod/PaymentMethod';
import ShippingSelector from '../../components/Selectors/Shipping/Shipping';
import CountrySelector from '../../components/Selectors/Country/Country';
import StateSelector from '../../components/Selectors/State/State';
import MonthSelector from '../../components/Selectors/Month/Month';
import YearSelector from '../../components/Selectors/Year/Year';
import Aux from '../../hoc/Aux/Aux';

import classes from './Checkout.module.css';


const Checkout = props => {
  const userInfo = useContext(UserContext)[0];
  const cartItems = useContext(CartItemContext)[0];
  const setPaymentIntent = useContext(PaymentIntentContext)[1];
  const [shippingOptions, setShippingOptions] = useState([]);
  const [paymentMethodOptions, setPaymentMethodOptions] = useState([]);

  const [formValue, setFormValue] = useState({
    cartItems: {
      value: [],
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    name: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    paymentMethod: {
      value: '',
      validation: {
        required: false
      },
      valid: false,
      touched: false,
    },
    shippingDetails: {
      value: '',
      validation: {
        required: false
      },
      valid: false,
      touched: false,
    },
    cardNumber: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    cardExpMonth: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    cardExpYear: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    cardCVV: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    addressLine1: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    addressLine2: {
      value: '',
      validation: {
        required: false
      },
      valid: false,
      touched: false,
    },
    city: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    country: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    state: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    postalCode: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
  })

  useEffect(() => {
    if (userInfo.loggedIn === 'LOGGED_IN'){
      axios.get('/customerinfo')
      .then(response => {
        setShippingOptions(response.data.shippingOptions);
        setPaymentMethodOptions(response.data.paymentOptions);
      })
      .catch(error => {
        console.log('saved methods get error', error);
      }, [])
    }

    let itemIds = []
    cartItems.map(cartItem => {
      itemIds.push(cartItem.id);
    });

    setFormValue({...formValue, cartItems: {...formValue.cartItems, value: itemIds}})
  }, [userInfo.loggedIn])

  const setFormIsValid = useState(false)[1];

  const handleChange = event => {
    const [valueOut, validOut] = inputChangedHandler(event, formValue);

    setFormValue(valueOut);
    setFormIsValid(validOut);
  }

  const handleSubmit = event => {
    axios.post('/charges', {
      cart_items: formValue.cartItems.value,
      name: formValue.name.value,
      payment_method: formValue.paymentMethod.value,
      shipping_details: formValue.shippingDetails.value,
      card_number: formValue.cardNumber.value,
      card_expires_month: formValue.cardExpMonth.value,
      card_expires_year: formValue.cardExpYear.value,
      card_cvv: formValue.cardCVV.value,
      address_line1: formValue.addressLine1.value,
      address_line2: formValue.addressLine2.value,
      city: formValue.city.value,
      country: formValue.country.value,
      state: formValue.state.value,
      postal_code: formValue.postalCode.value
    })
    .then(response => {
      if (response.data.status === 200 ) {
        console.log(response.data.payment_intent);
        setPaymentIntent(response.data.payment_intent);
        props.history.push('/confirm');
      } else {
        console.log("Form Error")
      }
    }).catch(error => {
      console.log("Form Error", error);
    });
    
    event.preventDefault();
  }

  let shippingDropdown = null;
  if (shippingOptions[0]){
    shippingDropdown = <ShippingSelector options={shippingOptions} onChange={(event) => handleChange(event)} />
  }

  const shippingValue = formValue.shippingDetails.value;
  let shippingFields = null;
  
  if (shippingDropdown && (shippingValue === 'Select Saved Address' || shippingValue === '')) {
    shippingFields = (
      <Aux>
        <input
          type="text"
          name="addressLine1"
          placeholder="Address Line 1"
          onChange={(event) => handleChange(event)}
          required />
        <input
          type="text"
          name="addressLine2"
          placeholder="Address Line 2"
          onChange={(event) => handleChange(event)} />
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={(event) => handleChange(event)}
          required />
        <CountrySelector
          placeholder="Country"
          onChange={(event) => handleChange(event)}
          required />
        {formValue.country.value === 'US'
          ? <StateSelector
              placeholder="State"
              onChange={(event) => handleChange(event)}
              required />
          : null
        }
        <input
          type="text"
          name="postalCode"
          max={99999}
          placeholder="Postal Code"
          onChange={(event) => handleChange(event)}
          required />
      </Aux>
    )
  }

  const payValue = formValue.paymentMethod.value;
  let paymentMethodDropdown = null;

  if (paymentMethodOptions[0]) {
    paymentMethodDropdown = <PaymentMethodSelector options={paymentMethodOptions} onChange={(event) => handleChange(event)} />
  }
  let paymentFields = null;
  if (paymentMethodDropdown && (payValue === 'Select Saved Payment Method' || payValue === '')) {
    paymentFields = (
      <Aux>
        <input
          type="number"
          name="cardNumber"
          min={1000000000000000}
          max={9999999999999999}
          placeholder="Card Number, no spaces or symbols"
          onChange={(event) => handleChange(event)}
          required />
        <MonthSelector
          placeholder="Expiration Month"
          onChange={(event) => handleChange(event)} />
        <YearSelector
          placeholder="Expiration Year"
          onChange={(event) => handleChange(event)} />
        <input
          type="number"
          name="cardCVV"
          max={9999}
          placeholder="CVV"
          onChange={(event) => handleChange(event)}
          required />
        </Aux>
      )
  }
  
  return (
    <div className={classes.Checkout}>
      <div className = {classes.formWrapper} >
        <h2>Payment Details</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={(event) => handleChange(event)}
            required />
          {paymentMethodDropdown}
          {shippingDropdown}
          {paymentFields}
          {shippingFields}
          <button type="submit" className={classes.logButton}>Continue to Confirm</button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;