import React from 'react';
import { Link } from 'react-router-dom';

import { currency } from '../../../shared/utility';

import classes from './Product.module.css'

const Product = props => {
  return (
    <Link to={`/products/${props.slug}`} className={classes.Product}>
      {props.imageUrl
        ? <img src={props.imageUrl} alt={props.name} />
        : null
      }
      <p className={classes.name}>{props.name}</p>
      <p className={classes.description}>{props.description}</p>
      <p className={classes.price}>{currency(props.price)}</p>
    </Link>
  )
}

export default Product