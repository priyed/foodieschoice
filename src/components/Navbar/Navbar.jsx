import React, { useState, useEffect } from "react";
import { debounce } from "../../utilities/helpers";
import "./styles.css";
import { Link } from "react-router-dom"

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = debounce(() => {
    //find current scroll position
    const currentScrollPos = window.pageYOffset;

    // set state based on location info
    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 70) ||
        currentScrollPos < 10
    );

    // set state to new scroll position
    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  const openNav = () => {
    document.getElementById("mySidenav").style.height = "100vh";
    document.getElementById("main").style.marginTop = "250px";
    document.getElementById("main").style.display = "none";
    document.getElementById("menu").style.transform = "scale(1)";
    document.body.classList.toggle("lock-scroll");
  };

  const closeNav = () => {
    document.getElementById("mySidenav").style.height = "0";
    document.getElementById("main").style.marginTop = "0";
    document.getElementById("main").style.display = "block";
    document.getElementById("menu").style.transform = "scale(0)";
    document.body.classList.toggle("lock-scroll");
  };

  return (
    <nav className="navigation">
      <div id="main" className="lock-scroll">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={openNav}
          className="menubtn"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M4 8h16M4 16h16"
          />
        </svg>
      </div>

      <div className="name">
        <p>foodies choice</p>
      </div>

      <div className="cart-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cart"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <span className="badge">0</span>
      </div>

      <div id="mySidenav" className="sidenav">
        <a href="#c" className="closebtn" onClick={closeNav}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </a>
        <ul id="menu">
          <li>
            <a className="link" href="#home" onClick={closeNav}>
              Home
            </a>
          </li>
          <li>
            <a className="link" href="#about" onClick={closeNav}>
              About
            </a>
          </li>
          <li>
            <a className="link" href="#shop" onClick={closeNav}>
              Shop
            </a>
          </li>
        </ul>
      </div>
       {/*Desktop Navigation */}
       <div className="desktop-navigation">
        <ul>
          <li>
            <a className="link" href="#about">
              About
            </a>
          </li>
          <li>
            <a className="link" href="#shop">
              Shop
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
