import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        const response = await axios.get('http://localhost:4000/api/product/list');
        if (response.data.success) {
            setList(response.data.data);
        } else {
            console.log(response.data.message);
            alert(response.data.message);
        }
    };

    const removeProduct = async (productId) => {
        const response = await axios.post('http://localhost:4000/api/product/remove', { id: productId });
        await fetchList();
        if (response.data.success) {
            alert(response.data.message);
        } else {
            console.log(response.data.message);
            alert(response.data.message);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-semibold text-gray-800">Product List</h1>
            </div>
            <div className="overflow-x-auto">
                <div className="min-w-full bg-white rounded-lg shadow-md">
                    {/* Table Header */}
                    <div className="flex justify-between bg-gray-100 p-4 font-semibold text-gray-700">
                        <div className="w-1/6">Image</div>
                        <div className="w-1/6">Product Name</div>
                        <div className="w-1/6">Price</div>
                        <div className="w-1/6">Category</div>
                        <div className="w-1/6">Description</div>
                        <div className="w-1/6 text-center">Actions</div>
                    </div>
                    {/* Product List */}
                    {list.map((item, index) => (
                        <div key={index} className="flex justify-between p-4 border-b border-gray-200">
                            <div className="w-1/6 flex justify-center">
                                <img
                                    src={'http://localhost:4000/images/' + item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-md"
                                />
                            </div>
                            <div className="w-1/6">{item.name}</div>
                            <div className="w-1/6">${item.price}</div>
                            <div className="w-1/6">{item.category}</div>
                            <div className="w-1/6">{item.description}</div>
                            <div className="w-1/6 text-center">
                                <button
                                    onClick={() => removeProduct(item._id)}
                                    className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition duration-300 cursor-pointer"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
