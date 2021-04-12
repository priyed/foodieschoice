import React from "react";
import dinnerImage from "../../../../assets/images/categoryImages/dinner.png";
import lunchImage from "../../../../assets/images/categoryImages/lunch.png";
import breakfastImage from "../../../../assets/images/categoryImages/breakfast.png";
import './styles.css';

const Category = () => {
  return (
    <div className="category-container grid">
      <div className="breakfast-container menu">
        <img src={breakfastImage} alt="breafast" />
        <h5>Breakfast Menu</h5>
      </div>
      <div className="lunch-container menu">
        <img src={lunchImage} alt="lunch" />
        <h5>Lunch Menu</h5>
      </div>
      <div className="dinner-container menu">
        <img src={dinnerImage} alt="dinner" />
        <h5>Dinner Menu</h5>
      </div>
    </div>
  );
};

export default Category;
