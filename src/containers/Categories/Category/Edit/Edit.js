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
    })
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
    },
    image: {
      value: {},
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
    setFormValue({...formValue, image: {...formValue.images, value: event.target.files[0]}})
  }

  const handleSubmit = event => {
    if (userInfo.user.vendor) {
      const formData = new FormData();
      formData.append('name', formValue.name.value);
      formData.append('image', formValue.image.value);

      axios.patch(`/categories/${slug}`, formData)
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
          <input
            type="file"
            accept="image/*"
            onChange={(event) => fileSelectedHandler(event)} />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  )
}

export default Edit