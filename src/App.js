import React, { useState, useEffect } from 'react';
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar"

const App = () => {
  return (
    <div>
      <Navbar />
    </div>
  )
}

export default App
