import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { StoreProvider } from './components/StoreContext'; // Import StoreProvider instead of StoreContext
import App from './App.jsx';
import { ToastContainer, toast } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreProvider> {/* Wrap the app with the StoreProvider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </StrictMode>
);
