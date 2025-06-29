import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button } from 'reactstrap';

const CheckoutModal = ({
  checkoutModal,
  setCheckoutModal,
  paymentMethod,
  setPaymentMethod,
  cart,
  handleCheckout,
  calculateTotal
}) => {
  return (
    <Modal isOpen={checkoutModal} toggle={() => setCheckoutModal(!checkoutModal)}>
      <ModalHeader toggle={() => setCheckoutModal(!checkoutModal)}>Checkout</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="paymentMethod">Payment Method</Label>
          <Input
            type="select"
            name="paymentMethod"
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="cash">Cash on Delivery</option>
            <option value="online">Online Payment (Paymob)</option>
          </Input>
        </FormGroup>
        <div className="checkout-summary">
          <h4>Order Summary</h4>
          {cart.map((item) => (
            <div key={item._id} className="checkout-item">
              <p>{item.type} x {item.quantity}</p>
              <p>${item.price * item.quantity}</p>
            </div>
          ))}
          <div className="checkout-total">
            <h4>Total: ${calculateTotal()}</h4>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleCheckout}>
          Complete Order
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CheckoutModal;
