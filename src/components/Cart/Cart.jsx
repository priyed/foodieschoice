import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Cartitem from "./Cartitem/Cartitem";
import "./style.css";

const Cart = ({
  cart,
  handleUpdateCartQuantity,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const EmptyCart = () => (
    <div className="section-center">
      <div className="empty-cart-container">
        <div className="empty-cart-emoji">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={0.6}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p>Your bag is empty!!!</p>
        <Link to="/shop" className="shop-link">
          <Button>order some food :)</Button>
        </Link>
      </div>
    </div>
  );

  const FilledCart = () => (
    <>
      <h3 className="filled-cart-header">Your Meal Bag</h3>
      <div className="section-center">
        {cart.line_items.map((item) => (
          <Cartitem
            item={item}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onRemoveFromCart={handleRemoveFromCart}
          />
        ))}
      </div>
      <div className="actions-container">
        <div className="cart_totalandActions section-center">
          <div className="total-items">
            {cart.total_items === 1 ? (
              <p>
                You have {cart.total_items} item in your bag.{" "}
                <Link to="/shop" className="add-more">
                  ADD SOME MORE
                </Link>
              </p>
            ) : (
              <p>
                You have {cart.total_items} items in your bag.{" "}
                <Link to="/shop" className="add-more">
                  ADD MORE
                </Link>
              </p>
            )}
          </div>
          <div className="price-details">
            <p>
              Subtotal: <span>{cart.subtotal.formatted_with_symbol}</span>
            </p>
          </div>
          <div className="cart-actions">
            <Button className="empty-cart-btn" onClick={handleEmptyCart}>
              Empty Cart
            </Button>
            <Button className="checkout-btn" component={Link} to="/checkout">
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  if (!cart.line_items)
    return (
      <div className="loader section-center">
        <p>Loading...</p>
      </div>
    );
  return (
    <div className="">
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </div>
  );
};

export default Cart;
