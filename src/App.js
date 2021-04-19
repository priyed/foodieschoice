import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Shop from "./components/Shop/Shop";
import All from "./components/Shop/ShopCategory/All";
import Breakfast from "./components/Shop/ShopCategory/Breakfast";
import Lunch from "./components/Shop/ShopCategory/Lunch";
import Dinner from "./components/Shop/ShopCategory/Dinner";

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
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  console.log(products);
  console.log(categories);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home categories={categories} />
          </Route>

          <Route exact path="/shop">
            <Shop products={products} categories={categories} />
          </Route>
          <Route exact path="/shop/all">
            <All products={products} categories={categories} />
          </Route>
          <Route exact path="/shop/breakfast">
            <Breakfast products={products} categories={categories} />
          </Route>
          <Route exact path="/shop/lunch">
            <Lunch products={products} categories={categories} />
          </Route>
          <Route exact path="/shop/dinner">
            <Dinner products={products} categories={categories} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
