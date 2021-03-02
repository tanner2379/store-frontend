import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = props => {
  return (
    <div>
      Dashboard
      <Link to={'/invoices'} >
        Invoices
      </Link>
    </div>
  )
}

export default Dashboard