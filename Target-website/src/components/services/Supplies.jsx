import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';

const ShowAvailableSupplies = ({ supplies }) => {
  return (
    <Row className="g-4">
      {supplies && supplies.length > 0 && supplies.map((supply) => (
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
      ))}
    </Row>
  );
};

export default ShowAvailableSupplies;