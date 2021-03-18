import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios-orders';

const Categories = props => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/categories')
    .then(response => {
      setCategories(response.data);
    }).catch(error => {
      console.log("Error Loading Products", error);
    })
  }, [])

  return (
    <div>
      {categories.map(category =>
        <Link to={`/categories/${category.slug}`} key={category.id}>{category.name}</Link>
        )
      }
    </div>
  )
}

export default Categories;