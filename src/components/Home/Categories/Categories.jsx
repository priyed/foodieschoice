import React from "react";
import Category from "../Categories/Category/Category";
import "./styles.css";

const Categories = () => {
  return (
    <div className="blue-container">
      <div className="categories-container">
        <h3>Categories</h3>
        <Category />
      </div>
    </div>
  );
};

export default Categories;
