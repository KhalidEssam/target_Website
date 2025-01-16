import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useOktaAuth } from "@okta/okta-react";

const Maintenance = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [type, setType] = useState('');
  const [items, setItems] = useState([{ type: '', itemId: '64fdeab6f3245a9b6d7e003c', description: '' }]);
  const [adminId, setAdminId] = useState('');
  const [partyId, setPartyId] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState('Medium');
  const [partries, setParties] = useState([]);

  const [formData, setFormData] = useState({
    type: '',
    items: [{ type: '', itemId: '', description: '' }],
    adminId: '',
    partyId: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
  });

  const fetch_party_organizations = async () => {
    const response = await fetch("http://127.0.0.1:3000/parties", {
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
      setParties(data);
    }
    else
    {
      console.error("Error fetching party organizations");
      
    }
    // console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    
    setAdminId(authState.idToken.claims.sub);
    setFormData({
      type,
      items,
      adminId,
      partyId,
      description,
      status,
      priority,
    });
    // Call API to create new maintenance record
    console.log(`Creating new maintenance record with type: ${JSON.stringify(formData)}`);
    const response = await fetch("http://127.0.0.1:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data) {
      console.log(data);
    } else {
      console.error("Error creating maintenance record");
    }
  };

  const handleAddItem = () => {
    setItems([...items, { type: '', itemId: '64fdeab6f3245a9b6d7e003c', description: '' }]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((item, i) => i !== index));
  };

  React.useEffect(() => {
    if (partries.length === 0) {
      fetch_party_organizations();
    }
  }, []);


  return (
    <Form onSubmit={handleSubmit}> 
      <FormGroup>
        <Label for="type">Type</Label>
        <Input type="select" name="type" id="type" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Suppliance">Suppliance</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="items">Items</Label>
        {items.map((item, index) => (
          <div key={index}>
            <Input type="select" name="items" id="items" value={item.type} onChange={(e) => setItems(items.map((i, j) => j === index ? { ...i, type: e.target.value } : i))}>
              <option value="">Select</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Equipment">Equipment</option>
            </Input>

            {/* <Input type="text" name="itemId" id="itemId" value={item.itemId} onChange={(e) => setItems(items.map((i, j) => j === index ? { ...i, itemId: e.target.value } : i))} /> */}
            <Input type="textarea" name="description" id="description" value={item.description} onChange={(e) => setItems(items.map((i, j) => j === index ? { ...i, description: e.target.value } : i))} />
            <Button color="danger" onClick={() => handleRemoveItem(index)}>Remove</Button>
          </div>
        ))}
        <Button color="primary" onClick={handleAddItem}>Add Item</Button>
      </FormGroup>
      <FormGroup>
        <Label for="partyId">Party ID</Label>
        <Input type="select" name="partyId" id="partyId" value={partyId} onChange={(e) => setPartyId(e.target.value)} disabled={partries.length === 0}>
          <option value="" disabled>Select a Party</option>
          {partries.map((party, index) => (
            <option key={index} value={party._id}>{party.name}</option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="textarea" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="status">Status</Label>
        <Input type="select" name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="priority">Priority</Label>
        <Input type="select" name="priority" id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </Input>
      </FormGroup>
      <Button color="primary">Submit</Button>
    </Form>
  );
};

export default Maintenance;

