import React from 'react';
import { Link } from 'react-router-dom';

const Cart = props => {
  return (
    <div>
      Your Cart
      <Link to={'/checkout'}>
        Checkout
      </Link>
    </div>
  )
}

export default Cart