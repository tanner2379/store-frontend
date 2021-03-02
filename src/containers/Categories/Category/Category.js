import React from 'react';
import { useParams } from 'react-router-dom';

const Category = props => {
  const { slug } = useParams();

  return (
    <div>
      <h1>Category Show Page</h1>
      <p>The Category Slug is {slug}</p>
    </div>
  )
}

export default Category;