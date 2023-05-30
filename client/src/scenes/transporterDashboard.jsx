import React, { useEffect, useState } from 'react';
import '../transporterStyles.css';

const DashboardPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState('');
  const [price, setPrice] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  // Fetch all the orders written by the manufacturer
  const fetchOrders = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      // Retrieve the token from local storage or wherever it is stored
      const token = localStorage.getItem('token');

      // Make the API request to fetch orders
      const response = await fetch(`http://localhost:3001/orders/${user.username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        // Set the orders state with the received data
        setOrders(responseData.messages);
      } else {
        // Handle the error if the API request failed
        console.error('Failed to fetch orders:', response.status);
      }
    } catch (error) {
      // Handle any other errors that occurred during the request
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data1 = JSON.parse(selectedOrder);
    try {
      // Retrieve the token from local storage or wherever it is stored
      const token = localStorage.getItem('token');

      // Prepare the data object to be sent to the backend
      const data = {
        orderID: data1.orderID,
        price,
        manufacturerUsername: data1.manufacturerName,
        role: "Manufacturer"
      };
      console.log(data);

      // Make the API request to save the data
      const response = await fetch('http://localhost:3001/auth/message/transporter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      // Check if the API request was successful
      if (response.ok) {
        // Data saved successfully
        alert('Data saved successfully');
      } else {
        // Handle the error if the API request failed
        console.error('Failed to save data:', response.status);
        alert('Failed to save data');
      }
    } catch (error) {
      // Handle any other errors that occurred during the request
      console.error('Error saving data:', error);
      alert('Error saving data');
    }
    setPrice('');
    setSelectedOrder('');
  };

  return (
    <div className="dashboard-container">
      <h2>Reply to all the given Orders</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="selectedOrder" className="form-label">
            Select OrderID:
          </label>
          <select
            id="selectedOrder"
            value={selectedOrder}
            onChange={(e) => setSelectedOrder(e.target.value)}
            className="form-select"
            required
          >
            <option value="">Select Order</option>
            {orders.map((order) => (
              <option key={order.orderID} value={JSON.stringify(order)}>
                {order.orderID}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price" className="form-label">
            Price:
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-button">Send</button>
      </form>
      <h2>All the messages from manufacturers</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <ul className="order-list" key={order._id}>
            <li className="order-item">
              <p>Order ID: {order.orderID}</p>
            </li>
            <li className="order-item">
              <p>ManufacturerName: {order.manufacturerName}</p>
            </li>
            <li className="order-item">
              <p>To: {order.to}</p>
            </li>
            <li className="order-item">
              <p>From: {order.from}</p>
            </li>
          </ul>
        ))
      ) : (
        <p className="no-orders">No orders found.</p>
      )}
    </div>
  );
};

export default DashboardPage;
