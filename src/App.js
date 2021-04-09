import React, { useState, useEffect } from 'react';
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home"

const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
    </div>
  )
}

export default App
