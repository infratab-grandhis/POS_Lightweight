import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './Pages/Home';
import Products from './Pages/Products';
import Cart from './Pages/Cart';
import OrderHistory from './Pages/OrderHistory';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/order-history" element={<OrderHistory/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
