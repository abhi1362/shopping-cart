import React from "react";
import "./CartModal.css";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCirclePlus,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseCart,
  getTotal,
} from "../../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const CartModal = ({ openCartModal, setOpenCartModal }) => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div>
      <Modal
        isOpen={openCartModal}
        onRequestClose={() => setOpenCartModal(false)}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
        ariaHideApp={false}
      >
        {cart.cartTotalQuantity === 0 ? (
          <div className="cart-container-empty">
            <div className="cart-heading">
              <h3 className="mb-0 pt-1">MyCart</h3>
              <button title="Close Cart Modal" onClick={() => setOpenCartModal(false)}>
                <FontAwesomeIcon
                  icon={faXmark}
                  tabIndex={0}
                  className="cart-close-icon"
                />
              </button>
            </div>
            <div className="cart-content mt-5 pt-5 text-center">
              <h3>No items in your cart</h3>
              <p>Your favourite items are just a click away</p>
            </div>
            <div className="cart-footer p-3">
              <button
                onClick={() => {
                  setOpenCartModal(false);
                  navigate("/products");
                }}
              >
                Start Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="cart-container">
            <div className="cart-heading">
              <h3 className="mb-0 pt-1">
                MyCart{" "}
                <span className="total-cartitem-heading">
                  ({cart.cartTotalQuantity} item)
                </span>
              </h3>
              <button title="Close Cart Modal" onClick={() => setOpenCartModal(false)}>
                <FontAwesomeIcon icon={faXmark} className="cart-close-icon" />
              </button>
            </div>
            <div className="cart-content mt-3">
              {cart.cartItems.map((item) => (
                <div className="cartItem pt-3" key={item.id}>
                  <div className="cartItem-image">
                    <img src={item.imageURL} alt="" />
                  </div>
                  <div className="cartItem-information">
                    <div className="cartItem-title">
                      <h3>{item.name}</h3>
                    </div>
                    <div className="cartItem-button">
                      <button
                        title="Remove Item from Cart"
                        onClick={() => {
                          dispatch(decreaseCart(item));
                          dispatch(getTotal());
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faCircleMinus}
                          className="cart-minus-icon"
                        />
                      </button>
                      <p className="mb-0">{item.itemQuantity}</p>
                      <button
                        title="Add Item to Cart"
                        onClick={() => {
                          dispatch(addToCart(item));
                          dispatch(getTotal());
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faCirclePlus}
                          className="cart-plus-icon"
                        />
                      </button>
                      <p className="mb-0">x</p>
                      <p className="mb-0">Rs.{item.price}</p>
                    </div>
                  </div>
                  <div className="cartItem-price">
                    <h4 className="mb-0 mt-2 font-weight-bold">
                      Rs.{item.itemQuantity * item.price}
                    </h4>
                  </div>
                </div>
              ))}
              <div className="cheaper-content">
                <img
                  src="/static/images/lowest-price.png"
                  alt="Lowest price gurantee"
                />
                <p className="mb-0 pl-4">You won't find it cheaper anywhere</p>
              </div>
            </div>
            <div className="cart-footer p-3">
              <p className="text-center font-weight-bold">
                Promo code can be applied on payment page
              </p>
              <button
                className="checkout-button"
                onClick={() => {
                  navigate("/");
                  setOpenCartModal(false);
                }}
              >
                <span>Proceed to Checkout</span>
                <span>Rs.{cart.cartTotalPrice} &gt;</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CartModal;
