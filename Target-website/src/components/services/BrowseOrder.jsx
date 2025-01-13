import React, { useState } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

const BrowseMaintenancePlans = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
    console.log(`Searching for maintenance plans with query: ${searchQuery}`);
  };

  return (
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
  );
};

export default BrowseMaintenancePlans;

