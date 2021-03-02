import React from 'react';
import { Link } from 'react-router-dom';

const Checkout = props => {
  return (
    <div>
      Checkout
      <Link to={'/confirm'} >
        Confirm
      </Link>
    </div>
  )
}

export default Checkout