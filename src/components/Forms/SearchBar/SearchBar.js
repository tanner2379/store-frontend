import React, { useState, useEffect, useContext } from 'react';
import axios from '../../../axios-orders';

import { inputChangedHandler } from '../../../shared/utility';
import { SearchResultContext } from '../../../contexts/SearchResultContext';

import classes from './SearchBar.module.css';

const SearchBar = props => {
  const [searchResults, setSearchResults] = useContext(SearchResultContext);
  const [formValue, setFormValue] = useState({
    productName: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
  })

  useEffect(() => {
    if (searchResults.warning === "NOT_FOUND") {
      setSearchResults({...searchResults, warning: "none"});
    }
  }, [window.location.pathname]);

  const setFormIsValid = useState(false)[1];

  const handleChange = event => {
    const [valueOut, validOut] = inputChangedHandler(event, formValue);

    setFormValue(valueOut);
    setFormIsValid(validOut);
  }

  const handleSubmit = event => {
    axios.post('/search_product', {
      product_name: formValue.productName.value
    })
    .then(response => {
      if (response.data[0]) {
        setSearchResults({query: formValue.productName.value, products: response.data, warning: "none"});
        props.history.push('/search_results')
      } else {
        setSearchResults({query: formValue.productName.value, products: {}, warning: "NOT_FOUND"})
      }
    }).catch(error => {
      console.log("Error fetching search results", error);
    });
    
    event.preventDefault();
  }


  let notFoundModal = null;
  if (searchResults.warning === "NOT_FOUND") {
    notFoundModal = (
      <div className={classes.NotFoundModal}>
        <p>No products match your search.</p>
      </div>
    )
  }

  return (
    <div className={classes.SearchBar}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="productName"
          placeholder="Search Products..."
          onChange={(event) => handleChange(event)}
          required />
        <button type="submit">Search</button>
      </form>
      {notFoundModal}
    </div>
  )
}

export default SearchBar