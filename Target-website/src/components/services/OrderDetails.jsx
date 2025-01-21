import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Input } from 'reactstrap';

const OrderDetail = () => {
  const { id } = useParams(); // Get order ID from the URL
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${id}`);
      const data = await response.json();
      setOrder(data || {});
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  const handleUpdateOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        alert("Order updated successfully");
        navigate("/profile/orders"); // Redirect back to the list
      } else {
        alert("Error updating order");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order");
    }
  };

  const handleDeleteOrder = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Order deleted successfully");
        navigate("/profile/orders"); // Redirect back to the list
      } else {
        alert("Error deleting order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order");
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h1>Order Details</h1>
      <p>Description: {order.description}</p>
      <p>Admin ID: {order.adminId}</p>
      <p>Party ID: {order.partyId}</p>
      <p>Items: {order.items?.map(item => item.type).join(', ')}</p>

      <Input
        type="text"
        value={order.description}
        onChange={(e) => setOrder({ ...order, description: e.target.value })}
      />

      <Button color="primary" onClick={handleUpdateOrder}>
        Update Order
      </Button>
      <Button color="danger" onClick={handleDeleteOrder}>
        Delete Order
      </Button>
    </div>
  );
};

export default OrderDetail;
