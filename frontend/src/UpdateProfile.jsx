import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProfile = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if(!token){
                    setError("You need to login to update your profile");
                    setLoading(false);
                    return;
                }
                const response = await axios.get('https://praticeproject.onrender.com/api/user/profile', {headers: {token}});
                setUser(response.data.user);
                setLoading(false);

            } catch (error) {
                setError("Error fetching profile");
                setLoading(false);
            }
        }
        fetchProfile();
    }, [])

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if(!token){
            setError("You need to login to update your profile");
            return;
        }
        try {
            const response = await axios.put('https://praticeproject.onrender.com/api/user/update', {name: user.name, email: user.email}, {headers: {token}});
            if(response.data.success){
                setSuccess("Profile updated successfully");
                setError('');
                setTimeout(() => {
                    navigate('/profile');
                }, 2000);
            }
        } catch (error) {
            setError("Error updating profile");
            setSuccess('');
        }
    }

    if(loading){
        return <div className="text-center text-xl text-gray-500">Loading...</div>;
    }
    if(error){
        return <div className="text-center text-red-500">{error}</div>;
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Update Your Profile</h1>
        
        <form onSubmit={handleUpdate}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-lg font-semibold text-gray-700">Username</label>
                <input 
                    type="text" 
                    placeholder="Enter your username" 
                    name="name" 
                    value={user.name} 
                    onChange={(e) => setUser({...user, name: e.target.value})} 
                    id="name" 
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-lg font-semibold text-gray-700">Email</label>
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    name="email" 
                    value={user.email} 
                    onChange={(e) => setUser({...user, email: e.target.value})} 
                    id="email" 
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {success && <div className="text-center text-green-500 mt-4">{success}</div>}
            <div className="text-center mt-6">
                <button 
                    type="submit" 
                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Update
                </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfile;
