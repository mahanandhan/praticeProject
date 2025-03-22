import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://praticeproject.onrender.com/api/user/users');
                setUsers(response.data.users);
            } catch (error) {
                console.log("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-purple-300 p-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-wide drop-shadow-md">
                User Details
            </h1>

            {loading ? (
                <div className="flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                    <p className="mt-3 text-gray-700 text-lg font-semibold">Fetching users...</p>
                </div>
            ) : users.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {users.map((user) => (
                        <div 
                            key={user._id} 
                            className="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-6 border border-gray-300 hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out flex items-center space-x-4"
                        >
                            <div className="p-4 bg-blue-500 text-white rounded-full">
                                <FaUser size={24} />
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-700 text-lg font-semibold">No users found.</p>
            )}
        </div>
    );
};

export default UserList;