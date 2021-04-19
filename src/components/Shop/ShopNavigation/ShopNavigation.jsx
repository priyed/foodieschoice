import React from "react";
import { NavLink } from "react-router-dom";
import './style.css';

const ShopNavigation = ({ categories }) => {
  return (
    <>
    <ul className="shopnav-container">    
      {categories.map((category) => (
        <li key={category.id}>
          <NavLink activeClassName="active" exact to={`/shop/${category.slug}`}>
            {category.name} <span>({category.products})</span>
          </NavLink>
        </li>
      ))}
      </ul>

      
    </>
  );
};

export default ShopNavigation;
