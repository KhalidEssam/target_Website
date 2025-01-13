import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Maintenance = () => {
  const [vehicle, setVehicle] = useState('');
  const [mileage, setMileage] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call API to create new maintenance record
    console.log(`Creating new maintenance record for ${vehicle} with ${mileage} miles and description: ${description}`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="vehicle">Vehicle</Label>
        <Input type="text" name="vehicle" id="vehicle" value={vehicle} onChange={(e) => setVehicle(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="mileage">Mileage</Label>
        <Input type="number" name="mileage" id="mileage" value={mileage} onChange={(e) => setMileage(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="textarea" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </FormGroup>
      <Button color="primary">Submit</Button>
    </Form>
  );
};

export default Maintenance;
