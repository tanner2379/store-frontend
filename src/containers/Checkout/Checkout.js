import React, { useState, useEffect, useContext } from 'react';
import axios from '../../axios-orders';

import { inputChangedHandler } from '../../shared/utility';
import { UserContext } from '../../contexts/UserContext';

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
  const [cartItems, setCartItems] = useState([]);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [paymentMethodOptions, setPaymentMethodOptions] = useState([]);
  const [billingAsShipping, setBillingAsShipping] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);
  const [isProcessing, setProcessingTo] = useState(false);

  const [formValue, setFormValue] = useState({
    cartItems: {
      value: [],
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    billingName: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    billingAddressLine1: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    billingAddressLine2: {
      value: '',
      validation: {
        required: false
      },
      valid: false,
      touched: false,
    },
    billingCity: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    billingCountry: {
      value: 'US',
      validation: {
        required: true
      },
      valid: true,
      touched: false,
    },
    billingState: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    billingPostalCode: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    billingEmail: {
      value: '',
      validation: {
        required: createAccount
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
    name: {
      value: '',
      validation: {
        required: !billingAsShipping
      },
      valid: false,
      touched: false,
    },
    addressLine1: {
      value: '',
      validation: {
        required: !billingAsShipping
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
        required: !billingAsShipping
      },
      valid: false,
      touched: false,
    },
    country: {
      value: 'US',
      validation: {
        required: !billingAsShipping
      },
      valid: true,
      touched: false,
    },
    state: {
      value: '',
      validation: {
        required: !billingAsShipping
      },
      valid: false,
      touched: false,
    },
    postalCode: {
      value: '',
      validation: {
        required: !billingAsShipping
      },
      valid: false,
      touched: false,
    },
    password: {
      value: '',
      validation: {
        required: createAccount
      },
      valid: false,
      touched: false,
    },
    password_confirmation: {
      value: '',
      validation: {
        required: createAccount
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
        setCartItems(response.data.cartItems);
      })
      .catch(error => {
        console.log('saved methods get error', error);
      }, [])
    }

  }, [userInfo.loggedIn])

  const setFormIsValid = useState(false)[1];

  const handleChange = event => {
    const [valueOut, validOut] = inputChangedHandler(event, formValue);

    setFormValue(valueOut);
    setFormIsValid(validOut);
  }

  const toggleBillingAsShipping = () => {
    setBillingAsShipping(!billingAsShipping);
  }

  const toggleCreateAccount = () => {
    setCreateAccount(!createAccount);
  }

  const handleSubmit = event => {
    if(billingAsShipping) {
      setProcessingTo(true);
      axios.post('/charges', {
        create_account: createAccount,
        billing_as_shipping: billingAsShipping,
        cart_items: cartItems,
        payment_method: formValue.paymentMethod.value,
        shipping_details: formValue.shippingDetails.value,
        billing_name: formValue.billingName.value,
        billing_address_line1: formValue.billingAddressLine1.value,
        billing_address_line2: formValue.billingAddressLine2.value,
        billing_city: formValue.billingCity.value,
        billing_country: formValue.billingCountry.value,
        billing_state: formValue.billingState.value,
        billing_postal_code: formValue.billingPostalCode.value,
        billing_email: formValue.billingEmail.value,
        card_number: formValue.cardNumber.value,
        card_expires_month: formValue.cardExpMonth.value,
        card_expires_year: formValue.cardExpYear.value,
        card_cvv: formValue.cardCVV.value,
        password: formValue.password.value,
        password_confirmation: formValue.password_confirmation.value,
      })
      .then(response => {
        if (response.data.status === 200 ) {
          localStorage.setItem("paymentInfo", JSON.stringify({
            payment_intent: response.data.payment_intent,
            shipping: response.data.shipping,
            name: response.data.name,
            lastFour: response.data.lastFour,
            cartItems: response.data.cart_items,
          }));
          setProcessingTo(false);
          props.history.push('/confirm');
        } else {
          setProcessingTo(false);
          console.log("Form Error")
        }
      }).catch(error => {
        setProcessingTo(false);
        console.log("Form Error", error);
      });
    } else {
      setProcessingTo(true);

      axios.post('/charges', {
        create_account: createAccount,
        billing_as_shipping: billingAsShipping,
        cart_items: cartItems,
        payment_method: formValue.paymentMethod.value,
        shipping_details: formValue.shippingDetails.value,
        billing_name: formValue.billingName.value,
        billing_address_line1: formValue.billingAddressLine1.value,
        billing_address_line2: formValue.billingAddressLine2.value,
        billing_city: formValue.billingCity.value,
        billing_country: formValue.billingCountry.value,
        billing_state: formValue.billingState.value,
        billing_postal_code: formValue.billingPostalCode.value,
        billing_email: formValue.billingEmail.value,
        card_number: formValue.cardNumber.value,
        card_expires_month: formValue.cardExpMonth.value,
        card_expires_year: formValue.cardExpYear.value,
        card_cvv: formValue.cardCVV.value,
        name: formValue.name.value,
        address_line1: formValue.addressLine1.value,
        address_line2: formValue.addressLine2.value,
        city: formValue.city.value,
        country: formValue.country.value,
        state: formValue.state.value,
        postal_code: formValue.postalCode.value,
        password: formValue.password.value,
        password_confirmation: formValue.password_confirmation.value,
      })
      .then(response => {
        if (response.data.status === 200 ) {
          localStorage.setItem("paymentInfo", JSON.stringify({
            payment_intent: response.data.payment_intent,
            shipping: response.data.shipping,
            name: response.data.name,
            lastFour: response.data.lastFour,
            cartItems: response.data.cart_items
          }));
          setProcessingTo(false);
          props.history.push('/confirm');
        } else {
          setProcessingTo(false);
          console.log("Form Error")
        }
      }).catch(error => {
        setProcessingTo(false);
        console.log("Form Error", error);
      });
    }

    
    event.preventDefault();
  }

  let shippingDropdown = null;
  if (shippingOptions[0] &&!billingAsShipping){
    shippingDropdown = <ShippingSelector options={shippingOptions} onChange={(event) => handleChange(event)} />
  }

  const shippingValue = formValue.shippingDetails.value;
  let shippingFields = null;
  
  if ((shippingDropdown && shippingValue === 'Select Saved Address') || (!billingAsShipping && shippingValue === '')) {
    shippingFields = (
      <Aux>
        <label for="name">Name</label>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Name"
          onChange={(event) => handleChange(event)}
          required={!billingAsShipping} />
        <label for="addressLine1">Address Line 1</label>
        <input
          className={classes.Input}
          type="text"
          name="addressLine1"
          placeholder="Address Line 1"
          onChange={(event) => handleChange(event)}
          required={!billingAsShipping} />
        <label for="addressLine2">Address Line 2</label>
        <input
          className={classes.Input}
          type="text"
          name="addressLine2"
          placeholder="Address Line 2"
          onChange={(event) => handleChange(event)}
          required={!billingAsShipping} />
        <label for="city">City</label>
        <input
          className={classes.Input}
          type="text"
          name="city"
          placeholder="City"
          onChange={(event) => handleChange(event)}
          required={!billingAsShipping} />
        <label for="postalCode">Postal Code</label>
        <input
          className={classes.Input}
          type="text"
          name="postalCode"
          max={99999}
          placeholder="Postal Code"
          onChange={(event) => handleChange(event)}
          required={!billingAsShipping} />
        <label for="country">Country</label>
        <CountrySelector
          name="country"
          placeholder="Country"
          onChange={(event) => handleChange(event)}
          required={!billingAsShipping} />
        {formValue.country.value === 'US'
          ? <Aux>
              <label for="state">State</label>
              <StateSelector
                name="state"
                placeholder="Select a State"
                onChange={(event) => handleChange(event)}
                required={!billingAsShipping} />
            </Aux>
          : null
        }
      </Aux>
    )
  }

  const payValue = formValue.paymentMethod.value;
  let paymentMethodDropdown = null;

  if (paymentMethodOptions[0]) {
    paymentMethodDropdown = <PaymentMethodSelector options={paymentMethodOptions} onChange={(event) => handleChange(event)} />
  }
  let paymentFields = null;
  if ((paymentMethodDropdown && payValue === 'Select Saved Payment Method') || payValue === '') {
    paymentFields = (
      <Aux>
        <label for="billingName">Name on Card</label>
        <input
          className={classes.Input}
          type="text"
          name="billingName"
          placeholder="Name"
          onChange={(event) => handleChange(event)}
          required />
        <label for="cardNumber">Card Number</label>
        <input
          className={classes.Input}
          type="number"
          name="cardNumber"
          min={1000000000000000}
          max={9999999999999999}
          placeholder="Card Number, no spaces or symbols"
          onChange={(event) => handleChange(event)}
          required />
        <label for="cardExpMonth">Expiration Month</label>
        <MonthSelector
          name="cardExpMonth"
          placeholder="Expiration Month"
          onChange={(event) => handleChange(event)} />
        <label for="cardExpYear">Expiration Year</label>
        <YearSelector
          name="cardExpYear"
          placeholder="Expiration Year"
          onChange={(event) => handleChange(event)} />
        <label for="cardCVV">CVV</label>
        <input
          className={classes.Input}
          type="number"
          name="cardCVV"
          max={9999}
          placeholder="CVV"
          onChange={(event) => handleChange(event)}
          required />
        <label for="billingEmail">Email Address (Not required unless creating account)</label>
        <input
          className={classes.Input}
          type="email"
          name="billingEmail"
          placeholder="Email Address"
          onChange={(event) => handleChange(event)}
          required={createAccount} />
        </Aux>
      )
  }

  let billingAddressFields = null
  if (!paymentMethodDropdown || ((paymentMethodDropdown && payValue === 'Select Saved Payment Method') || payValue === '' )){
    billingAddressFields = (
      <div className={classes.billingAddressFields}>
        <p className={classes.subTitle}>Billing Address</p>
        <label for="useBillingAddress">Use Billing Address for Shipping?</label>
        <input
          className={classes.Input}
          type="checkbox"
          name="useBillingAddress"
          onChange={toggleBillingAsShipping} />
        <label for="billingAddressLine1">Address Line 1</label>
        <input
          className={classes.Input}
          type="text"
          name="billingAddressLine1"
          placeholder="Address Line 1"
          onChange={(event) => handleChange(event)}
          required />
        <label for="billingAddressLine2">Address Line 2</label>
        <input
          className={classes.Input}
          type="text"
          name="billingAddressLine2"
          placeholder="Address Line 2"
          onChange={(event) => handleChange(event)} />
        <label for="billingCity">City</label>
        <input
          className={classes.Input}
          type="text"
          name="billingCity"
          placeholder="City"
          onChange={(event) => handleChange(event)}
          required />
        <label for="billingPostalCode">Postal Code</label>
        <input
          className={classes.Input}
          type="text"
          name="billingPostalCode"
          max={99999}
          placeholder="Postal Code"
          onChange={(event) => handleChange(event)}
          required />
        <label for="billingCountry">Country</label>
        <CountrySelector
          name="billingCountry"
          placeholder="Country"
          onChange={(event) => handleChange(event)}
          required />
        {formValue.country.value === 'US'
          ? <Aux>
              <label for="billingState">State</label>
              <StateSelector
                name="billingState"
                placeholder="Select a State"
                onChange={(event) => handleChange(event)}
                required />
            </Aux>
          : null
        }
      </div>
    )
  }

  
  return (
    <div className={classes.Checkout}>
      <p className={classes.Title}>Payment Details</p>
      <form onSubmit={handleSubmit}>
        <div className = {classes.fieldWrapper} >
          <div className={classes.paymentFields}>
            <p className={classes.subTitle}>Payment Fields</p>
            {paymentMethodDropdown}
            {paymentFields}
          </div>
          {billingAddressFields}
          {!billingAsShipping
            ?<div className={classes.shippingFields}>
                <p className={classes.subTitle}>Shipping Address</p>
                {shippingDropdown}
                {shippingFields}
              </div>
            : null}
        </div>
        <label for="createAccount">Create Account to Save Payment/Shipping Info? (We do not store your card information)</label>
        <input
          className={classes.Input}
          type="checkbox"
          name="createAccount"
          onChange={toggleCreateAccount} />
        {createAccount
          ? <Aux>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(event) => handleChange(event)}
                required={createAccount}
                className={classes.Input} />
              <input
                type="password"
                name="password_confirmation"
                placeholder="Password Confirmation"
                onChange={(event) => handleChange(event)}
                required={createAccount}
                className={classes.Input} />
          </Aux>
          : null
        }
        <div className={classes.checkoutButtonWrapper}>
          <button type="submit" disabled={isProcessing} className={classes.checkoutButton}>Continue to Confirm</button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;