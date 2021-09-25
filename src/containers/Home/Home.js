import React, { useState, useEffect } from 'react';
import axios from '../../axios-orders';

import CategoryThumb from '../../components/Thumbs/Category/Category';
import classes from './Home.module.css';


const Home = props => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/specific_categories', {
      params: {
        category_slugs: ["kitchen", "furniture"]
      }
    })
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.log("Category Fetch Error", error);
      })
  }, [])

  let categoryThumbs = null;
  if (categories && categories[0]) {
    categoryThumbs = (
      <div className={classes.CategoryThumbs}>
        {categories.map(category => {
          return <CategoryThumb 
            slug={category.slug}
            imageUrl={'http://localhost:5000' + category.image_url}
            name={category.name}
          />
        })}
      </div>
    )
  }

  return(
    <div className={classes.Home}>
      <p className={classes.Header}>Karnes Corner</p>
      <p className={classes.SubHeader}>Family Mercantile</p>
      {categoryThumbs}
    </div>
  )
}

export default Home;