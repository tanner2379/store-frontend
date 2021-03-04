import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../../axios-orders';

import { inputChangedHandler } from '../../../../shared/utility';
import { UserContext } from '../../../../contexts/UserContext';

import classes from './Edit.module.css';

const Edit = props => {
  const userInfo = useContext(UserContext)[0];
  const { slug } = useParams();
  const [category, setCategory] = useState('');

  useEffect(() => {
    axios.get(`/categories/${slug}/just_category`,{
      slug: slug
    }, { withCredentials: true })
    .then(response => {
      console.log(response.data)
      setCategory(response.data.category)
    })
    .catch(error => {
      console.log("Category fetch error", error)
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
      axios.patch(`/categories/${slug}`, {
        category: {
          name: formValue.name.value
        },
      }, {withCredentials: true})
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
    <div className={classes.EditCategory}>
      <div className = {classes.formWrapper} >
        <h2>Edit {category} Category</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="New Category Name"
            onChange={(event) => handleChange(event)}
            required />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  )
}

export default Edit