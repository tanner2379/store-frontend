import React, {useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios-orders';

import { CartItemContext } from '../../contexts/CartItemContext';

import CartItem from './CartItem/CartItem';
import Aux from '../../hoc/Aux/Aux';

const Cart = props => {
  const [cartItems, setCartItems] = useContext(CartItemContext);
  
  useEffect(() => {
    axios.get('/cart_items')
      .then(response => {
        setCartItems(response.data.cart_items);
      })
      .catch(error => {
        console.log("Cart Item retrieval error", error);
      })
  }, [])

  const handleDelete = (cartItemId) => {
    const index = cartItems.indexOf(cartItemId);
    if (index > -1) {
      cartItems.splice(index, 1);
      setCartItems(cartItems)
    }
    props.history.push('/cart');
  }
  
  let cartList = null;
  if (cartItems) {
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
              handleDelete={() => handleDelete(cartItem.id)} />
            )
          }
        )}
      </Aux>
    )
  }

  let checkoutLink = null;
  if (cartItems) {
    checkoutLink = <Link to={'/checkout'}>Checkout</Link>
  }

  return (
    <div>
      Your Cart
      {cartList}
      {checkoutLink}
    </div>
  )
}

export default Cart