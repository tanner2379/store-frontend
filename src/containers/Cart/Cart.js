import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios-orders';

import CartItem from './CartItem/CartItem';
import Aux from '../../hoc/Aux/Aux';

const Cart = props => {
  const [cartItems, setCartItems] = useState({});
  
  useEffect(() => {
    axios.get('/cart_items', { withCredentials: true})
      .then(response => {
        setCartItems(response.data.cart_items);
      })
      .catch(error => {
        console.log("Cart Item retrieval error", error);
      })
  }, [])

  const handleDelete = () => {
    props.history.push('/cart');
  }
  
  let cartList = null;
  if (cartItems && cartItems[0]) {
    cartList = (
      <Aux>
        {cartItems.map(cartItem => {
          return(
            <CartItem
              key={cartItem.id}
              id={cartItem.id}
              imageUrl={cartItem.image_url}
              productName={cartItem.product_name}
              productPrice={cartItem.product_price}
              quantity={cartItem.quantity}
              handleDelete={handleDelete} />
            )
          }
        )}
      </Aux>
    )
  }

  return (
    <div>
      Your Cart
      {cartList}
      <Link to={'/checkout'}>
        Checkout
      </Link>
    </div>
  )
}

export default Cart