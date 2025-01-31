import { Input } from 'reactstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation'; 
const BrowseOrderByPhoneNumber = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  let query = '';

  const { translate : t } = useTranslation();

  const navigate = useNavigate();


  const handleQuery = async (e) => {
    query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === '') {
      setOrders([]); // Clear orders if query is empty
      return;
    }
  }

  const handleSearch = async (e) => {
    console.log(searchQuery);

    if(searchQuery.length === 11) {
        
    try {
        const response = await fetch(`/api/orders/party/${searchQuery}`);
        const data = await response.json();
        if (!response.ok) {
          console.error('Error fetching orders:', data.error);
          return;
        }
        setOrders(data || []);

        if (data.length === 0) {
          alert('No orders found for this phone number.');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } 
    }
    else {
      alert('Please enter a valid phone number.');
    }
  };

  return (
    <div className='container mt-5'>




      <h1>{t("services.browseOrderByPhoneNumber")}</h1>

      <Input
        type="text"
        name="search"
        id="search"
        placeholder={t("services.browseOrderByPhoneNumber")}
        onChange={handleQuery}
      />

      <button type='submit' onClick={handleSearch}>{t("services.search")}</button>

      {orders.length > 0 ? orders.map((order) => (
        <div key={order._id} className='card m-2 ' onClick={() => navigate(`/profile/orders/${order._id}`)}>
          <p>Order ID: {order._id}</p>
          <p>Party ID: {order.partyId}</p>
          {/* <p>Party Name: {order.partyName}</p> */}
          {/* <p>Phone Number: {order.phoneNumber}</p> */}
          <p>Description: {order.description}</p>
          {/* <p>City: {order.city}</p>
          <p>State: {order.state}</p> */}
        </div>
      )) : <p>{t("services.Noordersfound")}</p>}
    </div>
  );
};

export default BrowseOrderByPhoneNumber;
