import React from 'react';
import { Row, Col } from 'reactstrap';
import SupplyCard from './SupplyCard';
import { useTranslation } from "../../../hooks/useTranslation";

const AvailableSupplies = ({ supplies, addToCart }) => {
  const { translate: t } = useTranslation();
  
  return (
    <section className="all-supplies-section container-sm ">
      <h2>{t("Supplies.availableSupplies")}</h2>
      <Row className="g-4">
        {supplies && supplies.length > 0 ? (
          supplies.map((supply) => (
            <Col key={supply._id} sm={12} md={6} lg={4} xl={3}>
              <SupplyCard supply={supply} addToCart={addToCart} />
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <p>{t("Supplies.noAvailableSupplies")}</p>
          </Col>
        )}
      </Row>
    </section>
  );
};

export default AvailableSupplies;
