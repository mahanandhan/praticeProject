import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCartArrowDown } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { StoreContext } from './StoreContext';
import { BsFillMicFill } from "react-icons/bs";
import ProductItem from './ProductItem';
import Footer from './Footer';

const ProductList = () => {
  const navigate = useNavigate();
  const { items } = useContext(StoreContext);  // Use items from context

  const [searchQuery, setSearchQuery] = useState("");  // Track search input
  const [filterSuggestions, setFilterSuggestions] = useState([]);  // Track filter suggestions

  // Initialize Speech Recognition (for browsers that support it)
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false; // Stops when user stops speaking
  recognition.lang = 'en-US'; // Set language to English (you can change it based on your locale)
  recognition.interimResults = false; // Get results only after speech ends

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);  // Update search query as user types

    const suggestions = items.filter((item) => 
      item.name.toLowerCase().includes(query.toLowerCase()) || 
      item.description.toLowerCase().includes(query.toLowerCase()) || 
      item.category.toLowerCase().includes(query.toLowerCase())
    );  // Filter items based on search query

    setFilterSuggestions(suggestions);
  };

  // Start speech recognition when the microphone button is clicked
  const startSpeechRecognition = () => {
    recognition.start();  // Start listening to user's speech
  };

  // Handle the result of speech recognition (when the user finishes speaking)
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;  // Get the transcript from the speech
    setSearchQuery(transcript);  // Update the search query with the recognized speech

    // Update suggestions based on the recognized query
    const suggestions = items.filter((item) => 
      item.name.toLowerCase().includes(transcript.toLowerCase()) || 
      item.description.toLowerCase().includes(transcript.toLowerCase()) || 
      item.category.toLowerCase().includes(transcript.toLowerCase())
    );
    setFilterSuggestions(suggestions);
  };

  // Navigate to search results when the search button is clicked
  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      navigate(`/search-results?query=${searchQuery}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(`/search-results?query=${suggestion.name || suggestion.description || suggestion.category}`);
  };

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
        <div className="flex items-center relative">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}  // Controlled input
            onChange={handleSearchChange}  // Handle input change
            className="p-2 border border-gray-300 rounded-lg text-white w-full sm:w-4 md:w-150 lg:w-200 gap-5 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button 
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer ml-2"
            onClick={handleSearchClick}  // Trigger search when button is clicked
          >
            Search
          </button>
          
          {/* Microphone Button */}
          <BsFillMicFill 
            onClick={startSpeechRecognition}
            className="text-white text-5xl cursor-pointer ml-6 border border-gray-300 rounded-full p-2 hover:bg-gray-700 transition duration-300 ease-in-out hover:text-white hover:shadow-xl" 
          />
        </div>
        <div className="flex items-center gap-10">
          <FaCartArrowDown
            onClick={goToCart}
            className="text-white text-3xl cursor-pointer ml-4"
          />
          <VscAccount
            onClick={goToProfile}
            className="text-white text-3xl cursor-pointer"
          />
        </div>
      </div>

      {/* Suggestions Horizontal Line */}
      <div className="flex flex-wrap gap-2 mt-4 px-4">
        {filterSuggestions.length > 0 && searchQuery && (
          filterSuggestions.map((suggestion) => (
            <div
              key={suggestion._id}
              className="cursor-pointer hover:bg-gray-100 p-3 rounded-lg border border-gray-300 text-gray-800 text-sm font-medium transition-all duration-200 ease-in-out"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <p>{suggestion.name || suggestion.description || suggestion.category}</p>
            </div>
          ))
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {items.length > 0 ? (
          items.map((item) => (
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
          <div className="text-black margin-auto text-center">No products found</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;