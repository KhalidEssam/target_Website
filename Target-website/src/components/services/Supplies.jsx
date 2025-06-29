import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SupplySearch from './supplies/SupplySearch';
import SupplyCard from './supplies/SupplyCard';
import FetchedSupply from './supplies/FetchedSupply';
import AvailableSupplies from './supplies/AvailableSupplies';
import CartDrawer from './supplies/CartDrawer';
import CheckoutModal from './supplies/CheckoutModal';

const ShowAvailableSupplies = ({ supplies }) => {
  const [supplyData, setSupplyData] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  // Handle form submission for fetching a specific supply
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supplyId) {
      setError('Please enter a supply ID.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/orders/${supplyId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch supply details.');
      }
      const data = await response.json();
      setSupplyData(data);
    } catch (err) {
      setError(err.message);
      setSupplyData(null);
    } finally {
      setLoading(false);
    }
  };

  // Cart management functions
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem._id === item._id);
    const updatedCart = existingItem 
      ? cart.map(cartItem => 
          cartItem._id === item._id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      : [...cart, { ...item, quantity: 1 }];
    setCart(updatedCart);
    toast.success('Item added to cart!');
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item._id !== itemId));
    toast.error('Item removed from cart!');
  };

  const updateQuantity = (itemId, newQuantity) => {
    const updatedCart = cart.map(item => 
      item._id === itemId 
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }

    try {
      // First create the order
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          paymentMethod: paymentMethod,
          total: calculateTotal()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to process order');
      }

      const orderData = await response.json();

      // Handle payment based on selected method
      if (paymentMethod === 'cash') {
        // For cash on delivery, just confirm the order
        toast.success('Order created successfully! A representative will contact you for delivery.');
        setCart([]);
        setCheckoutModal(false);
      } else if (paymentMethod === 'online') {
        // For online payment, initiate Paymob payment
        try {
          const paymentResponse = await fetch('/api/payments/initiate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderId: orderData.id,
              amount: calculateTotal(),
              orderDescription: 'Store supplies order',
              customerEmail: '', // To be implemented with user auth
              customerPhone: ''  // To be implemented with user auth
            })
          });

          if (!paymentResponse.ok) {
            throw new Error('Failed to initiate payment');
          }

          const paymentData = await paymentResponse.json();
          
          // Open Paymob payment window
          window.open(paymentData.paymentUrl, '_blank');
          
          // Wait for payment status update
          // This should be implemented with a webhook from Paymob
          toast.info('Payment window opened. Please complete the payment.');
        } catch (paymentError) {
          throw new Error('Failed to initiate online payment: ' + paymentError.message);
        }
      }

    } catch (error) {
      toast.error('Error processing order: ' + error.message);
    }
  };

  return (
    <div className="supplies-service-page mt-vh">
      <SupplySearch supplies={supplies} setSupplyData={setSupplyData} />
      <FetchedSupply supplyData={supplyData} />
      <AvailableSupplies supplies={supplies} addToCart={addToCart} />
      <CartDrawer
        cart={cart}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        checkoutModal={checkoutModal}
        setCheckoutModal={setCheckoutModal}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        calculateTotal={calculateTotal}
      />
      <CheckoutModal
        checkoutModal={checkoutModal}
        setCheckoutModal={setCheckoutModal}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        cart={cart}
        handleCheckout={handleCheckout}
        calculateTotal={calculateTotal}
      />
    </div>
  );
};

export default ShowAvailableSupplies;