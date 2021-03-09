import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../../axios-orders';

import { UserContext } from '../../../contexts/UserContext';
import Aux from '../../../hoc/Aux/Aux';

import classes from './Product.module.css';

const Product = props => {
  const { slug } = useParams();
  const userInfo = useContext(UserContext)[0];
  const [product, setProduct] = useState({});

  useEffect(() => {
    console.log("hello")
    axios.get(`/products/${slug}`, {
      slug: slug},
      { withCredentials: true })
      .then(response => {
        setProduct(response.data)
      })
      .catch(error => {
        console.log("Error fetching product", error);
      })
  }, [])

  const handleDelete = event => {
    axios.delete(`/products/${slug}`, {
      slug: slug
    }, { withCredentials: true})
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
        quantity: 1
      }, { withCredentials: true })
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
    } else {
        axios.post(`/cart_items`, {
          product_id: product.id,
          quantity: 1
        }, { withCredentials: true })
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
      <button onClick={handleAddToCart} >Add to Cart</button>
      {/* {products.map(product =>{
        if (product.images[0]) {
          return <ProductThumb 
            key={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            imageUrl={'http://localhost:5000' + product.images[0].url}
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