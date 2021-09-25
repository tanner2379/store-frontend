import React, { useState, useContext } from 'react';
import axios from '../../../axios-orders';

import { inputChangedHandler } from '../../../shared/utility';
import { UserContext } from '../../../contexts/UserContext';

import classes from './New.module.css';

const New = props => {
  const userInfo = useContext(UserContext)[0];

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
      for(let i = 0; i < formValue.images.value.length; i++) {
        formData.append('images[]', formValue.images.value[i]);
      }

      axios.post('/products', formData, headers)
      .then(response => {
        console.log("Created!", response);
        props.history.push(`/users/${userInfo.user.id}`)
      }).catch(error => {
        console.log("Product Create Error", error);
      });
    } else {
      alert("Only Vendors can create products");
    }
    
    
    event.preventDefault();
  }

  return (
    <div className={classes.NewProduct}>
      <p className={classes.Title}>Create a New Product</p>
      <div className = {classes.formWrapper} >

        <form onSubmit={handleSubmit}>
          <input
            className={classes.Input}
            type="text"
            name="name"
            placeholder="Product Name"
            onChange={(event) => handleChange(event)}
            required />
          <input
            className={classes.Input}
            type="text"
            name="description"
            placeholder="Product Description"
            onChange={(event) => handleChange(event)}
            required />
          <input
            className={classes.Input}
            type="number"
            name="price"
            placeholder="Price"
            onChange={(event) => handleChange(event)}
            required />
            <input
              className={classes.Input}
              type="file"
              accept="image/*"
              multiple
              onChange={(event) => fileSelectedHandler(event)} />
          <div className={classes.createButtonWrapper}>
            <button type="submit" className={classes.createButton}>Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default New