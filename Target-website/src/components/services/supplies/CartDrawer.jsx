import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCartDrawerOpen } from "../../../store/features/cartSlice";
import { useTranslation } from "../../../hooks/useTranslation";

const CartDrawer = ({ setCheckoutModal, removeFromCart, updateQuantity }) => {
  const { items: cart, total, cartOpen } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { translate: t } = useTranslation();


  const toggleCartDrawer = () => {
    dispatch(setCartDrawerOpen(!cartOpen));
  };

  return (
    <>
      <div className="cart-button">
        <Button
          color="primary"
          className="bg-primary m-2"
          onClick={toggleCartDrawer}
        >
          <FaShoppingCart /> {t("Supplies.Cart")} ({cart.length})
        </Button>
      </div>

      <Modal isOpen={cartOpen} toggle={toggleCartDrawer} size="lg">
        <ModalHeader toggle={toggleCartDrawer}>{t("Supplies.yourCart")}</ModalHeader>
        <ModalBody>
          {cart.length === 0 ? (
            <p>{t("Supplies.emptyCart")}</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="cart-item position-relative border p-3 mb-3 rounded shadow-sm"
                >
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
                    <p>{t("Supplies.Price")}: ${item.price}</p>
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
                      {t("Supplies.remove")}
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-total">
                <h4>
                  {t("Supplies.total")}: ${total}</h4>
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
              {t("Supplies.logintoCheckout")}
            </Button>
          ) : total > 0 ? (
            <Button
              color="primary"
              className="bg-primary m-2"
              onClick={() => setCheckoutModal(true)}
            >
              {t("Supplies.checkoutProceed")}
            </Button>
          ) : null}
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CartDrawer;
