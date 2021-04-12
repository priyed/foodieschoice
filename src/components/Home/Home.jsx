import React from "react";
import Header from "../Header/Header";
import { Button } from '@material-ui/core';
import Categories from './Categories/Categories'
import "./styles.css";

const Home = ({ categories }) => {
  return (
    <div className="home-container">
      <Header />
      <div className="about">
        <h3>
          Foodies choice helps you navigate the choice of what to eat by
          breakdown your options from our simple menu. With just a few clicks
          you have a meal delivered super fast!!
        </h3>
        <Button><a href="#about">
          {" "}
          Find out more{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 arrow-icon"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </a>
        </Button>
      </div>
      <Categories categories={categories} />
    </div>
  );
};

export default Home;
