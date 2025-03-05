import React, { createContext, useState, useEffect, Component } from 'react';
import axios from 'axios';

// Create context
export const StoreContext = createContext();

// Error Boundary Component to handle errors gracefully
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please try again later.</h2>;
    }

    return this.props.children;
  }
}

// StoreProvider component that provides the context to the rest of the app
export const StoreProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [cart, setCart] = useState({});
  const [items, setItems] = useState([]); // Initialize items as an array

  // Fetch product list from backend API
  const fetchProductList = async () => {
    try {
      const response = await axios.get('https://praticeproject.onrender.com/api/product/list');
      setItems(response.data.data); // Corrected: setItems instead of setList
    } catch (error) {
      console.error('Error fetching product list:', error);
    }
  };

  // Fetch cart data from backend using stored token
  const localCartData = async (token) => {
    try {
      const response = await axios.post('https://praticeproject.onrender.com/api/cart/get', {}, { headers: { token } });
      setCart(response.data.cartData);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  // Add item to the cart
  const addToCart = async (itemId) => {
    try {
      setCart((prevCart) => ({
        ...prevCart,
        [itemId]: (prevCart[itemId] || 0) + 1, // Increment the specific item's quantity
      }));
      if (token) {
        await axios.post('https://praticeproject.onrender.com/api/cart/add', { itemId }, { headers: { token } });
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  // Remove item from the cart
  const removeFromCart = async (itemId) => {
    try {
      setCart((prevCart) => {
        const newCart = { ...prevCart };
        if (newCart[itemId] > 0) {
          newCart[itemId]--;
          if (newCart[itemId] === 0) {
            delete newCart[itemId]; // Remove item from cart if quantity reaches 0
          }
        }
        return newCart;
      });
      if (token) {
        await axios.post('https://praticeproject.onrender.com/api/cart/remove', { itemId }, { headers: { token } });
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // Calculate total amount from cart and product prices
  const totalAmount = (items.length && Object.keys(cart || {}).reduce((sum, itemId) => {
    const item = items.find((item) => item._id === itemId); // Ensure type consistency
    if (item) {
      return sum + item.price * cart[itemId];
    }
    return sum;
  }, 0)) || 0; // Fallback to 0 if items is empty

  // Load data from localStorage and backend when the component mounts
  useEffect(() => {
    async function loadData() {
      await fetchProductList();
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        await localCartData(storedToken); // Fetch cart data for the stored token
      }
    }
    loadData();
  }, []); // Empty dependency array to only run once on component mount

  return (
    <StoreContext.Provider value={{ cart, addToCart, removeFromCart, totalAmount, token, setToken, items }}>
      {children}
    </StoreContext.Provider>
  );
};

// Wrap the StoreProvider component with ErrorBoundary to catch any unexpected errors
const App = () => (
  <ErrorBoundary>
    <StoreProvider>
      {/* Your app components here */}
    </StoreProvider>
  </ErrorBoundary>
);

export default App;
