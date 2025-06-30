import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({
  cart,
  cartOpen,
  setCartOpen,
  checkoutModal,
  setCheckoutModal,
  removeFromCart,
  updateQuantity,
  calculateTotal,
}) => {
  const { isLoggedIn, userInfo } = useSelector((state) => state.user);
  const Total = calculateTotal();
  const navigate = useNavigate();

  return (
    <>
      <div className="cart-button ">
        <Button
          color="primary"
          className="bg-primary m-2"
          onClick={() => setCartOpen(!cartOpen)}
        >
          <FaShoppingCart /> Cart ({cart.length})
        </Button>
      </div>

      <Modal isOpen={cartOpen} toggle={() => setCartOpen(!cartOpen)} size="lg">
        <ModalHeader toggle={() => setCartOpen(!cartOpen)}>
          Your Cart
        </ModalHeader>
        <ModalBody>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="cart-item position-relative border p-3 mb-3 rounded shadow-sm"
                >
                  {/* Product image floated right */}
                  <img
                    src={item.imageUrls[0]}
                    alt={item.type}
                    className="float-end ms-3"
                    style={{
                      width: "100px",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />

                  <h5>{item.type}</h5>
                  <h6>{item.description}</h6>

                  <div className="cart-item-details mt-2">
                    <p>Price: ${item.price}</p>
                    <div className="quantity-controls d-flex align-items-center">
                      <button
                        className="btn btn-secondary btn-sm me-2"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-secondary btn-sm ms-2"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-danger btn-sm mt-2"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
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
          {!isLoggedIn ? (
            <Button
              color="primary"
              className="bg-primary m-2"
              onClick={() => navigate("/login")}
            >
              Login to Checkout
            </Button>
          ) : Total > 0 ? (
            <Button
              color="primary"
              className="bg-primary m-2"
              onClick={() => setCheckoutModal(true)}
            >
              Proceed to Checkout
            </Button>
          ) : null}
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CartDrawer;
