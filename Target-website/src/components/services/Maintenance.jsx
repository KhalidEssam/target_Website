import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from "../../hooks/useTranslation";
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
  const { translate: t } = useTranslation();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [formData, setFormData] = useState({
    orderMode: 'B2B',
    type: '',
    items: [{ type: '', description: '', imageUrls: [] }],
    adminId: '',
    partyId: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    totalAmount: 0,
    paymentStatus: 'pending',
    payments: [],
    lastPaymentDate: null,
    paymentDueDate: null,
    paidAmount: 0,
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
      alert(t('common.maintenance.alert.requiredFields'));
      return;
    }
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to create maintenance record');
      alert(t('common.maintenance.alert.success'));
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
    <Form onSubmit={handleSubmit} style={{  color: isDarkMode ? 'white' : 'black' }}>
      <FormGroup>
        <Label for="type">{t('common.maintenance.labels.type')}</Label>
        <Input
          type="select"
          name="type"
          id="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="">{t('common.maintenance.typeOptions.select')}</option>
          <option value="Maintenance">{t('common.maintenance.typeOptions.maintenance')}</option>
          <option value="Suppliance">{t('common.maintenance.typeOptions.materialSupplies')}</option>
          <option value="Consultation">{t('common.maintenance.typeOptions.consultation')}</option>
          <option value="Construction">{t('common.maintenance.typeOptions.construction')}</option>
        </Input>
      </FormGroup>

      <FormGroup>
        <Label>{t('common.maintenance.labels.items')}</Label>
        {formData.items.map((item, index) => (
          <div key={index} className="mb-3">
            <Input
              type="select"
              name="type"
              value={item.type}
              onChange={(e) => handleItemsChange(index, e)}
              className="mb-2"
            >
              <option value="">{t('common.maintenance.itemTypes.select')}</option>
              <option value="Vehicle">{t('common.maintenance.itemTypes.vehicle')}</option>
              <option value="Equipment">{t('common.maintenance.itemTypes.equipment')}</option>
            </Input>
            <Input
              type="textarea"
              name="description"
              value={item.description}
              onChange={(e) => handleItemsChange(index, e)}
              placeholder={t('common.maintenance.placeholders.itemDescription')}
              className="mb-2"
            />
            <Input
              type="file"
              name="image"
              onChange={(e) => handleBrowseImage(e, index)}
              className="mb-2"
            />
            <Button color="danger" onClick={() => handleRemoveItem(index)}>
              {t('common.maintenance.buttons.remove')}
            </Button>
          </div>
        ))}
        <Button color="primary" className="mt-2 btn bg-primary" onClick={handleAddItem}>
          {t('common.maintenance.buttons.addItem')}
        </Button>
      </FormGroup>

      <FormGroup>
        <Label for="partyId">{t('common.maintenance.labels.party')}</Label>
        <Input
          type="select"
          name="partyId"
          id="partyId"
          value={formData.partyId}
          onChange={handleChange}
          disabled={!parties.length}
        >
          <option value="">{t('common.maintenance.options.selectParty')}</option>
          {partyOptions}
        </Input>
      </FormGroup>
      <a href="add-Org">{t('common.maintenance.links.cantFindOrg')}</a>

      <FormGroup>
        <Label for="description">{t('common.maintenance.labels.description')}</Label>
        <Input
          type="textarea"
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          placeholder={t('common.maintenance.placeholders.detailedDescription')}
        />
      </FormGroup>

      <FormGroup>
        <Label for="status">{t('common.maintenance.labels.status')}</Label>
        <Input
          type="select"
          name="status"
          id="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Pending">{t('common.maintenance.status.pending')}</option>
          <option value="In Progress">{t('common.maintenance.status.inProgress')}</option>
          <option value="Completed">{t('common.maintenance.status.completed')}</option>
          <option value="Cancelled">{t('common.maintenance.status.cancelled')}</option>
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="priority">{t('common.maintenance.labels.priority')}</Label>
        <Input
          type="select"
          name="priority"
          id="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="Low">{t('common.maintenance.priority.low')}</option>
          <option value="Medium">{t('common.maintenance.priority.medium')}</option>
          <option value="High">{t('common.maintenance.priority.high')}</option>
        </Input>
      </FormGroup>

      <Button color="primary" className='btn bg-primary' type="submit" disabled={!formData.type || !formData.partyId}>
        {t('common.maintenance.form.submit')}
      </Button>
    </Form>
  );
};

export default Maintenance;