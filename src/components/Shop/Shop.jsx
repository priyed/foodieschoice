import React from "react";
import Products from "./Products/Products";

import ShopNavigation from "./ShopNavigation/ShopNavigation";

const Shop = ({ products, categories }) => {
  return (
    <div className="shop-container">
      <ShopNavigation categories={categories} />
      <Products products={products} />
    </div>
  );
};

export default Shop;
