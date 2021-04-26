import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Cart,
  Navbar,
  Shop,
  All,
  Breakfast,
  Lunch,
  Dinner,
  Home,
} from "./components/index";

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCategories = async () => {
    const { data } = await commerce.categories.list();

    setCategories(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  };

  const handleUpdateCartQuantity = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchCart();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Home categories={categories} />
          </Route>

          <Route exact path="/shop">
            <Shop
              products={products}
              categories={categories}
              onAddToCart={handleAddToCart}
            />
          </Route>
          <Route exact path="/shop/all">
            <All
              products={products}
              categories={categories}
              onAddToCart={handleAddToCart}
            />
          </Route>
          <Route exact path="/shop/breakfast">
            <Breakfast
              products={products}
              categories={categories}
              onAddToCart={handleAddToCart}
            />
          </Route>
          <Route exact path="/shop/lunch">
            <Lunch
              products={products}
              categories={categories}
              onAddToCart={handleAddToCart}
            />
          </Route>
          <Route exact path="/shop/dinner">
            <Dinner
              products={products}
              categories={categories}
              onAddToCart={handleAddToCart}
            />
          </Route>

          <Route exact path="/cart">
            <Cart
              cart={cart}
              handleEmptyCart={handleEmptyCart}
              handleRemoveFromCart={handleRemoveFromCart}
              handleUpdateCartQuantity={handleUpdateCartQuantity}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
