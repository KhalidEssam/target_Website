import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { FaShoppingCart } from 'react-icons/fa';

const SupplyCard = ({ supply, addToCart }) => {
  return (
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
          Price: ${supply.price}
        </CardText>
        <CardText className="mt-2 fw-bold" style={{ color: '#3498db' }}>
          Available Quantity: {supply.quantity}
        </CardText>
        <Button color="primary" className='bg-primary m-2' onClick={() => addToCart(supply)}>
          <FaShoppingCart /> Add to Cart
        </Button>
      </CardBody>
    </Card>
  );
};

export default SupplyCard;
