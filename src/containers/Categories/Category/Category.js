import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../../axios-orders';

import { UserContext } from '../../../contexts/UserContext';

import ProductThumb from '../../../components/Thumbs/Product/Product';
import Aux from '../../../hoc/Aux/Aux';

import classes from './Category.module.css';

const Category = props => {
  const { slug } = useParams();
  const userInfo = useContext(UserContext)[0];

  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`/categories/${slug}`)
      .then(response => {
        setCategory(response.data.category)
        setProducts(response.data.products);
      })
      .catch(error => {
        console.log("Error fetching products", error);
      })
  }, [])

  const handleDelete = event => {
    axios.delete(`/categories/${slug}`, {
      slug: slug
    })
    .then(response => {
      if (response.data.status === "deleted") {
        props.history.push(`/users/${userInfo.user.id}`);
      } else {
        console.log("Category Delete Error", response.data.status)
      }
    }).catch(error => {
      console.log("Category Delete Error", error);
    });
    
    event.preventDefault();
  }


  return (
    <div className={classes.Category}>
      {userInfo.user.vendor
        ? <Aux>
            <Link to={`/categories/${slug}/edit`}>Edit Category</Link>
            <button onClick={(event) => handleDelete(event)}>Delete Category</button>
          </Aux>
        : null
      }
      <h1 className={classes.Title}>{category}</h1>
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
  )
}

export default Category;