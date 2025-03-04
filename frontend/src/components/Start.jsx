import React from 'react'
import { useNavigate } from 'react-router-dom';

const Start = () => {
    const navigate = useNavigate();
    const goToLogin = () => {
        navigate('/login');
    }
    const goToRegister = () => {
        navigate('/signup');
    }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 w-full">
      {/* Logo Section */}
      <div className="mb-6 w-full flex justify-center">
        <img src="/src/assets/ms.png" alt="Logo" className="w-48 h-auto" />
      </div>

      {/* Login/Signup Text Section */}
      <div className="flex flex-col gap-6 w-full items-center">
        <h1 
          onClick={goToLogin}
          className="text-3xl font-bold text-blue-500 cursor-pointer hover:text-blue-700 transition-colors duration-300"
        >
          Login
        </h1>
        <h1 
          onClick={goToRegister}
          className="text-3xl font-bold text-green-500 cursor-pointer hover:text-green-700 transition-colors duration-300"
        >
          Signup
        </h1>
      </div>
    </div>
  )
}

export default Start;
