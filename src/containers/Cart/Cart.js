import React, {useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios-orders';

import { currency } from '../../shared/utility';

import CartItem from './CartItem/CartItem';
import Aux from '../../hoc/Aux/Aux';

import classes from './Cart.module.css';

const Cart = props => {
  const [cartItems, setCartItems] = useState([]);
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

  const handleUpdateQuantity = (cartItemId, index) =>{

    if(quantityArray[index] !== cartItems[index].quantity) {
      axios.patch(`/cart_items/${cartItemId}`,
        {
          quantity: quantityArray[index]
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
  }

  const handleQuantityAdd = (cartItemId, inStock, index) => {
    const quantity = quantityArray[index];

    if (quantity < inStock) {
      quantityArray.splice(index, 1, quantity + 1);
      setQuantityArray([...quantityArray]);
    }

    if (inputTimer) {
      clearTimeout(inputTimer);
      setInputTimer(null);
    }
    setInputTimer(
      setTimeout(function () {
        handleUpdateQuantity(cartItemId, index);
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
      clearTimeout(inputTimer);
      setInputTimer(null);
    }
    setInputTimer(
      setTimeout(function () {
        handleUpdateQuantity(cartItemId, index);
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
              productPrice={
                cartItem.product_price
                ? currency(cartItem.product_price)
                : null
              }
              quantity={quantityArray[cartItems.indexOf(cartItem)]}
              totalPrice={
                cartItem.product_price
                ? currency(cartItem.product_price * quantityArray[cartItems.indexOf(cartItem)])
                : null
              }
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
  let totalPrice = 0;
  if (cartItems) {
    checkoutLink = <Link to={'/checkout'}>Check Out</Link>
    for (let i = 0; i < cartItems.length; i++) {
      totalPrice += (cartItems[i].product_price * cartItems[i].quantity);
    }
  }

  return (
    <div className={classes.Cart}>
      <p className={classes.Title}>Your Cart</p>
      {/* <div className={classes.columnTitles}>
        <p className={classes.itemName}>Item Name</p>
        <p className={classes.itemCost}>Item Cost</p>
        <p className={classes.itemQuantity}>Item Quantity</p>
        <p className={classes.lineCost}>Line Cost</p>
      </div> */}
      <div className={classes.cartList}>
        {cartList}
      </div>
      {cartItems
        ? <p className={classes.total}>Total: {currency(totalPrice)}</p>
        : null
      }
      <div className={classes.checkoutLink}>
        {checkoutLink}
      </div>
    </div>
  )
}

export default Cart