import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './Pages/Home';
import Products from './Pages/Products';
import Cart from './Pages/Cart';
import OrderHistory from './Pages/OrderHistory';
import NotificationSystem from './Components/Notification/NotificationSystem';
import { resetInventory } from './Redux/Order/action';
import metaData from './Redux/Product/metaData';

function App() {
  const dispatch = useDispatch();

  // Reset inventory to fresh data on app start
  useEffect(() => {
    console.log('🔄 Resetting inventory to fresh data...');
    dispatch(resetInventory(metaData.inventory));
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/order-history" element={<OrderHistory/>} />
        </Routes>
        <NotificationSystem />
      </BrowserRouter>
    </div>
  );
}

export default App;
