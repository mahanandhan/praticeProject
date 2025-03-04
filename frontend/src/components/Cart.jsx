import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from './StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, totalAmount, items } = useContext(StoreContext); // Changes here
  const navigate = useNavigate();
  
  // Added loading state for the cart items
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (items.length > 0) {
      setLoading(false); // Hide loading once items are fetched
    }
  }, [items]);

  // Loading state for fetching items
  if (loading) {
    return <p>Loading products...</p>; // Display loading while items are being fetched
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {Object.keys(cart).length === 0 ? (
        <p className="text-center text-xl font-semibold text-gray-700">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => {
            if (cart[item._id]) {
              return (
                <div
                  key={item._id}
                  className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`https://praticeproject.onrender.com/images/${item.image}`}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="space-y-2">
                      <p className="text-xl font-semibold text-gray-800">{item.name}</p>
                      <p className="text-lg text-gray-600">Price: ${item.price}</p>
                      <p className="text-md text-gray-500">Quantity: {cart[item._id]}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              );
            }
            return null;
          })}

          <div className="flex justify-between items-center mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">Total Amount</h2>
            <p className="text-3xl font-bold text-green-600">${totalAmount}</p>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={() => navigate('/address')}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition"
              disabled={totalAmount === 0} // Disable checkout if cart is empty
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
