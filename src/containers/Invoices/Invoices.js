import React, { useState, useEffect } from 'react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import ShippingForm from '../../components/Forms/ShippingForm/ShippingForm';

const Invoices = props => {

  const [invoices, setInvoices] = useState([]);
  const [shipFormVisible, setShipFormVisible] = useState(false);
  const [invoiceId, setInvoiceId] = useState(null);

  useEffect(() => {
    axios.get('/invoices', { withCredentials: true })
      .then(response => {
        setInvoices(response.data);
      })
      .catch(error => {
        console.log("Invoice retrieval error", error);
      })
  }, [])

  const handleShipFormModal = invoiceId => {
    setInvoiceId(invoiceId);
    setShipFormVisible(!shipFormVisible);
  }

  return (
    <div>
      <Modal show={shipFormVisible} modalClosed={() => handleShipFormModal(invoiceId)}>
        <ShippingForm invoiceId={invoiceId} history={props.history} />
        <div onClick={() => handleShipFormModal(invoiceId)}>Close</div>
      </Modal>
      <h3>Invoices</h3>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Orders</th>
            <th scope="col">Recipient Address</th>
            <th scope="col">Shipping Information</th>
            <th scope="col">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => {
            return(
              <tr key={invoice.id}>
                <td>
                  {invoice.orders.map(order => {
                    return <p key={order.id}>{order.product_name} x {order.quantity}</p>
                  })}
                </td>
                <td>
                  <p>{invoice.shipping_address.name}</p>
                  <p>{invoice.shipping_address.address_line1}</p>
                  <p>{invoice.shipping_address.address_line2}</p>
                  <p>{invoice.shipping_address.city}</p>
                  <p>{invoice.shipping_address.state}</p>
                  <p>{invoice.shipping_address.country}</p>
                  <p>{invoice.shipping_address.postal_code}</p>
                </td>
                <td>
                  {invoice.shipped_date
                    ? <Aux>
                        <p>{invoice.shipped_date}</p>
                        <p>{invoice.shipping_company}</p>
                        <p>{invoice.tracking_number}</p>
                        <button onClick={() => handleShipFormModal(invoice.id)}>Change Shipping Information</button>
                      </Aux>
                    : <Aux>
                        <button onClick={() => handleShipFormModal(invoice.id)}>Enter Shipping Information</button>
                      </Aux>
                  }
                </td>
                <td>
                  <p>{invoice.total_price}</p>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Invoices