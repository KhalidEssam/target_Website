import { useEffect, useState } from 'react';

export const usePaymentWebSocket = () => {
  const [connection, setConnection] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('wss://target-backend-production.up.railway.app/api/websocket');
    ws.onopen = () => {
      console.log('WebSocket connected');
      setConnection(ws);
      setIsConnected(true);
      setError(null);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setConnection(null);
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError(error);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return { connection, isConnected, error };
};

export const usePaymentNotifications = (connection, onNotification) => {
  useEffect(() => {
    if (connection) {
      connection.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'payment_status_update') {
            onNotification(data);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
    }
  }, [connection, onNotification]);
};
