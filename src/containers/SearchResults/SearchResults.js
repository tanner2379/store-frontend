import React, { useContext } from 'react';

import { SearchResultContext } from '../../contexts/SearchResultContext';

import ProductThumb from '../../components/Thumbs/Product/Product';

import classes from './SearchResults.module.css';

const SearchResults = props => {
  const searchResults = useContext(SearchResultContext)[0];


  return (
    <div className={classes.SearchResults}>
      <h1 className={classes.Title}>{searchResults.query}</h1>
      {searchResults.products.map(product =>{
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

export default SearchResults;