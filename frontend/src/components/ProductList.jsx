// ProductList.js
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductItem from './ProductItem';
import { FaCartArrowDown } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { StoreContext } from './StoreContext';

const ProductList = () => {
  const navigate = useNavigate();
  const { items } = useContext(StoreContext);  

  
  const [searchQuery, setSearchQuery] = useState(() => {
    const savedQuery = localStorage.getItem("searchQuery");
    return savedQuery || ""; 
  });

  useEffect(() => {
    // Store the search query in localStorage every time it changes
    if (searchQuery) {
      localStorage.setItem("searchQuery", searchQuery);
    }
  }, [searchQuery]);  // Run this effect whenever searchQuery changes

  // Filter products based on search query
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const goToCart = () => {
    navigate('/cart');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);  // Update search query as user types
  };

  return (
    <div>
      <div className="bg-black ml-0 mr-0 mt-4 mb-4 p-4 shadow-md flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <span>MyStore</span>
        </div>
        <div className="flex items-center">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}  // Controlled input
            onChange={handleSearchChange}  // Handle input change
            className="p-2 border rounded mr-2 text-white w-full sm:w-64 md:w-150 lg:w-200"
          />
          <button 
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            onClick={() => {}}
          >
            Search
          </button>
        </div>
        <div className="flex items-center gap-10">
          <FaCartArrowDown
            onClick={goToCart}
            className="text-white text-3xl cursor-pointer"
          />
          <VscAccount
            onClick={goToProfile}
            className="text-white text-3xl cursor-pointer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ProductItem
              key={item._id}
              itemId={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
              description={item.description}
              color={item.color}
              category={item.category}
            />
          ))
        ) : (
          <div className="text-white text-center">No products found</div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
