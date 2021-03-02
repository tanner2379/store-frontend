import React, { useState, useContext } from 'react';
import axios from 'axios';

import { updateObject, checkValidity } from '../../shared/utility';
import { UserContext } from '../../contexts/UserContext';


import classes from './Registration.module.css';


const Registration = props => {
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

  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangedHandler = (event) => {
    const updatedFormElement = updateObject(formValue[event.target.name], {
      value: event.target.value,
      valid: checkValidity(event.target.value, formValue[event.target.name].validation),
      touched: true,
    });

    const updatedFormValue = updateObject(formValue, {
      [event.target.name]: updatedFormElement
    })

    let formValid = true;
    for (let inputIdentifier in updatedFormValue) {
      formValid = updatedFormValue[inputIdentifier].valid && formValid;
    }

    setFormValue(updatedFormValue);
    setFormIsValid(formValid);
  };

  const handleRegister = event => {
    axios.post('http://localhost:5000/registrations', {
      user: {
        email: formValue.email.value,
        password: formValue.password.value,
        password_confirmation: formValue.password_confirmation.value,
      }
    }, { withCredentials: true})
    .then(response => {
      if (response.data.status === "created") {
        setUserInfo({loggedIn: 'LOGGED_IN', user: response.data.user})
      } else {
        console.log("Registration Error")
      }
    }).catch(error => {
      console.log("registration_error", error);
    });
    
    event.preventDefault();
  }

  const handleLogin = event => {
    axios.post('http://localhost:5000/sessions', {
      user: {
        email: formValue.email.value,
        password: formValue.password.value,      }
    }, { withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        setUserInfo({loggedIn: 'LOGGED_IN', user: response.data.user})
      } else {
        console.log("Registration Error")
      }
    }).catch(error => {
      console.log("login error", error);
    });
    
    event.preventDefault();
  }



  return (
    <div className={classes.Registration}>
      <div className = {classes.formWrapper} >
        <div className={classes.logForm} >
            <h2>Log In</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(event) => inputChangedHandler(event)}
                required />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(event) => inputChangedHandler(event)}
                required />
              <button type="submit" className={classes.logButton}>Log In</button>
            </form>
          </div>
        <div className={classes.regForm} >
          <h2>Sign Up</h2>
          <form onSubmit={handleRegister}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(event) => inputChangedHandler(event)}
              required />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(event) => inputChangedHandler(event)}
              required />
            <input
              type="password"
              name="password_confirmation"
              placeholder="Password Confirmation"
              onChange={(event) => inputChangedHandler(event)}
              required />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;