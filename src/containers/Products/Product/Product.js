import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../../axios-orders';

import { UserContext } from '../../../contexts/UserContext';
import { CartItemContext } from '../../../contexts/CartItemContext';

import Aux from '../../../hoc/Aux/Aux';
import Lightbox from '../../../components/UI/Lightbox/Lightbox';
import AddArrow from '../../../components/svg/AddArrow/AddArrow';
import SubtractArrow from '../../../components/svg/SubtractArrow/SubtractArrow';

import classes from './Product.module.css';

const Product = props => {
  const { slug } = useParams();
  const userInfo = useContext(UserContext)[0];
  const [cartItems, setCartItems] = useContext(CartItemContext);
  const [product, setProduct] = useState({});
  const [featuredImageIndex, setFeaturedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [lightboxDisplay, setLightboxDisplay] = useState(false);

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
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const handleFeaturedImageIndexChange = index => {
    setFeaturedImageIndex(index);
  }

  const toggleLightbox = () => {
    setLightboxDisplay(!lightboxDisplay);
  };

  let lightbox = null;
  if (product.images && lightboxDisplay) {
    lightbox = (
      <Lightbox
        images={product.images}
        initialIndex={featuredImageIndex}
        toggleLightbox={toggleLightbox}
        show={lightboxDisplay} />
    )
  }

  return (
    <Aux>
      {lightbox}
      <div className={classes.Product}>
        <div className={classes.productImages}>
          {product.images
            ? <div className={classes.featuredImage}>
                <img src={'http://localhost:5000/' + product.images[featuredImageIndex].url} alt="First Image" onClick={toggleLightbox}/>
              </div>
            : <div className={classes.featuredImage}>
              </div>
          }
          
          <div className={classes.imageThumbs}>
            { product.images
              ? product.images.map(image => {
                  if(product.images.indexOf(image) !== featuredImageIndex){
                    return <img src={'http://localhost:5000/' + image.url} alt="imageThumb" className={classes.thumbImage} onClick={() => handleFeaturedImageIndexChange(product.images.indexOf(image))}/>
                  }
                })
              : null
            }
          </div>
        </div>
        <div className={classes.productInfo}>
          {userInfo.user.vendor
            ? <Aux>
                <Link to={`/products/${slug}/edit`}>Edit Product</Link>
                <button onClick={(event) => handleDelete(event)}>Delete Product</button>
              </Aux>
            : null
          }
          <h1 className={classes.Title}>{product.name}</h1>
          <p className={classes.description}>{product.description}</p>
        </div>
        <div className={classes.quantityControls}>
            {
              product.in_stock > 0
              ?  <Aux>
                    <p className={classes.controlLabel}>Quantity</p>
                    <div className={classes.controlButtons} >
                      <div className={classes.subtractWrapper}>
                        <SubtractArrow onclick={handleQuantitySubtract} />
                      </div>
                      <p className={classes.quantity} >{quantity}</p>
                      <div className={classes.addWrapper}>
                        <AddArrow onclick={handleQuantityAdd} />
                      </div>
                    </div>
                    <button onClick={handleAddToCart} className={[classes.button, classes.cart].join(' ')} >Add to Cart</button>
                  </Aux>  
              : <p>Out of Stock</p>
            }
          </div>
      </div>
    </Aux>
  )
}

export default Product;