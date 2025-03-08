import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import Payment from './components/Payment';
import Address from './components/Address';
import Details from './components/Details';
import Profile from './components/Profile';
import Start from './components/Start';
import UpdateProfile from './UpdateProfile';
import SearchResults from './components/SearchResults';
import ForgotPassword from './components/ForgotPassword';

const App = () => {
  return (
    <div>

      <Routes>
        {/* Define routes for different pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/address' element={<Address />} />
        <Route path='/details/:itemId' element={<Details />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/" element={<Start />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path='/search-results' element={<SearchResults />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
    </div>
  );
};

export default App;
