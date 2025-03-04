// ProductList.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductItem from './ProductItem';
import { FaCartArrowDown } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { StoreContext } from './StoreContext';

const ProductList = () => {
  const navigate = useNavigate();
  const { items } = useContext(StoreContext);  // Use items from context

  const goToCart = () => {
    navigate('/cart');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <div>
      <div className="bg-black ml-0 mr-0 mt-4 mb-4 p-4 shadow-md flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <span>MyStore</span>
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
        {items.map((item) => (
          <ProductItem
            key={item._id}
            itemId={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
            description={item.description}
            color={item.color}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
