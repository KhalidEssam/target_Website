import { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';

const AddOrg = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPartyOrg = {
      name,
      address,
      contactPerson,
      phoneNumber,
      email,
      description,
    };

    try {
      const response = await fetch('/api/parties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authState.accessToken}`,
        },
        body: JSON.stringify(newPartyOrg),
      });

      if (response.ok) {
        alert('Party Organization created successfully!');
      } else {
        alert('Error creating Party Organization');
      }
    } catch (error) {
      console.error('Error creating Party Organization:', error);
    }
  };

  return (
    <div className="container card">
      <h1>Create Party Organization</h1>
      <form onSubmit={handleSubmit} >
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="form-control bg-secondary"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            className="form-control bg-secondary"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Contact Person:</label>
          <input
            type="text"
            className="form-control bg-secondary"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            className="form-control bg-secondary"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            className="form-control bg-secondary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            className="form-control bg-secondary"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn bg-primary">
          Create
        </button>
      </form>
    </div>
  );
};

export default AddOrg;
