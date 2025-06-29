import React from 'react';
import { Card, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';

const FetchedSupply = ({ supplyData }) => {
  return (
    supplyData && (
      <section className="supply-details-section">
        <h2>Fetched Supply Details</h2>
        <Row className="g-4">
          <Col key={supplyData._id} sm={12} md={6} lg={4} xl={3}>
            <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
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
    )
  );
};

export default FetchedSupply;
