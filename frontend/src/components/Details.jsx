import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";  // Import axios

const Details = () => {
  const { itemId } = useParams();  
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);  
  const navigate = useNavigate();  
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://praticeproject.onrender.com/api/product/product/${itemId}`);
        setProduct(response.data.data); 
      } catch (err) {
        setError("Product not found or error fetching data");
      } finally {
        setLoading(false); 
      }
    };

    fetchProductDetails();  
  }, [itemId]); 

  
  if (loading) {
    return <div>Loading...</div>;
  }

  
  if (error) {
    return <div>{error}</div>;
  }

  
  if (!product) {
    return <div>Product not found.</div>;
  }

  const goBack = () => {
    navigate(-1); 
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl">
        <button
          onClick={goBack}
          className="bg-gray-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-gray-600 cursor-pointer"
        >
          Go Back
        </button>
        <div className="flex gap-6">
          <img
            src={`https://praticeproject.onrender.com/images/${product.image}`} 
            alt={product.name}
            className="w-34 h-34 object-cover rounded-md "
          />
          <div className="flex flex-col justify-between">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{product.description}</p> 
            <p className="text-xl font-bold text-blue-500">₹{product.price}</p>
            <p className={`text-sm ${product.color} mt-4`}>Category: {product.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
