import React from "react";
import Products from "./Products/Products";

import ShopNavigation from "./ShopNavigation/ShopNavigation";

const Shop = ({ products, categories, onAddToCart }) => {
  return (
    <div className="shop-container">
      <ShopNavigation categories={categories} />
      <Products products={products} addToCart={onAddToCart} />
    </div>
  );
};

export default Shop;
