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
    }
  })

  const setFormIsValid = useState(false)[1];

  const handleChange = event => {
    const [valueOut, validOut] = inputChangedHandler(event, formValue);

    setFormValue(valueOut);
    setFormIsValid(validOut);
  }

  const handleSubmit = event => {
    if (userInfo.user.vendor) {
      axios.post('/categories', {
        category: {
          name: formValue.name.value
        },
      })
      .then(response => {
        console.log("Created!", response);
        props.history.push(`/users/${userInfo.user.id}`)
      }).catch(error => {
        console.log("Category Create Error", error);
      });
    } else {
      alert("Only Vendors can create categories");
    }
    
    
    event.preventDefault();
  }

  return (
    <div className={classes.NewCategory}>
      <div className = {classes.formWrapper} >
        <h2>Create a new category</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Category Name"
            onChange={(event) => handleChange(event)}
            required />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  )
}

export default New