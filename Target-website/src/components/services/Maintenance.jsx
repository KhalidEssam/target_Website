import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useSelector } from 'react-redux';

// Utility function for file validation
const validateFile = (file) => {
  if (!file) {
    console.error("No file selected");
    return false;
  }
  if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
    console.error("Unsupported file type");
    return false;
  }
  if (file.size > 5 * 1024 * 1024) {
    console.error("File size exceeds 5MB");
    return false;
  }
  return true;
};

const Maintenance = () => {
  const [formData, setFormData] = useState({
    type: '',
    items: [{ type: '', description: '', imageUrls: [] }],
    adminId: '',
    partyId: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
  });

  const user = useSelector((state) => state.user);
  const [parties, setParties] = useState([]);

  // Fetch party organizations
  const fetchPartyOrganizations = useCallback(async () => {
    try {
      const response = await fetch('/api/parties');
      if (!response.ok) throw new Error('Failed to fetch parties');
      const data = await response.json();
      setParties(data);
    } catch (error) {
      console.error('Error fetching party organizations:', error.message);
    }
  }, []);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, adminId: user.userInfo.sub }));
    fetchPartyOrganizations();
  }, [fetchPartyOrganizations, user]);

  // Handle form input changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Handle item input changes
  const handleItemsChange = useCallback((index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [name]: value };
      return { ...prev, items: newItems };
    });
  }, []);

  // Handle image upload
  const handleBrowseImage = useCallback(async (e, index) => {
    const file = e.target?.files?.[0];
    if (!validateFile(file)) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload-single", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setFormData((prev) => ({
        ...prev,
        items: prev.items.map((item, i) =>
          i === index
            ? { ...item, imageUrls: [...(item.imageUrls || []), data.imageUrl] }
            : item
        ),
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }, []);

  // Add a new item
  const handleAddItem = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { type: '', description: '', imageUrls: [] }],
    }));
  }, []);

  // Remove an item
  const handleRemoveItem = useCallback((index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.type || !formData.partyId) {
      alert('Please fill all required fields.');
      return;
    }
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to create maintenance record');
      alert('Maintenance record created successfully');
    } catch (error) {
      console.error('Error creating maintenance record:', error.message);
    }
  };

  // Generate party options
  const partyOptions = useMemo(() => {
    return parties.map((party) => (
      <option key={party._id} value={party._id}>
        {party.name}
      </option>
    ));
  }, [parties]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="type">Type</Label>
        <Input
          type="select"
          name="type"
          id="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Suppliance">Suppliance</option>
          <option value="Consultation">Consultation</option>
          <option value="Construction">Construction</option>
        </Input>
      </FormGroup>

      <FormGroup>
        <Label>Items</Label>
        {formData.items.map((item, index) => (
          <div key={index} className="mb-3">
            <Input
              type="select"
              name="type"
              value={item.type}
              onChange={(e) => handleItemsChange(index, e)}
              className="mb-2"
            >
              <option value="">Select Item Type</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Equipment">Equipment</option>
            </Input>
            <Input
              type="textarea"
              name="description"
              value={item.description}
              onChange={(e) => handleItemsChange(index, e)}
              placeholder="Enter description"
              className="mb-2"
            />
            <Input
              type="file"
              name="image"
              onChange={(e) => handleBrowseImage(e, index)}
              className="mb-2"
            />
            <Button color="danger" onClick={() => handleRemoveItem(index)}>
              Remove
            </Button>
          </div>
        ))}
        <Button color="primary" onClick={handleAddItem}>
          Add Item
        </Button>
      </FormGroup>

      <FormGroup>
        <Label for="partyId">Party</Label>
        <Input
          type="select"
          name="partyId"
          id="partyId"
          value={formData.partyId}
          onChange={handleChange}
          disabled={!parties.length}
        >
          <option value="">Select a Party</option>
          {partyOptions}
        </Input>
      </FormGroup>
      <a href="add-Org">Can't find your Organization?</a>

      <FormGroup>
        <Label for="description">Description</Label>
        <Input
          type="textarea"
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter detailed description"
        />
      </FormGroup>

      <FormGroup>
        <Label for="status">Status</Label>
        <Input
          type="select"
          name="status"
          id="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="priority">Priority</Label>
        <Input
          type="select"
          name="priority"
          id="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </Input>
      </FormGroup>

      <Button color="primary" type="submit" disabled={!formData.type || !formData.partyId}>
        Submit
      </Button>
    </Form>
  );
};

export default Maintenance;