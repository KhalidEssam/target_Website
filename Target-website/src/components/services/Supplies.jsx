import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setCartDrawerOpen,
} from "../../store/features/cartSlice";

import SupplySearch from "./supplies/SupplySearch";
import FetchedSupply from "./supplies/FetchedSupply";
import AvailableSupplies from "./supplies/AvailableSupplies";
import CartDrawer from "./supplies/CartDrawer";
import CheckoutModal from "./supplies/CheckoutModal";

const ShowAvailableSupplies = ({ supplies }) => {
  const [supplyData, setSupplyData] = useState(null);
  // const [cartOpen, setCartOpen] = useState(false);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const token = useSelector((state) => state.token.accessToken);
  const { items: cart, total } = useSelector((state) => state.cart);
  const { isLoggedIn, userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Add item to cart using Redux
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Item added to cart!");
  };

  // Remove item from cart
  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
    toast.error("Item removed from cart!");
  };

  // Update item quantity
  const handleUpdateQuantity = (itemId, quantity) => {
    dispatch(updateQuantity({ itemId, quantity }));
    if (quantity < 1) {
      toast.error("Item removed from cart!");
    }
  };

  // Order creation logic
  const createOrder = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return null;
    }
    if (!isLoggedIn) {
      toast.error("You must be logged in to place an order.");
      return null;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderMode: "B2C",
          type: "Suppliance",
          userId: userInfo.sub,
          items: cart.map(
            ({ type, quantity, description, imageUrls, price, _id }) => ({
              type,
              quantity,
              description,
              imageUrls,
              price,
              _id,
            })
          ),
          paymentMethod,
          description: "Store supplies order",
          priority: "Medium",
          totalAmount: total,
          paymentDueDate: new Date().toISOString(),
          status: "Pending",
          paymentStatus: "pending",
        }),
      });

      if (!response.ok) throw new Error("Failed to create order");
      const orderData = await response.json();
      return orderData;
    } catch (error) {
      toast.error("Order processing failed: " + error.message);
      console.error("Order error:", error);
      return null;
    }
  };

  return (
    <div className="supplies-service-page mt-vh">
      <SupplySearch supplies={supplies} setSupplyData={setSupplyData} />
      <FetchedSupply supplyData={supplyData} />
      <AvailableSupplies supplies={supplies} addToCart={handleAddToCart} />

      <CartDrawer
        // cartOpen={cartOpen}
        setCartOpen={setCartDrawerOpen}
        setCheckoutModal={setCheckoutModal}
        removeFromCart={handleRemoveFromCart}
        updateQuantity={handleUpdateQuantity}
      />

      <CheckoutModal
        checkoutModal={checkoutModal}
        setCheckoutModal={setCheckoutModal}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        total={total}
        createOrder={createOrder}
        clearCart={() => dispatch(clearCart())}
      />
    </div>
  );
};

export default ShowAvailableSupplies;
