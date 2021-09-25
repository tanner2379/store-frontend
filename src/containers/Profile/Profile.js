import React, { useContext } from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from '../../axios-orders';

import { UserContext } from '../../contexts/UserContext'
import Aux from '../../hoc/Aux/Aux';

import classes from './Profile.module.css';

const Profile = props => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useContext(UserContext);

  const handleDelete = event => {
    axios.delete(`/registrations/${id}`, {
    })
    .then(response => {
      if (response.data.status === "deleted") {
        setUserInfo({...userInfo, loggedIn: 'NOT_LOGGED_IN', user: {}})
        props.history.push('/');
      } else {
        console.log("Registration Error")
      }
    }).catch(error => {
      console.log("Edit Error", error);
    });
    
    event.preventDefault();
  }

  return(
    <div className={classes.Profile}>
      <div className={classes.contentWrapper}>
        <p className={classes.Title}>Profile Page</p>
        <p className={classes.subTitle}>The Profile id is {id}</p>
        <Link to={`/users/${id}/edit`} >
          Edit Information
        </Link>
        {userInfo.user.vendor
          ? <Aux>
              <Link to={`/products/new`} >
                Create Product
              </Link>
              <Link to={`/categories/new`} >
                Create Category
              </Link>
              <Link to={`/dashboard`} >
                Dashboard
              </Link>
              <Link to={'/invoices'} >
                Invoices
              </Link>
            </Aux>
          : <button onClick={(event) => handleDelete(event)}>Delete Profile</button>
        }
      </div>
    </div>
  )
}

export default Profile;