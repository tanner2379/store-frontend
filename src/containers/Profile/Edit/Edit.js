import React, { useContext, useState } from 'react'
import axios from '../../../axios-orders';

import { inputChangedHandler } from '../../../shared/utility';
import { UserContext } from '../../../contexts/UserContext';

import classes from './Edit.module.css'

const Edit = props => {
  const [userInfo, setUserInfo] = useContext(UserContext);

  const [formValue, setFormValue] = useState({
    email: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    password: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    password_confirmation: {
      value: '',
      validation: {
        required: true
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

  const handleSubmit = event => {
    axios.patch(`/registrations/${userInfo.user.id}`, {
      user: {
        email: formValue.email.value,
        password: formValue.password.value,
        password_confirmation: formValue.password_confirmation.value,
      }
    })
    .then(response => {
      if (response.data.status === "updated") {
        setUserInfo({...userInfo, loggedIn: 'LOGGED_IN', user: response.data.user})
        props.history.push('/');
      } else {
        console.log("Registration Error")
      }
    }).catch(error => {
      console.log("Edit Error", error);
    });
    
    event.preventDefault();
  }

  return (
    <div className={classes.Edit}>
      <h2>Edit Information</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(event) => handleChange(event)}
          required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(event) => handleChange(event)}
          required />
        <input
          type="password"
          name="password_confirmation"
          placeholder="Password Confirmation"
          onChange={(event) => handleChange(event)}
          required />
        <button type="submit">Submit Changes</button>
      </form>
    </div>
  );
}

export default Edit;