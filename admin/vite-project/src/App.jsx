import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import ListProduct from './components/ListProduct';
import Dashboard from './pages/Dashboard';
import UserList from './components/UserList';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/productlist" element={<ListProduct />} />
        <Route path="/" element={<Dashboard />} />
        <Route path='/user' element={<UserList />} />
      </Routes>
    </div>
  );
};

export default App;
