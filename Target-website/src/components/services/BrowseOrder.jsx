import React, { useState } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

const BrowseMaintenancePlans = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const[Orders,setOrders] = useState([]);

  const fetch_party_organizations = async () => {
    const response = await fetch("http://127.0.0.1:3000/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
    const data = await response.json();
    if(data) {
      console.log(data);
      setOrders(data);
    }
    else
    {
      console.error("Error fetching party organizations");
      
    }

  };
   React.useEffect(() => {
      if (Orders.length === 0) {
        fetch_party_organizations();
      }
    }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
    console.log(`Searching for maintenance plans with query: ${searchQuery}`);
  };

  return (
    <>
    <Form onSubmit={handleSearch}>
      <h1>Browse Maintenance Plans</h1>
      <FormGroup>
        <Input
          type="text"
          name="search"
          id="search"
          placeholder="Search maintenance plans..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </FormGroup>
      <Button color="primary">Search</Button>
    </Form>

    <div className=' card-container'>
      {Orders.map((order , index) => (
        <div className='card' key={index}>
          {/* <h2>{order.name}</h2> */}
          <p>{order.description}</p>
          <p>{order.adminId ? " Admin ID: " + order.adminId : "No admin assigned"}</p>
          <p>{order.items.map((item) => item._id ).join(', ')}</p><p>{order.items.map((item) => item.type
        ).join(', ')}</p>
          {/* <Button color="primary">Order Now</Button> */}
        </div>
      ))}
    </div>
    </>
  );
};

export default BrowseMaintenancePlans;

