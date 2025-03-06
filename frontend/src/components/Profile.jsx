import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

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
        setError('Error fetching profile');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-center text-xl text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Profile</h1>
      <div className="mb-4">
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Name: </span>
          {user.user.name}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Email: </span>
          {user.user.email}
        </p>
      </div>
      <div className='flex gap-6'>
      <button
        onClick={handleDelete}
        className="w-full p-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
      >
        Logout
      </button>
      <button onClick={() => navigate('/update-profile')} className='w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer'>update</button>
      </div>
      
    </div>
  );
};

export default Profile;
