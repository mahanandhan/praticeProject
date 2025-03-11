import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/api/user/forgot-password', { email });
            // You can navigate to a different page after successful submission if needed
            // navigate('/some-path');
        } catch (error) {
            // Handle error if necessary
            console.error("Error:", error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {/* <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div> */}
            <h1 className="min-h-screen w-full flex items-center justify-center bg-white sm:bg-black text-black sm:text-white text-5xl sm:text-4xl md:text-3xl lg:text-2xl xl:text-xl">Page is under maintaince</h1>
        </div>
    );
}

export default ForgotPassword;
