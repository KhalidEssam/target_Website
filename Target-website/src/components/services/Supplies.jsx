import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SupplySearch from './supplies/SupplySearch';
import FetchedSupply from './supplies/FetchedSupply';
import AvailableSupplies from './supplies/AvailableSupplies';
import CartDrawer from './supplies/CartDrawer';
import CheckoutModal from './supplies/CheckoutModal';
import { useSelector } from 'react-redux';

const ShowAvailableSupplies = ({ supplies }) => {
  const [supplyData, setSupplyData] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const { isLoggedIn, userInfo } = useSelector((state) => state.user);

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
    if (newQuantity < 1) {
      // Remove the item if quantity is less than 1
      setCart(cart.filter(item => item._id !== itemId));
      toast.error('Item removed from cart!');
    } else {
      // Otherwise update quantity
      const updatedCart = cart.map(item =>
        item._id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      );
      setCart(updatedCart);
    }
  };
  
  const calculateTotal = () => {
    const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    return parseFloat(total.toFixed(2));
    // return total
  };
  const createOrder = async () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return null;
    }
    if (!isLoggedIn) {
      toast.error('You must be logged in to place an order.');
      return null;
    }

    try {
      // Calculate total amount
      const totalAmount = calculateTotal();
      
      // Get payment method from state
      const selectedPaymentMethod = paymentMethod || 'cash';
      
      // Start by creating the order
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderMode: 'B2C',
          type: 'Suppliance',
          // adminId: userInfo.sub,
          // partyId: '678566f5dd7f692615b08b7a', // Replace with actual party ID from auth
          userId: userInfo.sub,
          items: cart.map(({ type, quantity, description, imageUrls, price }) => ({
            type,
            quantity,
            description,
            imageUrls,
            price // Include price in items for total calculation
          })),
          paymentMethod: selectedPaymentMethod,
          description: 'Store supplies order',
          priority: 'Medium',
          totalAmount: totalAmount,
          paymentDueDate: new Date().toISOString(),
          status: 'Pending',
          paymentStatus: 'pending'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      const orderData = await response.json();
      return orderData;

    } catch (error) {
      toast.error('Order processing failed: ' + error.message);
      console.error('Order processing error:', error);
      return null;
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
        setCart={setCart}
        calculateTotal={calculateTotal}
        createOrder={createOrder}
      />
    </div>
  );
};

export default ShowAvailableSupplies;