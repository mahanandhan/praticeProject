import React from 'react'
import { Link } from 'react-router-dom'
import { VscAccount } from "react-icons/vsc";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          {/* Profile Icon on the Right */}
          <div>
            <VscAccount className="text-4xl text-gray-600 cursor-pointer"/>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ul className="space-y-4 text-3xl">
            <li>
              <Link 
                to='/addProduct' 
                className="text-blue-600 hover:text-blue-800 transition duration-300"
              >
                Add Product
              </Link>
            </li>
            <li>
              <Link 
                to='/productlist' 
                className="text-blue-600 hover:text-blue-800 transition duration-300"
              >
                Product List
              </Link>
            </li>
            <li>
              <Link 
                to='/orders' 
                className="text-blue-600 hover:text-blue-800 transition duration-300"
              >
                Orders
              </Link>
            </li>
            <li>
              <Link 
                to='/user' 
                className="text-blue-600 hover:text-blue-800 transition duration-300"
              >
                Users
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
