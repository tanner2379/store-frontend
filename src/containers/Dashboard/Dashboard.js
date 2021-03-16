import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios-orders';

import { currency } from '../../shared/utility';

const Dashboard = props => {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    axios.get('/products', {withCredentials: true})
    .then(response => {
      setProducts(response.data);
    }).catch(error => {
      console.log("Error Loading Products", error);
    })
  }, [])

  const handleDelete = (event, productId) => (
    axios.delete(`/products/${productId}`, { withCredentials: true})
      .then(response => {
        console.log("Product Deleted!", response);
      })
      .catch(error => {
        console.log("Product Delete Error", error);
      })
  )

  console.log(products[0]);
  return (
    <div>
      Dashboard
      <Link to={'/invoices'} >
        Invoices
      </Link>

      <table>
        <thead>
          <tr>
            <th scope="col">Product Image</th>
            <th scope="col">Product Name</th>
            <th scope="col">Items Sold</th>
            <th scope="col">Current Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => {
            return(
              <tr key={product.id}>
                <td><img src={'http://localhost:5000' + product.images[0].url} alt='productImage' width='100px' height='100px' /></td>
                <td>{product.name}</td>
                <td>{product.order_count}</td>
                <td>{currency(product.price)}</td>
                <td>
                  <Link to={`/products/${product.slug}/edit`}>Edit</Link>
                  <button onClick={(event) => handleDelete(event, product.id)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard