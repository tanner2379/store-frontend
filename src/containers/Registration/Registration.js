import React, { useState, useContext } from 'react';
import axios from '../../axios-orders';

import { inputChangedHandler } from '../../shared/utility';
import { UserContext } from '../../contexts/UserContext';
import { FlashContext } from '../../contexts/FlashContext';

import classes from './Registration.module.css';


const Registration = props => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const setFlash = useContext(FlashContext)[1];

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

  const handleRegister = event => {
    axios.post('/registrations', {
      user: {
        email: formValue.email.value,
        password: formValue.password.value,
        password_confirmation: formValue.password_confirmation.value,
      }
    })
    .then(response => {
      if (response.data.status === "created") {
        setUserInfo({...userInfo, loggedIn: 'LOGGED_IN', user: response.data.user})
        props.history.push('/');
      } else {
        console.log(response.data)
        setFlash({ errors: response.data.errors, visible: true })
      }
    }).catch(error => {
      console.log("registration_error", error);
    });
    
    event.preventDefault();
  }

  const handleLogin = event => {
    axios.post('/sessions', {
      user: {
        email: formValue.email.value,
        password: formValue.password.value,
      }
    })
    .then(response => {
      if (response.data.logged_in) {
        setUserInfo({...userInfo, loggedIn: 'LOGGED_IN', user: response.data.user});
        props.history.push('/');
      } else {
        setFlash({ errors: response.data.errors, visible: true })
      }
    }).catch(error => {
      console.log("login error", error);
    });
    
    event.preventDefault();
  }



  return (
    <div className={classes.Registration}>
      <div className = {classes.formWrapper} >
        <div className={classes.logFormWrapper} >
            <h2>Log In</h2>
            <form onSubmit={handleLogin} className={classes.logForm}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(event) => handleChange(event)}
                required 
                className={classes.regInput} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(event) => handleChange(event)}
                required 
                className={classes.regInput} />
              <button type="submit" className={[classes.authButton, classes.logButton].join(' ')}>Log In</button>
            </form>
          </div>
        <div className={classes.regFormWrapper} >
          <h2>Sign Up</h2>
          <form onSubmit={handleRegister} className={classes.authForm}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(event) => handleChange(event)}
              required 
              className={classes.regInput} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(event) => handleChange(event)}
              required
              className={classes.regInput} />
            <input
              type="password"
              name="password_confirmation"
              placeholder="Password Confirmation"
              onChange={(event) => handleChange(event)}
              required
              className={classes.regInput} />
            <button type="submit" className={[classes.authButton, classes.regButton].join(' ')}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;