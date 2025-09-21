import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './Pages/Home';
import Products from './Pages/Products';
import Cart from './Pages/Cart';
import OrderHistory from './Pages/OrderHistory';
import KitchenDisplay from './Pages/KitchenDisplay';
import NotificationSystem from './Components/Notification/NotificationSystem';
import './utils/offlineSync'; // Initialize offline sync

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/order-history" element={<OrderHistory/>} />
          <Route path="/kitchen" element={<KitchenDisplay/>} />
        </Routes>
        <NotificationSystem />
      </BrowserRouter>
    </div>
  );
}

export default App;
