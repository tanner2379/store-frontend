import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../../axios-orders';

import { inputChangedHandler } from '../../../../shared/utility';
import { UserContext } from '../../../../contexts/UserContext';

import classes from './Edit.module.css';


const Edit = props => {
  const userInfo = useContext(UserContext)[0];
  const [product, setProduct] = useState({})
  const { slug } = useParams();

  
  useEffect(() => {
    axios.get(`/products/${slug}`,{
      slug: slug
    })
    .then(response => {
      setProduct(response.data)
    })
    .catch(error => {
      console.log("Product fetch error", error);
    })
  }, [])


  const [formValue, setFormValue] = useState({
    name: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    description: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    price: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    inStock: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    images: {
      value: [],
      validation: {
        required: false
      },
      valid: false,
      touched: false,
    },
  })

  const setFormIsValid = useState(false)[1];

  const handleChange = event => {
    const [valueOut, validOut] = inputChangedHandler(event, formValue);

    setFormValue(valueOut);
    setFormIsValid(validOut);
  }

  const fileSelectedHandler = event => {
    setFormValue({...formValue, images: {...formValue.images, value: [event.target.files][0]}})
  }

  const handleSubmit = event => {
    if (userInfo.user.vendor) {
      const headers = { 'Content-Type': 'multipart/form-data', withCredentials: true };
      
      const formData = new FormData();
      formData.append('name', formValue.name.value);
      formData.append('description', formValue.description.value);
      formData.append('price', formValue.price.value);
      formData.append('in_stock', formValue.inStock.value);
      for(let i = 0; i < formValue.images.value.length; i++) {
        formData.append('images[]', formValue.images.value[i]);
      }

      axios.patch(`/products/${slug}`, formData, headers)
        .then(response => {
          console.log("Updated", response);
          props.history.push(`/users/${userInfo.user.id}`)
        }).catch(error => {
          console.log("Product Update Error", error);
        });
      } else {
        alert("Only Vendors can update products");
      }
    
    
    event.preventDefault();
  }

  return (
    <div className={classes.NewProduct}>
      <div className = {classes.formWrapper} >
        <h2>Edit {product.name}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            onChange={(event) => handleChange(event)}
            required />
          <input
            type="text"
            name="description"
            placeholder="Product Description"
            onChange={(event) => handleChange(event)}
            required />
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={(event) => handleChange(event)}
            required />
          <input
            type="number"
            name="inStock"
            placeholder="Amount in Stock"
            onChange={(event) => handleChange(event)}
            required />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(event) => fileSelectedHandler(event)} />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  )
}

export default Edit