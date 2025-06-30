import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckoutModal = ({
  checkoutModal,
  setCheckoutModal,
  paymentMethod,
  setPaymentMethod,
  cart,
  setCart,
  // handleCheckout,
  calculateTotal,
  createOrder
}) => {
  const [showPaymentIframe, setShowPaymentIframe] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
  
    try {
      const orderData = await createOrder();
      console.log(orderData);
      if (!orderData) return;
      if (paymentMethod === 'cash') { 
        toast.success('Order placed successfully (Cash on Delivery)');
        setCart([]); // optional if passed via props
        setCheckoutModal(false);
        return;
      }

      console.log("hi from online");
      // Online payment
      const paymentResponse = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderData._id,
          amount: calculateTotal(),
          orderDescription: 'Store supplies order',
          customerEmail: '', // Get from auth
          customerPhone: ''  // Get from auth
        })
      });
  
      if (!paymentResponse.ok) {
        throw new Error('Failed to initiate payment');
      }
  
      const paymentData = await paymentResponse.json();
      if (paymentData.success) {
        toast.success('Payment initialization successful. Please complete the payment in the iframe.');
        handlePaymentInitiate(paymentData.paymentUrl);
      } else {
        toast.error('Failed to initialize payment. Please try again.');
        throw new Error('Payment response was not successful');
      }
  
    } catch (err) {
      toast.error('Checkout failed: ' + err.message);
      setCheckoutModal(false);
    } finally {
      setLoading(false);
    }
  };
  

  const handlePaymentResponse = async (response) => {
    if (response.success) {
      toast.success('Payment successful! Order has been placed.');
      setCheckoutModal(false);
      setShowPaymentIframe(false);
      setPaymentUrl('');
    } else {
      toast.error('Payment failed. Please try again.');
      setShowPaymentIframe(false);
      setPaymentUrl('');
    }
  };

  const handlePaymentComplete = () => {
    // This will be called when the iframe is closed
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
                <div key={item._id} className="checkout-item">
                  <p>{item.type} x {item.quantity}</p>
                  <p>${item.price * item.quantity}</p>
                </div>
              ))}
              <div className="checkout-total">
                <h4>Total: ${calculateTotal()}</h4>
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
          <Button className='btn bg-primary ' onClick={handleCheckout}>
            {loading ? 'Processing...' : 'Complete Order'}
          </Button>
        ) : (
          <Button className='btn bg-primary ' onClick={handlePaymentComplete}>
            Close Payment
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default CheckoutModal;
