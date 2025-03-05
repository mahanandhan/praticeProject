// ProductItem.js
import React, { useContext } from "react";
import { StoreContext } from "./StoreContext";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ itemId, name, image, color, price, description, category }) => {
  const { cart, addToCart, removeFromCart } = useContext(StoreContext);
  const quantity = cart[itemId] || 0;  // Get quantity for the specific item
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate('/details/' + itemId);
  };

  return (
    <div className="border rounded-lg p-4 shadow-lg bg-white hover:shadow-xl transition">
      <img
        src={`https://praticeproject.onrender.com/images/${image}`}
        alt={name}
        className="h-40 object-cover rounded-md mx-auto"
      />
      <h3 className="text-lg font-semibold mt-2">{name}</h3>
      <p className={`text-sm ${color}`}>{name}</p>
      <p>Price: ₹{price}</p>
      <p>Category: {category}</p>
      <p>Description: {description}</p>

      {quantity > 0 ? (
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => removeFromCart(itemId)}  // Decrease the quantity for this item
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
          >
            -
          </button>
          <p className="text-lg font-bold">{quantity}</p>
          <button
            onClick={() => addToCart(itemId)}  // Increase the quantity for this item
            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-300"
          >
            +
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => addToCart(itemId)}  // Add this item to the cart
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md text-lg hover:bg-blue-600 transition duration-300 w-full cursor-pointer"
          >
            Add to Cart
          </button>
          <button
            onClick={goToDetails}
            className="mt-2 bg-yellow-300 text-black text-lg px-4 py-2 rounded-md hover:bg-yellow-500 transition duration-300 w-full cursor-pointer"
          >
            View Details
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
