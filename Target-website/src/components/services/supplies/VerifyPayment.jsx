import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CiCircleCheck , CiCircleAlert, CiCircleRemove  } from 'react-icons/ci';

const VerifyPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [transactionId, setTransactionId] = useState(null);

  useEffect(() => {
    // Get payment status from query parameters
    const urlParams = new URLSearchParams(location.search);
    const status = urlParams.get('status');
    const orderId = urlParams.get('orderId');
    const transactionId = urlParams.get('transactionId');

    if (status) {
      setPaymentStatus(status);
    }
    if (orderId) {
      setOrderId(orderId);
    }
    if (transactionId) {
      setTransactionId(transactionId);
    }

    // Handle different status cases
    switch (status) {
      case 'success':
        toast.success('Payment successful! Your order has been confirmed.');
        break;
      case 'failed':
        toast.error('Payment failed. Please try again.');
        break;
      case 'pending':
        toast.info('Payment is pending. Please wait for confirmation.');
        break;
      default:
        toast.warning('Payment status unknown.');
    }

    // Redirect to order confirmation page after 3 seconds
    setTimeout(() => {
      navigate('/orders');
    }, 3000);
  }, [location.search, navigate]);

  return (
    <div className="payment-verification-container">
      <div className="payment-verification-box">
        {paymentStatus === 'success' ? (
          <div className="status-icon success">
            <CiCircleCheck  />
          </div>
        ) : paymentStatus === 'failed' ? (
          <div className="status-icon failed">
            <CiCircleRemove  />
          </div>
        ) : paymentStatus === 'pending' ? (
          <div className="status-icon pending">
            <CiCircleAlert />
          </div>
        ) : (
          <div className="status-icon unknown">
            <CiCircleAlert />
          </div>
        )}

        <h2>Payment Status</h2>
        <p>Status: {paymentStatus || 'Unknown'}</p>
        {orderId && <p>Order ID: {orderId}</p>}
        {transactionId && <p>Transaction ID: {transactionId}</p>}
      </div>
    </div>
  );
};

export default VerifyPayment;
