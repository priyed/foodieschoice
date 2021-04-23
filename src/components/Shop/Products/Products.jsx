import React from "react";
import Product from "./Product/Product";
import "./style.css";

const Products = ({ products, addToCart }) => {
  return (
    <div className="section-center">
      {" "}
      {products.map((product) => (
        <Product product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default Products;
