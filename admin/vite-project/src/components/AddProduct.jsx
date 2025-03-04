import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const AddProduct = () => {
  const navigate = useNavigate();  // Use navigate to redirect after success

  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState(null);
  const [category, setCategory] = React.useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !price || !description || !image || !category) {
      alert('Please fill all the fields');
    } else {
      try {
        // Create FormData to send both data and image
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', image);  // Attach the image file
        formData.append('category', category);

        // Make the POST request without custom headers
        const response = await axios.post('http://localhost:4000/api/product/add', formData);

        console.log(response.data);  // Log response to ensure it's what you expect

        if (response.data.success) {
          alert(response.data.message); 
          console.log("Navigating to /productlist");
        } else {
          alert(response.data.message);
          navigate('/productlist');
        }
      } catch (error) {
        console.error('There was an error during adding!', error);
        alert('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Add Product</h2>
        <form onSubmit={submit}>
          <div className="mb-4">
            <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">Product Name:</label>
            <input
              id="product-name"
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="product-price" className="block text-sm font-medium text-gray-700">Product Price:</label>
            <input
              id="product-price"
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">Product Description:</label>
            <textarea
              id="product-description"
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="product-image" className="block text-sm font-medium text-gray-700">Product Image:</label>
            <input
              id="product-image"
              onChange={(e) => setImage(e.target.files[0])}  // Handle file correctly
              type="file"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
            <select
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home">Home</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
