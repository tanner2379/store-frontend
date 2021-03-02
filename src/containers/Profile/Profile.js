import React from 'react'
import { useParams, Link } from 'react-router-dom';

const Profile = props => {
  const { id } = useParams();

  return(
    <div>
      <h1>Profile Page</h1>
      <p>The Profile id is {id}</p>
      <Link to={`/users/${id}/edit`} >
        Edit Information
      </Link>
      <Link to={`/products/new`} >
        Create Product
      </Link>
      <Link to={`/dashboard`} >
        Dashboard
      </Link>
    </div>
  )
}

export default Profile;