import React from "react";
import Product from "./Product/Product";
import './style.css';

const Products = ({ products, categories }) => {
  return (
    <div className="section-center">        {products.map((product) => (
         
            <Product product={product} />
        ))}

    </div>
  );
};

export default Products;
