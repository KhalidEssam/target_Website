import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';

const ShowAvailableSupplies = ({ supplies }) => {
  const [supplyId, setSupplyId] = useState('');
  const [supplyData, setSupplyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Handle form submission for fetching a specific supply
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supplyId) {
      setError('Please enter a supply ID.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/orders/${supplyId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch supply details.');
      }
      const data = await response.json();
      setSupplyData(data);
    } catch (err) {
      setError(err.message);
      setSupplyData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="supplies-service-page mt-vh">
      {/* Input Section for Supply ID */}
      <section className="supply-input-section">
        <h2>Fetch Supply Details</h2>
        <form onSubmit={handleSubmit} className="supply-form">
          <input
            type="text"
            placeholder="Enter Supply ID"
            value={supplyId}
            onChange={(e) => setSupplyId(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Fetching...' : 'Fetch Supply'}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
      </section>

      Display Fetched Supply Data
      {supplyData && (
        <section className="supply-details-section">
          <h2>Fetched Supply Details</h2>
          <Row className="g-4">
            <Col key={supplyData._id} sm={12} md={6} lg={4} xl={3}>
              <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                {/* <CardImg
                  top
                  src={supplyData.imageUrls[0]}
                  alt={supplyData.type}
                  style={{ height: '200px', objectFit: 'cover' }}
                /> */}
                <CardBody className="d-flex flex-column">
                  <CardTitle tag="h5" className="fw-bold mb-3" style={{ color: '#2c3e50' }}>
                    {supplyData.type}
                  </CardTitle>
                  <CardText className="flex-grow-1" style={{ color: '#7f8c8d' }}>
                    {supplyData.description}
                  </CardText>
                  <CardText className="mt-2 fw-bold" style={{ color: '#3498db' }}>
                    Available Quantity: {supplyData.quantity}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </section>
      )}

      {/* Display All Available Supplies */}
      <section className="all-supplies-section">
        <h2>Available Supplies</h2>
        <Row className="g-4">
          {supplies && supplies.length > 0 ? (
            supplies.map((supply) => (
              <Col key={supply._id} sm={12} md={6} lg={4} xl={3}>
                <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                  <CardImg
                    top
                    src={supply.imageUrls[0]}
                    alt={supply.type}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <CardBody className="d-flex flex-column">
                    <CardTitle tag="h5" className="fw-bold mb-3" style={{ color: '#2c3e50' }}>
                      {supply.type}
                    </CardTitle>
                    <CardText className="flex-grow-1" style={{ color: '#7f8c8d' }}>
                      {supply.description}
                    </CardText>
                    <CardText className="mt-2 fw-bold" style={{ color: '#3498db' }}>
                      Available Quantity: {supply.quantity}
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            ))
          ) : (
            <p>No supplies available.</p>
          )}
        </Row>
      </section>
    </div>
  );
};

export default ShowAvailableSupplies;