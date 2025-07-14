import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button } from 'reactstrap';
import { clearCart } from '../../../store/features/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const CheckoutModal = ({
  checkoutModal,
  setCheckoutModal,
  paymentMethod,
  setPaymentMethod,
  createOrder
}) => {
  const [showPaymentIframe, setShowPaymentIframe] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const token = useSelector((state) => state.token.accessToken);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const orderData = await createOrder();
      if (!orderData) return;

      if (paymentMethod === 'cash') {
        dispatch(clearCart());
        toast.success('Order placed successfully (Cash on Delivery)');
        setCheckoutModal(false);
        return;
      }


      // Online payment
      const paymentResponse = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',     Authorization: `Bearer ${token}`,
      },
        body: JSON.stringify({
          orderId: orderData._id,
          amount: total,
          orderDescription: 'Store supplies order',
          customerEmail: '', // Get from auth
          customerPhone: ''  // Get from auth
        })
      });

      if (!paymentResponse.ok) throw new Error('Failed to initiate payment');

      const paymentData = await paymentResponse.json();
      if (paymentData.success) {
        // dispatch(clearCart());
        toast.success('Payment initialization successful.');
        handlePaymentInitiate(paymentData.paymentUrl);
      } else {
        toast.error('Payment init failed.');
        throw new Error('Unsuccessful payment response');
      }

    } catch (err) {
      toast.error('Checkout failed: ' + err.message);
      setCheckoutModal(false);
    } finally {
      setLoading(false);
    }

  };

  const handlePaymentComplete = () => {
    setShowPaymentIframe(false);
    setPaymentUrl('');
  };

  const handlePaymentInitiate = async (url) => {
    setPaymentUrl(url);
    setShowPaymentIframe(true);
  };

  return (
    <Modal isOpen={checkoutModal} toggle={() => setCheckoutModal(!checkoutModal)}>
      <ModalHeader toggle={() => setCheckoutModal(!checkoutModal)}>Checkout</ModalHeader>
      <ModalBody>
        {!showPaymentIframe ? (
          <>
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
                <div key={item._id} className="checkout-item d-flex justify-content-between border-bottom py-2">
                  <span>{item.type} x {item.quantity}</span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
              <div className="checkout-total mt-3">
                <h4>Total: ${total}</h4>
              </div>
            </div>
          </>
        ) : (
          <div className="payment-iframe-container">
            <iframe
              src={paymentUrl}
              title="Paymob Payment"
              style={{
                width: '100%',
                height: '600px',
                border: 'none',
                borderRadius: '8px',
              }}
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setShowPaymentIframe(false);
                setPaymentUrl('');
              }}
            />
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        {!showPaymentIframe ? (
          <Button className='btn bg-primary' onClick={handleCheckout} disabled={loading}>
            {loading ? 'Processing...' : 'Complete Order'}
          </Button>
        ) : (
          <Button className='btn bg-primary' onClick={handlePaymentComplete}>
            Close Payment
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default CheckoutModal;
