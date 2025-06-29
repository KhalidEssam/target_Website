import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FaShoppingCart } from 'react-icons/fa';

const CartDrawer = ({
  cart,
  cartOpen,
  setCartOpen,
  checkoutModal,
  setCheckoutModal,
  removeFromCart,
  updateQuantity,
  calculateTotal
}) => {
  return (
    <>
      <div className="cart-button">
        <Button color="primary" onClick={() => setCartOpen(!cartOpen)}>
          <FaShoppingCart /> Cart ({cart.length})
        </Button>
      </div>

      <Modal isOpen={cartOpen} toggle={() => setCartOpen(!cartOpen)} size="lg">
        <ModalHeader toggle={() => setCartOpen(!cartOpen)}>Your Cart</ModalHeader>
        <ModalBody>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div key={item._id} className="cart-item">
                  <h5>{item.type}</h5>
                  <div className="cart-item-details">
                    <p>Price: ${item.price}</p>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                    </div>
                    <button onClick={() => removeFromCart(item._id)}>Remove</button>
                  </div>
                </div>
              ))}
              <div className="cart-total">
                <h4>Total: ${calculateTotal()}</h4>
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setCheckoutModal(true)}>
            Proceed to Checkout
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CartDrawer;
