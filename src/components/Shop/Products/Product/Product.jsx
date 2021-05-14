import React from "react";
import "./styles.css";
import { Button } from "@material-ui/core"

const Product = ({ product, addToCart }) => {
  return (
    
      <div className="product-card">
        <img src={product.media.source} alt={product.name} />
        <div className="product-details">
          <header>
            <h4>{product.name}</h4>
            <h4 className="price">{product.price.formatted_with_symbol}</h4>
          </header>
          <p
            dangerouslySetInnerHTML={{ __html: product.description }}
            className="product-description"
          />
         <Button onClick={() => addToCart(product.id, 1)}>ADD TO BAG</Button>
        </div>
      </div>
  );
};

export default Product;
