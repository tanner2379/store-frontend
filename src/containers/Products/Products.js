import React, { useState, useEffect } from 'react';
import axios from '../../axios-orders';

import ProductThumb from '../../components/Thumbs/Product/Product';

import classes from './Products.module.css';

const Products = props => {

  const [products, setProducts] = useState([])
  
  useEffect(() => {
    axios.get('/products')
    .then(response => {
      setProducts(response.data);
    }).catch(error => {
      console.log("Error Loading Products", error);
    })
  }, [])

  return (
    <div className={classes.Products}>
      <p className={classes.Title}>Our Products</p>
      <div className={classes.productWrapper}>
        {products.map(product =>{
          if (product.images[0]) {
            return <ProductThumb 
              key={product.id}
              name={product.name}
              slug={product.slug}
              description={product.description}
              price={product.price}
              imageUrl={'http://localhost:5000/' + product.images[0].url}
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
    </div>
  )
}

export default Products