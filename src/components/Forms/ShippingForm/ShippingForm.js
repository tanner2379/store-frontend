import React, { useState } from 'react';
import axios from '../../../axios-orders';

import { inputChangedHandler } from '../../../shared/utility';

import Aux from '../../../hoc/Aux/Aux';

const ShippingForm = props => {
  const [formValue, setFormValue] = useState({
    shippingCompany: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    trackingNumber: {
      value: '',
      validation: {
        required: false
      },
      valid: false,
      touched: false,
    },
  })
  const setFormIsValid = useState(false)[1];

  const handleChange = event => {
    const [valueOut, validOut] = inputChangedHandler(event, formValue);

    setFormValue(valueOut);
    setFormIsValid(validOut);
  }

  

  const handleSubmit = event => {
    axios.patch('/shipped', {
      invoice_id: props.invoiceId,
      shipping_company: formValue.shippingCompany.value,
      tracking_number: formValue.trackingNumber.value,
    })
    .then(response => {
      if (response.data.status === 200 ) {
        console.log("Success!");
        props.history.push('/invoices');
      } else {
        console.log("Error updating shipping status")
      }
    }).catch(error => {
      console.log("Error updating shipping status", error);
    });
    
    event.preventDefault();
  }
  return (
    <Aux>
      <h2>Shipping Information</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="shippingCompany"
          placeholder="Shipping Company"
          onChange={(event) => handleChange(event)}
          required />
        <input
          type="text"
          name="trackingNumber"
          placeholder="Tracking Number"
          onChange={(event) => handleChange(event)} />
        <button type="submit">Submit Changes</button>
      </form>
    </Aux>
  )
}

export default ShippingForm