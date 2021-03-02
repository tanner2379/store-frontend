import React from 'react';
import { useParams } from 'react-router-dom';

const Product = props => {
  const { slug } = useParams();
  
  return (
    <div>
      <h1>Product Show Page</h1>
      <p>Product slug is {slug}</p>
    </div>
  )
}

export default Product