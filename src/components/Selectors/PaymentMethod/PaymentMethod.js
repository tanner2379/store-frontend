import React from 'react';

const PaymentMethodSelector = props => {
  let paymentOptions = null;

  if (props.options) {
    paymentOptions = props.options.map(option => {
      return <option key={option[0]} value={option[1]}>{option[0]}</option>
    })
  }

  return (
    <select name="paymentMethod" id="paymentMethod" placeholder={props.placeholder} onChange={props.onChange} required={props.required} >
      <option>Select Saved Payment Method</option>
      {paymentOptions}
    </select>
  )
}

export default PaymentMethodSelector