import React from "react";
import { Button } from "@material-ui/core";
  import './style.css'

const Cartitem = ({ item, onUpdateCartQuantity, onRemoveFromCart }) => {
  return (
    <div className="cart-item-card">
      
        <img className="item-image" src={item.media.source} alt={item.name} />
        <div className="item-details">
          <header>
            <h4>{item.name}</h4>
            <h4 className="price">{item.price.formatted_with_symbol}</h4>
          </header>
          <div className="item-buttons">
            <div className="item-quantity">

           
          <p className="quantity">quantity</p>
            <div className="addandsubBtns">
              
              <Button
                onClick={() => onUpdateCartQuantity(item.id, item.quantity - 1)}
              >
                -
              </Button>
              <p>{item.quantity}</p>
              <Button
                onClick={() => onUpdateCartQuantity(item.id, item.quantity + 1)}
              >
                +
              </Button>
            </div>
            </div>
            <Button className="remove-btn" onClick={() => onRemoveFromCart(item.id)}>
                Remove
            </Button>
          </div>
        </div>
    </div>
  );
};

export default Cartitem;
