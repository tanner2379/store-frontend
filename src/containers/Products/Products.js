import React, { useState, useEffect } from 'react';
import axios from '../../axios-orders';

import ProductThumb from '../../components/Thumbs/Product/Product';

import classes from './Products.module.css';

const Products = props => {

  const [products, setProducts] = useState([])
  
  useEffect(() => {
    axios.get('/products', {withCredentials: true})
    .then(response => {
      setProducts(response.data);
    }).catch(error => {
      console.log("Error Loading Products", error);
    })
  }, [])

  return (
    <div>
      <h1 className={classes.Title}>Our Products</h1>
      {products.map(product =>{
        if (product.images[0]) {
          return <ProductThumb 
            key={product.id}
            name={product.name}
            slug={product.slug}
            description={product.description}
            price={product.price}
            imageUrl={'http://localhost:5000' + product.images[0].url}
            />
        } 
        else {
          return <ProductThumb
            key={product.id}
            name={product.name}
            slug={product.slug}
            description={product.description}
            price={product.price} />
        }
      })}
    </div>
  )
}

export default Products