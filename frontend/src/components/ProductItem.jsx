// ProductItem.js
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "./StoreContext";
import { useNavigate } from "react-router-dom";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton,LinkedinShareButton, FacebookIcon, TwitterIcon, WhatsappIcon, LinkedinIcon } from 'react-share';
import axios from "axios";
const ProductItem = ({ itemId, name, image, color, price, description, category }) => {
  const { cart, addToCart, removeFromCart } = useContext(StoreContext);
  const [user, setUser] = useState(null);
  const quantity = cart[itemId] || 0;  // Get quantity for the specific item
  const navigate = useNavigate();
  const shareUrl = `https://pratice-project-eight.vercel.app/product`;
  const title = `Check out ${name} on MyStore!`;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('You have logged out successfully');
          setLoading(false);
          return;
        }

        const response = await axios.get('https://praticeproject.onrender.com/api/user/profile', {
          headers: { token },
        });

        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);
  const goToDetails = () => {
    navigate('/details/' + itemId);
  };

  return (
    <>
      <div className="border rounded-lg p-4 shadow-2xl bg-white hover:shadow-xl transition hover:scale-105 ">
      {user && <h2 className="text-xl font-bold">Hello, {user.user.name}</h2>}
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
      <div className="flex justify-center gap-5 mt-4">
        <FacebookShareButton url={shareUrl} quote={title} className="mt-2">
          <FacebookIcon size={32} round  />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={title} className="mt-2">
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl} title={title} className="mt-2">
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <LinkedinShareButton url={shareUrl} title={title} className="mt-2">
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        
      </div>
    </div>
    </>
    
  );
};

export default ProductItem;
