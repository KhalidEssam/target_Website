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
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'Suppliance',
          adminId: userInfo.sub,
          partyId: '678566f5dd7f692615b08b7a', // you can replace this with auth-based value
          items: cart.map(({ type, quantity, description, imageUrls }) => ({
            type,
            quantity,
            description,
            imageUrls
          })),
          paymentMethod,
          description: 'Store supplies order',
          priority: 'Medium',
          total: calculateTotal()
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to process order');
      }
  
      const orderData = await response.json();
      return orderData;
  
    } catch (error) {
      toast.error('Order creation failed: ' + error.message);
      return null;
    }
  };
  
  
  // // Handle checkout
  // const handleCheckout = async () => {
  //   if (cart.length === 0) {
  //     toast.error('Your cart is empty!');
  //     return;
  //   }
  //   if(!isLoggedIn) return;

  //   try {
  //     // First create the order
  //     console.log();
  //     const response = await fetch('/api/orders', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         type: 'Suppliance', // or 'Maintenance' etc.
  //         adminId: userInfo.sub, // you must get this from your auth system
  //         partyId: "678566f5dd7f692615b08b7a", // from auth or form
  //         items: cart.map(({ type, quantity, description, imageUrls }) => ({
  //           type,
  //           quantity,
  //           description,
  //           imageUrls
  //         })),
  //         paymentMethod: paymentMethod,
  //         description: 'Store supplies order',
  //         priority: 'Medium', // or Low/High
  //         total: calculateTotal()
  //       })
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to process order');
  //     }

  //     const orderData = await response.json();

  //     // Handle payment based on selected method
  //     if (paymentMethod === 'cash') {
  //       // For cash on delivery, just confirm the order
  //       toast.success('Order created successfully! A representative will contact you for delivery.');
  //       setCart([]);
  //       setCheckoutModal(false);
  //     } else if (paymentMethod === 'online') {
  //       // For online payment, initiate Paymob payment
  //       try {
  //         const paymentResponse = await fetch('/api/payments/initiate', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //             orderId: orderData.id,
  //             amount: calculateTotal(),
  //             orderDescription: 'Store supplies order',
  //             customerEmail: '', // To be implemented with user auth
  //             customerPhone: ''  // To be implemented with user auth
  //           })
  //         });

  //         if (!paymentResponse.ok) {
  //           throw new Error('Failed to initiate payment');
  //         }

  //         const paymentData = await paymentResponse.json();
          
  //         // Use the new payment handling method
  //         handlePaymentInitiate(paymentData.paymentUrl);
  //       } catch (paymentError) {
  //         throw new Error('Failed to initiate online payment: ' + paymentError.message);
  //       }
  //     }

  //   } catch (error) {
  //     toast.error('Error processing order: ' + error.message);
  //   }
  // };

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
        // handleCheckout={handleCheckout}
        calculateTotal={calculateTotal}
        createOrder={createOrder}
      />
    </div>
  );
};

export default ShowAvailableSupplies;