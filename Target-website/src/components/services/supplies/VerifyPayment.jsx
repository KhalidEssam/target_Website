import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CiCircleCheck, CiCircleAlert, CiCircleRemove } from 'react-icons/ci';
import { usePaymentWebSocket, usePaymentNotifications } from '../../../utils/websocket';
import styles from './VerifyPayment.module.css';
import { useTranslation } from '../../../hooks/useTranslation';

const VerifyPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { translate: t } = useTranslation();

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
          toast.success(t('verifyPayment.messages.success'));
          break;
        case 'failed':
          toast.error(t('verifyPayment.messages.failed'));
          break;
        case 'pending':
          toast.info(t('verifyPayment.messages.pending'));
          break;
        default:
          toast.warning(t('verifyPayment.messages.statusUpdated'));
      }

      if (['success', 'failed'].includes(notification.status)) {
        setTimeout(() => {
          navigate('/orders');
        }, 3000);
      }
    }
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    console.log(urlParams)

    // Extract params according to your URL keys
    const successParam = urlParams.get('success');
    const pendingParam = urlParams.get('pending');
    const idParam = urlParams.get('id'); // transaction id
    const orderParam = urlParams.get('order'); // order id

    // Determine status based on success and pending flags
    let status = null;
    if (successParam === 'true') status = 'success';
    else if (pendingParam === 'true') status = 'pending';
    else if (successParam === 'false') status = 'failed';

    setPaymentStatus(status);
    if (orderParam) setOrderId(orderParam);
    if (idParam) setTransactionId(idParam);

    // Show toast notification on load based on status
    switch (status) {
      case 'success':
        toast.success(t('verifyPayment.messages.success'));
        break;
      case 'failed':
        toast.error(t('verifyPayment.messages.failed'));
        break;
      case 'pending':
        toast.info(t('verifyPayment.messages.pending'));
        break;
      default:
        toast.warning(t('verifyPayment.messages.statusUnknown'));
    }

    // Redirect if final status
    // if (status === 'success' || status === 'failed') {
    //   setTimeout(() => {
    //     navigate('/orders');
    //   }, 3000);
    // }
  }, [location.search, navigate]);

  return (
    <div className={styles['payment-verification-container']}>
      <div className={styles['payment-verification-box']}>
        {!isConnected && (
          <div className={styles['connection-status'] + ' ' + styles['warning']}>
            <CiCircleAlert className={styles['status-icon'] + ' ' + styles['pending']} />
            {t('verifyPayment.messages.connectingToServer')}
          </div>
        )}

        {error && (
          <div className={styles['connection-status'] + ' ' + styles['error']}>
            <CiCircleRemove className={styles['status-icon'] + ' ' + styles['failed']} />
            Connection error: {error.message}
          </div>
        )}

        <div className={styles['status-icon'] + ' ' + 
          (paymentStatus === 'success' ? styles['success'] : 
           paymentStatus === 'failed' ? styles['failed'] : 
           paymentStatus === 'pending' ? styles['pending'] : 
           styles['unknown'])}>
          {paymentStatus === 'success' ? <CiCircleCheck /> : 
           paymentStatus === 'failed' ? <CiCircleRemove /> : 
           <CiCircleAlert />}
        </div>

        <h2 className={styles['status-title']}>
          {paymentStatus === 'success' ? 'Payment Successful' : 
           paymentStatus === 'failed' ? 'Payment Failed' : 
           paymentStatus === 'pending' ? 'Payment Pending' : 
           'Payment Status'}
        </h2>

        <div className={styles['status-details']}>
          <p className={styles['detail-label']}>Status:</p>
          <p className={styles['detail-value']}>{
            paymentStatus === 'success' ? t('verifyPayment.status.completed') : 
            paymentStatus === 'failed' ? t('verifyPayment.status.failed') : 
            paymentStatus === 'pending' ? t('verifyPayment.status.pending') : 
            t('verifyPayment.status.unknown')
          }</p>

          {orderId && (
            <>
              <p className={styles['detail-label']}>{t('verifyPayment.labels.orderID')}</p>
              <p className={styles['detail-value']}>{orderId}</p>
            </>
          )}

          {transactionId && (
            <>
              <p className={styles['detail-label']}>{t('verifyPayment.labels.transactionID')}</p>
              <p className={styles['detail-value']}>{transactionId}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyPayment;
