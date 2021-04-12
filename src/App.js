import React, { useState, useEffect } from 'react';
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";



const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCategories = async () => {
    const { data } = await commerce.categories.list();
    
    setCategories(data);
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  console.log(products);
  console.log(categories);

  return (
    <div>
      <Navbar />
      <Home/>
    </div>
  )
}

export default App
