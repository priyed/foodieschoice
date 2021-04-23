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
      <div className="">
        <p>Your bag is empty </p>
        <Link to="/shop" className="shop-link">
          order some food{" "}
        </Link>
      </div>
    </div>
  );

  const FilledCart = () => (
    <>
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
              <p>You have {cart.total_items} item in your bag</p>
            ) : (
              <p>You have {cart.total_items} items in your bag</p>
            )}
          </div>
          <div className="price-details">
            <p>Subtotal: <span>{cart.subtotal.formatted_with_symbol}</span></p>
          </div>
          <div className="cart-actions">
            <Button className="empty-cart" onClick={handleEmptyCart}>
              Empty Cart
            </Button>
            <Button className="checkout" component={Link} to="/checkout">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  if (!cart.line_items) return "Loading...";
  return (
    <div className="">
      <p>Your Meal Bag</p>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </div>
  );
};

export default Cart;
