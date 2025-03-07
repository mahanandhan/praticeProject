// SearchResults.js
import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { StoreContext } from './StoreContext';
import ProductItem from './ProductItem';

const SearchResults = () => {
  const { items } = useContext(StoreContext); // Access the items from context
  const location = useLocation(); // Access the current URL location to read the query parameter
  const [filteredItems, setFilteredItems] = useState([]); // To store filtered items based on the search query
  const [searchQuery, setSearchQuery] = useState(""); // To store the search query

  useEffect(() => {
    // Get the query from the URL
    const query = new URLSearchParams(location.search).get('query') || "";
    setSearchQuery(query); // Set the search query state

    // Filter items based on the query (name or category)
    const result = items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(result); // Update the state with filtered items
  }, [location.search, items]); // Re-run this effect when the query or items change

  return (
    <div>
      <div className="bg-black ml-0 mr-0 mt-4 mb-4 p-4 shadow-md flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <span>Search Results for "{searchQuery}"</span>
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
          <div className="text-black margin-auto text-center">No products found</div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
