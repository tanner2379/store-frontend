import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Category.module.css'

const Category = props => {
  return (
    <Link to={`/categories/${props.slug}`} className={classes.Category}>
      <p className={classes.name}>{props.name}</p>
      {props.imageUrl
        ? <img src={props.imageUrl} alt={`${props.name} image`} />
        : null
      }
    </Link>
  )
}

export default Category