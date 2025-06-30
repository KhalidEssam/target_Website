import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CiCircleCheck, CiCircleAlert, CiCircleRemove } from 'react-icons/ci';
import { usePaymentWebSocket, usePaymentNotifications } from '../../../utils/websocket';

const VerifyPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [transactionId, setTransactionId] = useState(null);

  const { connection, isConnected, error } = usePaymentWebSocket();

  // Handle real-time payment updates
  usePaymentNotifications(connection, (notification) => {
    if (!orderId) return;

    if (notification.order_id?.toString() === orderId?.toString()) {
      setPaymentStatus(notification.status);
      setTransactionId(notification.transaction_id);

      switch (notification.status) {
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
          toast.warning('Payment status updated.');
      }

      // Redirect after update
      if (['success', 'failed'].includes(notification.status)) {
        setTimeout(() => {
          navigate('/orders');
        }, 3000);
      }
    }
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const status = urlParams.get('status');
    const orderIdParam = urlParams.get('orderId');
    const transactionIdParam = urlParams.get('transactionId');

    if (status) setPaymentStatus(status);
    if (orderIdParam) setOrderId(orderIdParam);
    if (transactionIdParam) setTransactionId(transactionIdParam);

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

    if (status === 'success' || status === 'failed') {
      setTimeout(() => {
        navigate('/orders');
      }, 3000);
    }
  }, [location.search, navigate]);

  return (
    <div className="payment-verification-container">
      <div className="payment-verification-box">
        {!isConnected && (
          <p className="text-warning mb-2">Connecting to server for updates...</p>
        )}
        {error && (
          <p className="text-danger mb-2">WebSocket error: {error.message}</p>
        )}

        {paymentStatus === 'success' ? (
          <div className="status-icon success"><CiCircleCheck /></div>
        ) : paymentStatus === 'failed' ? (
          <div className="status-icon failed"><CiCircleRemove /></div>
        ) : paymentStatus === 'pending' ? (
          <div className="status-icon pending"><CiCircleAlert /></div>
        ) : (
          <div className="status-icon unknown"><CiCircleAlert /></div>
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
