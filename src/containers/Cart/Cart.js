import React, {useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios-orders';

import { currency } from '../../shared/utility';

import { CartItemContext } from '../../contexts/CartItemContext';

import CartItem from './CartItem/CartItem';
import Aux from '../../hoc/Aux/Aux';

const Cart = props => {
  const [cartItems, setCartItems] = useContext(CartItemContext);
  const [inputTimer, setInputTimer] = useState(null);
  const [quantityArray, setQuantityArray] = useState([]);
  
  useEffect(() => {
    axios.get('/cart_items')
      .then(response => {
        setCartItems(response.data.cart_items);
        const quantityMap = response.data.cart_items.map(cartItem => {
          return cartItem.quantity;
        })
        setQuantityArray(quantityMap);
      })
      .catch(error => {
        console.log("Cart Item retrieval error", error);
      })
  }, [setQuantityArray])

  const handleUpdateQuantity = (cartItemId, quantity) =>{
    axios.patch(`/cart_items/${cartItemId}`,
      {
        quantity: quantity
      }
    )
      .then(response => {
        if (response.data.status === 200) {
          console.log("Quantity updated!", response.data)
          props.history.push('/cart');
        } else {
          console.log("Quantity not updated", response.data)
        }
      })
      .catch(error => {
        console.log("CartItem update error", error)
      })
  }

  const handleQuantityAdd = (cartItemId, inStock, index) => {
    const quantity = quantityArray[index];

    if (quantity < inStock) {
      quantityArray.splice(index, 1, quantity + 1);
      setQuantityArray([...quantityArray]);
    }

    if (inputTimer) {
      setInputTimer(null);
    }
    setInputTimer(
      setTimeout(function () {
        handleUpdateQuantity(cartItemId, quantityArray[index]);
      }, 5000)
    )
  }

  const handleQuantitySubtract = (cartItemId, index) => {
    const quantity = quantityArray[index];

    if (quantity > 0){
      quantityArray.splice(index, 1, quantity - 1);
      setQuantityArray([...quantityArray]);
    }

    if (inputTimer) {
      setInputTimer(null);
    }
    setInputTimer(
      setTimeout(function () {
        handleUpdateQuantity(cartItemId, quantityArray[index]);
      }, 5000)
    )
  }

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
              productPrice={currency(cartItem.product_price)}
              quantity={quantityArray[cartItems.indexOf(cartItem)]}
              increaseQuantity={() => handleQuantityAdd(cartItem.id, cartItem.product_in_stock, cartItems.indexOf(cartItem))}
              decreaseQuantity={() => handleQuantitySubtract(cartItem.id, cartItems.indexOf(cartItem))}
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