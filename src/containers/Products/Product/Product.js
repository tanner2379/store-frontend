import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../../axios-orders';

import { UserContext } from '../../../contexts/UserContext';
import { CartItemContext } from '../../../contexts/CartItemContext';

import Aux from '../../../hoc/Aux/Aux';

import classes from './Product.module.css';

const Product = props => {
  const { slug } = useParams();
  const userInfo = useContext(UserContext)[0];
  const [cartItems, setCartItems] = useContext(CartItemContext);
  const [product, setProduct] = useState({});

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`/products/${slug}`, {
      slug: slug})
      .then(response => {
        setProduct(response.data)
        if (response.data.in_stock === 0) {
          setQuantity(0);
        }
      })
      .catch(error => {
        console.log("Error fetching product", error);
      })
  }, [])

  const handleDelete = event => {
    axios.delete(`/products/${slug}`, {
      slug: slug
    })
    .then(response => {
      if (response.data.status === "deleted") {
        props.history.push(`/users/${userInfo.user.id}`);
      } else {
        console.log("Product Delete Error", response.data.status)
      }
    }).catch(error => {
      console.log("Product Delete Error", error);
    });
    
    event.preventDefault();
  }

  const handleAddToCart = () => {
    if (userInfo.loggedIn === "LOGGED_IN") {
      axios.post(`/cart_items`, {
        user_id: userInfo.user.id,
        product_id: product.id,
        quantity: quantity
      })
      .then(response => {
        if (response.data.status === "created"){
          console.log("created", response.data.cart_item);
          if (!cartItems.includes(response.data.cart_item)){
            setCartItems([...cartItems, response.data.cart_item])
          }
          props.history.push('/cart');
        } else {
          console.log("Cart Item creation error");
        }
      })
      .catch(error => {
        console.log("Cart Item creation error", error);
      })
    } else {
        axios.post(`/cart_items`, {
          product_id: product.id,
          quantity: 1
        })
        .then(response => {
          if (response.data.status === "created"){
            console.log("created", response.data);
            props.history.push('/cart');
          } else {
            console.log("Cart Item creation error");
          }
        })
        .catch(error => {
          console.log("Cart Item creation error", error);
        })
    }
  }

  const handleQuantityAdd = () => {
    if (quantity < product.in_stock) {
      setQuantity(quantity + 1);
    }
  }

  const handleQuantitySubtract = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <div className={classes.Product}>
      {userInfo.user.vendor
        ? <Aux>
            <Link to={`/products/${slug}/edit`}>Edit Product</Link>
            <button onClick={(event) => handleDelete(event)}>Delete Product</button>
          </Aux>
        : null
      }
      <h1 className={classes.Title}>{product.name}</h1>
        {
          quantity > 0
          ?  <Aux>
                <button onClick={handleQuantitySubtract} >-</button>
                <p>{quantity}</p>
                <button onClick={handleQuantityAdd} >+</button>
                <button onClick={handleAddToCart} >Add to Cart</button>
              </Aux>  
          : <p>Out of Stock</p>
        }
      {/* {products.map(product =>{
        if (product.images[0]) {
          return <ProductThumb 
            key={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            imageUrl={'http://localhost:5000/' + product.images[0].url}
            />
        } 
        else {
          return <ProductThumb
            key={product.id}
            name={product.name}
            description={product.description}
            price={product.price} />
        }
      })} */}
    </div>
  )
}

export default Product;