import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Row } from 'reactstrap';

const ShowAvailableSupplies = ({ supplies }) => {
    return (
        <Row className="d-flex justify-content-between">
            {console.log(supplies)}
            {supplies && supplies.length > 0 && supplies.map(supply => (
                <Card key={supply._id} className="mx-2 my-2" style={{ width: '18rem' }}>
                    <CardImg top src={supply.imageUrls[0]} alt={supply.type} />
                    <CardBody>
                        <CardTitle>{supply.type}</CardTitle>
                        <CardText>
                            {supply.description}
                            <br />
                            Available Quantity: {supply.quantity}
                        </CardText>
                    </CardBody>
                </Card>
            ))}
        </Row>
    );
};

export default ShowAvailableSupplies;
